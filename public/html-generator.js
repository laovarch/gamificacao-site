// html-generator.js
// Função compartilhada para gerar HTML exportado

window.generateGameHTML = async function(config, options = {}) {
    const {
        includeDownloadButton = false,
        customTitle = null,
        customSubtitle = null
    } = options;

    // Busca os estilos CSS do index.html atual
    let cssStyles = '';
    try {
        const indexResp = await fetch('index.html');
        const indexText = await indexResp.text();
        const styleMatch = indexText.match(/<style>([\s\S]*?)<\/style>/);
        if (styleMatch) {
            cssStyles = styleMatch[1];
        }
    } catch (e) {
        console.warn('Não foi possível carregar estilos do index.html');
    }

    // Busca o código JavaScript da gamificação
    let scriptCode = '';
    try {
        const resp = await fetch('public/gamificacao-core.js');
        scriptCode = await resp.text();
        // Garante que loadConfiguration e selectModule fiquem globais
        scriptCode += '\nwindow.loadConfiguration = loadConfiguration;\nwindow.selectModule = selectModule;\n';
        // Salva progresso no localStorage ao concluir módulo e ao carregar configuração (com chave única)
        scriptCode += '\n(function(){' +
          'var _originalLoad=window.loadConfiguration;' +
          'window.loadConfiguration=function(config,source){' +
            '_originalLoad(config,source);' +
            'try{' +
              'var storageKey = "gamificacao_progresso_" + (config.title || "default").replace(/[^a-zA-Z0-9]/g, "_");' +
              'localStorage.setItem(storageKey,JSON.stringify(window.currentConfig));' +
            '}catch(e){}' +
          '};' +
          'if(window.completeModule){' +
            'var _originalComplete=window.completeModule;' +
            'window.completeModule=function(moduleId){' +
              '_originalComplete(moduleId);' +
              'try{' +
                'var storageKey = "gamificacao_progresso_" + (window.currentConfig.title || "default").replace(/[^a-zA-Z0-9]/g, "_");' +
                'localStorage.setItem(storageKey,JSON.stringify(window.currentConfig));' +
              '}catch(e){}' +
            '};' +
          '}' +
        '})();\n';
        // Ao abrir, carrega a configuração injetada e depois restaura progresso se houver
        scriptCode += '\nwindow.addEventListener(\'DOMContentLoaded\',function(){' +
          'var injectedConfig = window.currentConfig;' + // Salva a config injetada
          'var savedProgress = null;' +
          'if(injectedConfig){' +
            'try{' +
              'var storageKey = "gamificacao_progresso_" + (injectedConfig.title || "default").replace(/[^a-zA-Z0-9]/g, "_");' +
              'var salvo=localStorage.getItem(storageKey);' +
              'if(salvo){savedProgress=JSON.parse(salvo);}' +
            '}catch(e){}' +
            'if(savedProgress && savedProgress.title === injectedConfig.title){' +
              'console.log("Restaurando progresso salvo para: " + injectedConfig.title);' +
              'window.currentConfig = savedProgress;' +
            '}else{' +
              'console.log("Usando configuração injetada: " + injectedConfig.title);' +
              'window.currentConfig = injectedConfig;' +
            '}' +
            'setTimeout(function(){loadConfiguration(window.currentConfig,\'personalizada\');},100);' +
          '}' +
        '});\n';
        // Adiciona verificações de segurança para elementos
        scriptCode += '\n// Patch de segurança para verificar elementos antes de usar\n';
        scriptCode += 'var originalLoadConfiguration = loadConfiguration;\n';
        scriptCode += 'loadConfiguration = function(config, source) {\n';
        scriptCode += '  var gameTitle = document.getElementById("gameTitle");\n';
        scriptCode += '  var gameSubtitle = document.getElementById("gameSubtitle");\n';
        scriptCode += '  var gameContainer = document.getElementById("gameContainer");\n';
        scriptCode += '  if (!gameTitle || !gameSubtitle || !gameContainer) {\n';
        scriptCode += '    console.error("Elementos obrigatórios não encontrados no DOM");\n';
        scriptCode += '    return;\n';
        scriptCode += '  }\n';
        scriptCode += '  originalLoadConfiguration(config, source);\n';
        scriptCode += '};\n';
        // Adiciona o tooltip div no HTML exportado se não existir
        scriptCode += '\n// Garante que o tooltip existe\nif (!document.getElementById("tooltip")) { const tooltip = document.createElement("div"); tooltip.id = "tooltip"; tooltip.className = "module-tooltip"; document.body.appendChild(tooltip); }\n';
    } catch (e) {
        throw new Error('Erro ao carregar gamificacao-core.js: ' + e.message);
    }

    // Injeta a configuração
    const configJson = JSON.stringify(config, null, 2);
    const injectConfig = `window.currentConfig = JSON.parse(String.raw\`${configJson.replace(/`/g, '\u0060')}\`);`;

    // Define títulos
    const gameTitle = customTitle || config.title || 'Sistema de Gamificação';
    const gameSubtitle = customSubtitle || config.subtitle || 'Sistema de aprendizado progressivo';
    const pageTitle = config.title || 'Sistema de Gamificação';

    // Gera o HTML do game container
    let gameContainerHTML = '';
    gameContainerHTML += '    <div class="game-container active" id="gameContainer">\n';
    gameContainerHTML += '        <div class="game-header">\n';
    gameContainerHTML += '            <div>\n';
    gameContainerHTML += '                <h2 class="game-title" id="gameTitle">' + gameTitle + '</h2>\n';
    gameContainerHTML += '                <div class="game-subtitle" id="gameSubtitle">' + gameSubtitle + '</div>\n';
    gameContainerHTML += '            </div>\n';
    if (includeDownloadButton) {
        gameContainerHTML += '            <button class="header-button" id="downloadHtmlBtn" type="button" style="position:static; margin-left: 16px;">⬇️ Baixar HTML</button>\n';
    }
    gameContainerHTML += '        </div>\n';
    gameContainerHTML += '        <div class="status-bar" id="statusBar">Preparando sistema...</div>\n';
    gameContainerHTML += '        <div class="progress-section">\n';
    gameContainerHTML += '            <div class="progress-map" id="progressMap"></div>\n';
    gameContainerHTML += '            <div class="content-panel" id="contentPanel">\n';
    gameContainerHTML += '                <div class="content-title" id="contentTitle"></div>\n';
    gameContainerHTML += '                <div class="content-description" id="contentDescription"></div>\n';
    gameContainerHTML += '                <div class="content-body" id="contentBody"></div>\n';
    gameContainerHTML += '                <div class="action-buttons" id="actionButtons"></div>\n';
    gameContainerHTML += '            </div>\n';
    gameContainerHTML += '        </div>\n';
    gameContainerHTML += '    </div>\n';

    // Monta o HTML completo
    let html = '';
    html += '<!DOCTYPE html>\n';
    html += '<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    html += '<title>' + pageTitle + '</title>\n';
    if (cssStyles) {
        html += '<style>\n' + cssStyles + '\n</style>\n';
    }
    html += '</head>\n<body>\n';
    html += '<div class="container">\n';
    html += gameContainerHTML;
    html += '</div>\n';
    html += '<div class="module-tooltip" id="tooltip"></div>\n';
    html += '<script>\n';
    html += injectConfig + '\n';
    html += scriptCode + '\n';
    html += '<' + '/script>\n';
    html += '</body>\n</html>';

    return html;
};

// Função helper para baixar arquivo HTML
window.downloadHTML = function(htmlContent, filename = 'gamificacao-config.html') {
    const blob = new Blob([htmlContent], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }, 100);
};
