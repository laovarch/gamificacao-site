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
        // Salva progresso no localStorage ao concluir módulo e ao carregar configuração
        scriptCode += '\n(function(){' +
          'var _originalLoad=window.loadConfiguration;' +
          'window.loadConfiguration=function(config,source){_originalLoad(config,source);try{localStorage.setItem(\'gamificacao_progresso\',JSON.stringify(window.currentConfig));}catch(e){}};' +
          'if(window.completeModule){var _originalComplete=window.completeModule;window.completeModule=function(moduleId){_originalComplete(moduleId);try{localStorage.setItem(\'gamificacao_progresso\',JSON.stringify(window.currentConfig));}catch(e){}};}' +
        '})();\n';
        // Ao abrir, restaura progresso salvo se existir
        scriptCode += '\nwindow.addEventListener(\'DOMContentLoaded\',function(){try{var salvo=localStorage.getItem(\'gamificacao_progresso\');if(salvo){window.currentConfig=JSON.parse(salvo);}}catch(e){}if(window.currentConfig){loadConfiguration(window.currentConfig,\'personalizada\');}});\n';
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
    gameContainerHTML += '    <div class="game-container active">\n';
    gameContainerHTML += '        <div class="game-header">\n';
    gameContainerHTML += '            <div>\n';
    gameContainerHTML += '                <h2 class="game-title">' + gameTitle + '</h2>\n';
    gameContainerHTML += '                <div class="game-subtitle">' + gameSubtitle + '</div>\n';
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
