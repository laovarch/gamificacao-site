// gamificacao.js
// Sistema principal de gamificação - apenas funcionalidades dos módulos

let currentConfig = null;
let currentModule = null;

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

    // Cria SVG para as linhas com dimensões fixas
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '1';
    svg.style.pointerEvents = 'none';
    
    // Define viewBox para usar coordenadas consistentes
    svg.setAttribute('viewBox', '0 0 800 600');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
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

    // Cria grupo para linha e seta
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Converte posições percentuais para coordenadas do viewBox (800x600)
    const x1 = (fromModule.position.x / 100) * 800;
    const y1 = (fromModule.position.y / 100) * 600;
    const x2 = (toModule.position.x / 100) * 800;
    const y2 = (toModule.position.y / 100) * 600;

    // Cria linha principal
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#667eea');
    line.setAttribute('stroke-width', '6');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.8');

    // Calcula ponto médio para a seta
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Calcula ângulo da linha para orientar a seta
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    // Cria seta (triângulo) - tamanho proporcional ao viewBox
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    
    const arrowSize = 20; // Tamanho da seta no viewBox
    
    // Pontos da seta (triângulo apontando para a direita)
    const arrowPoints = [
        [arrowSize, 0],              // Ponta da seta
        [-arrowSize, -arrowSize/2],  // Canto superior esquerdo  
        [-arrowSize, arrowSize/2]    // Canto inferior esquerdo
    ];
    
    // Rotaciona e posiciona os pontos da seta
    const rotatedPoints = arrowPoints.map(([px, py]) => {
        const rotatedX = px * Math.cos(angle) - py * Math.sin(angle);
        const rotatedY = px * Math.sin(angle) + py * Math.cos(angle);
        return [midX + rotatedX, midY + rotatedY];
    });
    
    const pointsString = rotatedPoints.map(([x, y]) => `${x},${y}`).join(' ');
    arrow.setAttribute('points', pointsString);
    arrow.setAttribute('fill', '#667eea');
    arrow.setAttribute('opacity', '0.95');
    arrow.setAttribute('stroke', '#4c63d2');
    arrow.setAttribute('stroke-width', '2');

    // Adiciona linha e seta ao grupo
    group.appendChild(line);
    group.appendChild(arrow);
    
    svg.appendChild(group);
    return group;
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
    
    // Determina o emoji do módulo
    let emoji = '📚'; // Emoji padrão (livro)
    
    // Se o módulo tem emoji personalizado, usa ele
    if (module.emoji) {
        emoji = module.emoji;
    } else {
        // Emojis baseados no tipo e estado quando não há personalização
        if (module.type === 'checkpoint') {
            emoji = '🎯';
        } else if (state === 'completed') {
            emoji = '✅';
        } else if (state === 'locked') {
            emoji = '🔒';
        }
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
