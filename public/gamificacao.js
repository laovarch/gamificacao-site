// gamificacao.js
// Código principal do sistema de gamificação extraído do index.html

// Configurações predefinidas embutidas
const predefinedConfigs = {
    teste: {
        title: "🧪 Configuração de Teste",
        modules: {
            "centro": {
                title: "🎯 Centro",
                description: "Ponto central do sistema",
                content: "Este é o centro do seu aprendizado. A partir daqui você pode acessar todos os módulos conectados.",
                type: "checkpoint",
                position: { x: 50, y: 50 },
                isAvailable: true,
                isCompleted: false
            },
            "modulo1": {
                title: "📚 Módulo 1",
                description: "Primeiro módulo de conteúdo",
                content: "Conteúdo do primeiro módulo. Este é um exemplo de como o sistema funciona com dependências entre módulos.",
                type: "content",
                position: { x: 20, y: 30 },
                isAvailable: true,
                isCompleted: false,
                dependencies: ["centro"]
            },
            "modulo2": {
                title: "📖 Módulo 2", 
                description: "Segundo módulo - desbloqueado após módulo 1",
                content: "Este módulo só fica disponível depois que você completar o Módulo 1. Demonstra o sistema de dependências.",
                type: "content",
                position: { x: 80, y: 70 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["modulo1"]
            }
        },
        connections: [
            { from: "centro", to: "modulo1" },
            { from: "modulo1", to: "modulo2" }
        ]
    },
    simples: {
        title: "🚀 Configuração Simples",
        modules: {
            "centro": {
                title: "🎯 Centro de Aprendizado",
                description: "Seu ponto de partida",
                content: "Bem-vindo ao sistema de aprendizado! A partir deste centro você pode acessar os módulos do curso.",
                type: "checkpoint",
                position: { x: 50, y: 50 },
                isAvailable: true,
                isCompleted: false
            },
            "introducao": {
                title: "📖 Introdução",
                description: "Conceitos básicos e fundamentais",
                content: "Aprenda os fundamentos essenciais que servirão de base para todo o curso. Este módulo é obrigatório para avançar.",
                type: "content",
                position: { x: 25, y: 25 },
                isAvailable: true,
                isCompleted: false,
                dependencies: ["centro"]
            },
            "pratica": {
                title: "⚡ Prática",
                description: "Exercícios práticos e aplicação",
                content: "Coloque em prática o que aprendeu na introdução. Exercícios hands-on para solidificar o conhecimento.",
                type: "content",
                position: { x: 75, y: 25 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["introducao"]
            },
            "avancado": {
                title: "🚀 Avançado",
                description: "Conceitos avançados e especializados",
                content: "Tópicos mais complexos e especializados. Para estudantes que dominaram os conceitos básicos e práticos.",
                type: "content",
                position: { x: 50, y: 75 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["pratica"]
            }
        },
        connections: [
            { from: "centro", to: "introducao" },
            { from: "introducao", to: "pratica" },
            { from: "pratica", to: "avancado" }
        ]
    },
    completa: {
        title: "📚 Curso Completo de Direção",
        modules: {
            "centro": {
                title: "🎯 Centro de Aprendizado",
                description: "Início da sua jornada na direção",
                content: "Bem-vindo ao curso completo de direção! Aqui você aprenderá tudo sobre condução segura e responsável.",
                type: "checkpoint",
                position: { x: 50, y: 50 },
                isAvailable: true,
                isCompleted: false
            },
            "legislacao": {
                title: "📚 Legislação",
                description: "Código de Trânsito Brasileiro",
                content: "Aprenda as leis e regulamentações do trânsito brasileiro. Base fundamental para qualquer condutor.",
                type: "content",
                position: { x: 30, y: 20 },
                isAvailable: true,
                isCompleted: false,
                dependencies: ["centro"]
            },
            "sinalizacao": {
                title: "🚦 Sinalização",
                description: "Placas e sinais de trânsito",
                content: "Entenda todos os tipos de sinalização viária: placas, semáforos, marcações no asfalto e gestos.",
                type: "content",
                position: { x: 70, y: 20 },
                isAvailable: true,
                isCompleted: false,
                dependencies: ["centro"]
            },
            "veiculo": {
                title: "🚗 Conhecendo o Veículo",
                description: "Partes e funcionamento do automóvel",
                content: "Aprenda sobre as partes do veículo, funcionamento básico e procedimentos de segurança.",
                type: "content",
                position: { x: 20, y: 35 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["legislacao"]
            },
            "direcao-defensiva": {
                title: "🛡️ Direção Defensiva",
                description: "Técnicas de condução segura",
                content: "Aprenda técnicas para dirigir com segurança, antecipando situações de risco.",
                type: "content",
                position: { x: 80, y: 35 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["sinalizacao"]
            },
            "primeiros-socorros": {
                title: "🏥 Primeiros Socorros",
                description: "Atendimento de emergência",
                content: "Aprenda procedimentos básicos de primeiros socorros em caso de acidentes.",
                type: "content",
                position: { x: 15, y: 65 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["veiculo"]
            },
            "meio-ambiente": {
                title: "🌱 Meio Ambiente",
                description: "Direção ecológica e sustentável",
                content: "Como dirigir respeitando o meio ambiente e contribuindo para um trânsito sustentável.",
                type: "content",
                position: { x: 85, y: 65 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["direcao-defensiva"]
            },
            "pratica-1": {
                title: "🎮 Prática 1",
                description: "Primeira aula prática",
                content: "Sua primeira experiência ao volante com instrutor. Movimentos básicos e familiarização.",
                type: "content",
                position: { x: 35, y: 80 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["primeiros-socorros", "meio-ambiente"]
            },
            "pratica-2": {
                title: "🚙 Prática 2",
                description: "Aula prática avançada",
                content: "Manobras e situações mais complexas. Preparação para o exame prático.",
                type: "content",
                position: { x: 65, y: 80 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["pratica-1"]
            },
            "simulado": {
                title: "📝 Simulado",
                description: "Teste seus conhecimentos",
                content: "Simulado do exame teórico do DETRAN. Prepare-se para a prova oficial!",
                type: "content",
                position: { x: 40, y: 95 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["pratica-2"]
            },
            "exame": {
                title: "🏆 Exame Final",
                description: "Prova final do curso",
                content: "Demonstre tudo que aprendeu! Exame final teórico e prático.",
                type: "content",
                position: { x: 60, y: 95 },
                isAvailable: false,
                isCompleted: false,
                dependencies: ["simulado"]
            }
        },
        connections: [
            { from: "centro", to: "legislacao" },
            { from: "centro", to: "sinalizacao" },
            { from: "legislacao", to: "veiculo" },
            { from: "sinalizacao", to: "direcao-defensiva" },
            { from: "veiculo", to: "primeiros-socorros" },
            { from: "direcao-defensiva", to: "meio-ambiente" },
            { from: "primeiros-socorros", to: "pratica-1" },
            { from: "meio-ambiente", to: "pratica-1" },
            { from: "pratica-1", to: "pratica-2" },
            { from: "pratica-2", to: "simulado" },
            { from: "pratica-2", to: "exame" },
            { from: "simulado", to: "exame" }
        ]
    }
};

let currentConfig = null;
let currentModule = null;

// Inicialização do sistema de upload
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');

    // Clique na área de upload
    if (uploadArea) uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }

    // Seleção de arquivo
    if (fileInput) fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
});

function handleFileUpload(file) {
    if (!file.name.endsWith('.json')) {
        showNotification('❌ Por favor, selecione um arquivo JSON válido');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            // Validação básica da estrutura
            if (!config.title || !config.modules) {
                throw new Error('Estrutura de configuração inválida');
            }

            // Mostra informações do arquivo
            const fileInfo = document.getElementById('fileInfo');
            fileInfo.innerHTML = `
                <strong>✅ Arquivo carregado com sucesso!</strong><br>
                📁 ${file.name}<br>
                📊 ${Object.keys(config.modules).length} módulos encontrados<br>
                🎯 ${config.title}
            `;
            fileInfo.style.display = 'block';

            // Carrega a configuração
            loadConfiguration(config, 'personalizada');
            
        } catch (error) {
            showNotification('❌ Erro ao processar arquivo JSON: ' + error.message);
            console.error('Erro no JSON:', error);
        }
    };
    reader.readAsText(file);
}

function toggleCustomConfigSection() {
    const content = document.getElementById('customConfigContent');
    const toggleIcon = document.getElementById('customConfigToggle');
    
    if (content.style.display === 'none' || content.style.display === '') {
        // Abrir
        content.style.display = 'block';
        content.classList.remove('hidden');
        content.classList.add('visible');
        toggleIcon.textContent = '▲';
        toggleIcon.classList.add('rotated');
    } else {
        // Fechar
        content.classList.remove('visible');
        content.classList.add('hidden');
        toggleIcon.textContent = '▼';
        toggleIcon.classList.remove('rotated');
        
        // Aguarda a animação antes de esconder completamente
        setTimeout(() => {
            if (content.classList.contains('hidden')) {
                content.style.display = 'none';
            }
        }, 300);
    }
}

function loadPredefinedConfig(configType) {
    const config = predefinedConfigs[configType];
    if (config) {
        loadConfiguration(config, configType);
        
        // Atualiza botões
        document.querySelectorAll('.config-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

function loadConfiguration(config, source) {
    currentConfig = JSON.parse(JSON.stringify(config)); // Deep clone
    
    // Aplica regra: módulos conectados a checkpoints começam desbloqueados
    applyCheckpointUnlockRule();
    
    // Atualiza interface
    document.getElementById('gameTitle').textContent = currentConfig.title;
    document.getElementById('gameSubtitle').textContent = 
        `${Object.keys(currentConfig.modules).length} módulos disponíveis`;
    
    // Mostra container do jogo
    document.getElementById('gameContainer').classList.add('active');
    
    // Gera mapa
    generateProgressMap();
    updateStatusBar();
    
    // Fecha painel de conteúdo se estiver aberto
    closeContentPanel();
    
    showNotification(`🎉 Configuração "${currentConfig.title}" carregada com sucesso!`);
}

function applyCheckpointUnlockRule() {
    // Encontra todos os módulos do tipo checkpoint
    const checkpoints = Object.entries(currentConfig.modules)
        .filter(([id, module]) => module.type === 'checkpoint')
        .map(([id]) => id);
    
    // Para cada módulo, verifica se depende diretamente de um checkpoint
    Object.entries(currentConfig.modules).forEach(([id, module]) => {
        if (module.dependencies && Array.isArray(module.dependencies)) {
            // Verifica se alguma dependência é um checkpoint
            const dependsOnCheckpoint = module.dependencies.some(depId => 
                checkpoints.includes(depId)
            );
            
            if (dependsOnCheckpoint) {
                // Desbloqueia o módulo
                currentConfig.modules[id].isAvailable = true;
                console.log(`Módulo "${module.title}" desbloqueado automaticamente (conectado a checkpoint)`);
            }
        }
    });
}

function generateProgressMap() {
    const mapContainer = document.getElementById('progressMap');
    mapContainer.innerHTML = '';

    // Cria SVG para as linhas
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '1';
    svg.style.pointerEvents = 'none';
    mapContainer.appendChild(svg);

    // Gera módulos
    Object.entries(currentConfig.modules).forEach(([id, module]) => {
        const moduleElement = createModuleElement(id, module);
        mapContainer.appendChild(moduleElement);
    });

    // Cria conexões como linhas SVG
    if (currentConfig.connections) {
        currentConfig.connections.forEach(connection => {
            createSVGLine(svg, connection.from, connection.to);
        });
    }
}

function createSVGLine(svg, fromId, toId) {
    const fromModule = currentConfig.modules[fromId];
    const toModule = currentConfig.modules[toId];
    
    if (!fromModule || !toModule) return null;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${fromModule.position.x}%`);
    line.setAttribute('y1', `${fromModule.position.y}%`);
    line.setAttribute('x2', `${toModule.position.x}%`);
    line.setAttribute('y2', `${toModule.position.y}%`);
    line.setAttribute('stroke', '#667eea');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.8');

    svg.appendChild(line);
    return line;
}

function createModuleElement(id, module) {
    const element = document.createElement('div');
    element.className = 'module';
    element.id = `module-${id}`;
    element.style.left = `${module.position.x}%`;
    element.style.top = `${module.position.y}%`;
    element.style.transform = 'translate(-50%, -50%)';
    
    // Determina o estado do módulo
    let state = 'locked';
    if (module.isCompleted) {
        state = 'completed';
    } else if (module.isAvailable) {
        state = 'available';
    }
    
    if (module.type === 'checkpoint') {
        element.classList.add('checkpoint');
    }
    
    element.classList.add(state);
    
    // Emoji baseado no tipo e estado
    let emoji = '📚';
    if (module.type === 'checkpoint') {
        emoji = '🎯';
    } else if (state === 'completed') {
        emoji = '✅';
    } else if (state === 'locked') {
        emoji = '🔒';
    }
    
    element.textContent = emoji;
    
    // Event listeners
    if (state !== 'locked') {
        element.addEventListener('click', () => selectModule(id));
    }
    
    element.addEventListener('mouseenter', (e) => showTooltip(e, module));
    element.addEventListener('mouseleave', hideTooltip);
    
    return element;
}

function selectModule(moduleId) {
    currentModule = moduleId;
    const module = currentConfig.modules[moduleId];
    
    // Atualiza painel de conteúdo
    document.getElementById('contentTitle').textContent = module.title;
    document.getElementById('contentDescription').textContent = module.description;
    document.getElementById('contentBody').textContent = module.content;
    
    // Botões de ação
    const buttonsContainer = document.getElementById('actionButtons');
    buttonsContainer.innerHTML = '';
    
    if (!module.isCompleted && module.type !== 'checkpoint') {
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-success';
        completeBtn.innerHTML = '✅ Marcar como Concluído';
        completeBtn.onclick = () => completeModule(moduleId);
        buttonsContainer.appendChild(completeBtn);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.innerHTML = '✖️ Fechar';
    closeBtn.onclick = closeContentPanel;
    buttonsContainer.appendChild(closeBtn);
    
    // Mostra painel
    document.getElementById('contentPanel').classList.add('active');
    
    // Atualiza estado visual
    document.querySelectorAll('.module').forEach(el => el.classList.remove('current'));
    document.getElementById(`module-${moduleId}`).classList.add('current');
}

function completeModule(moduleId) {
    const module = currentConfig.modules[moduleId];
    module.isCompleted = true;
    
    // Desbloqueia módulos dependentes
    Object.entries(currentConfig.modules).forEach(([id, mod]) => {
        if (mod.dependencies && mod.dependencies.includes(moduleId)) {
            const allDependenciesMet = mod.dependencies.every(depId => 
                currentConfig.modules[depId].isCompleted || currentConfig.modules[depId].type === 'checkpoint'
            );
            if (allDependenciesMet) {
                mod.isAvailable = true;
            }
        }
    });
    
    // Atualiza interface
    generateProgressMap();
    updateStatusBar();
    closeContentPanel();
    
    // Notificação
    showNotification(`🎉 ${module.title} concluído!`);
}

function closeContentPanel() {
    document.getElementById('contentPanel').classList.remove('active');
    document.querySelectorAll('.module').forEach(el => el.classList.remove('current'));
    currentModule = null;
}

function showTooltip(event, module) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = `${module.title} - ${module.description}`;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 30 + 'px';
    tooltip.classList.add('show');
}

function hideTooltip() {
    document.getElementById('tooltip').classList.remove('show');
}

function updateStatusBar() {
    if (!currentConfig) return;
    
    const modules = Object.values(currentConfig.modules);
    const contentModules = modules.filter(m => m.type !== 'checkpoint');
    const completed = contentModules.filter(m => m.isCompleted).length;
    const available = contentModules.filter(m => m.isAvailable && !m.isCompleted).length;
    
    const statusText = `📊 Progresso: ${completed}/${contentModules.length} concluídos • ${available} disponíveis`;
    document.getElementById('statusBar').textContent = statusText;
}

function showNotification(message) {
    // Cria notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContentPanel();
    }
});

// Adiciona estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
