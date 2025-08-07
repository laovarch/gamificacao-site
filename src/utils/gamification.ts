import { ContentNode, ProgressState, GameMap, Connection } from '../types';

export const checkIfNodeAvailable = (
    node: ContentNode, 
    completedNodes: string[]
): boolean => {
    // Verifica se todas as dependências foram completadas
    return node.dependencies.every(depId => completedNodes.includes(depId));
};

export const getNodeStatus = (
    node: ContentNode, 
    progress: ProgressState
): 'completed' | 'current' | 'available' | 'locked' => {
    if (progress.completedNodes.includes(node.id)) {
        return 'completed';
    }
    
    if (node.id === progress.currentNodeId) {
        return 'current';
    }
    
    if (checkIfNodeAvailable(node, progress.completedNodes)) {
        return 'available';
    }
    
    return 'locked';
};

export const completeNode = (
    nodeId: string, 
    progress: ProgressState,
    gameMap: GameMap
): ProgressState => {
    if (progress.completedNodes.includes(nodeId)) {
        return progress; // Já foi completado
    }
    
    const newCompletedNodes = [...progress.completedNodes, nodeId];
    
    // Encontra próximos nós disponíveis
    const availableNodes = gameMap.nodes
        .filter(node => !newCompletedNodes.includes(node.id))
        .filter(node => checkIfNodeAvailable(node, newCompletedNodes))
        .map(node => node.id);
    
    // Define o próximo nó atual (primeiro disponível ou null se todos completados)
    const nextCurrentNode = availableNodes.length > 0 ? availableNodes[0] : null;
    
    return {
        completedNodes: newCompletedNodes,
        currentNodeId: nextCurrentNode,
        availableNodes
    };
};

export const initializeProgress = (gameMap: GameMap): ProgressState => {
    // Encontra nós sem dependências (pontos de início)
    const startingNodes = gameMap.nodes
        .filter(node => node.dependencies.length === 0)
        .map(node => node.id);
    
    return {
        completedNodes: [],
        currentNodeId: startingNodes[0] || null,
        availableNodes: startingNodes
    };
};

// Dados do mapa baseado na imagem
export const createGameMapData = (): GameMap => {
    const nodes: ContentNode[] = [
        // Checkpoint central
        {
            id: 'checkpoint-central',
            title: '',
            status: 'available',
            dependencies: ['meio-ambiente-1', 'mecanica', 'direcao-basica'],
            position: { x: 50, y: 45 },
            type: 'checkpoint'
        },
        // Matérias principais
        {
            id: 'manobras',
            title: 'MANOBRAS',
            status: 'locked',
            dependencies: [],
            position: { x: 50, y: 15 },
            type: 'subject'
        },
        {
            id: 'baliza',
            title: 'BALIZA',
            status: 'locked',
            dependencies: ['manobras'],
            position: { x: 70, y: 15 },
            type: 'subject'
        },
        {
            id: 'direcao-basica',
            title: 'DIREÇÃO\nBÁSICA',
            status: 'available',
            dependencies: [],
            position: { x: 50, y: 30 },
            type: 'subject'
        },
        {
            id: 'mecanica',
            title: 'MECÂNICA',
            status: 'available',
            dependencies: [],
            position: { x: 30, y: 35 },
            type: 'subject'
        },
        {
            id: 'meio-ambiente-1',
            title: 'MEIO\nAMBIENTE I',
            status: 'available',
            dependencies: [],
            position: { x: 30, y: 60 },
            type: 'subject'
        },
        {
            id: 'meio-ambiente-2',
            title: 'MEIO\nAMBIENTE II',
            status: 'locked',
            dependencies: ['checkpoint-central'],
            position: { x: 15, y: 45 },
            type: 'subject'
        },
        {
            id: 'direcao-defensiva-1',
            title: 'DIREÇÃO\nDEFENSIVA I',
            status: 'locked',
            dependencies: ['checkpoint-central'],
            position: { x: 60, y: 45 },
            type: 'subject'
        },
        {
            id: 'direcao-defensiva-2',
            title: 'DIREÇÃO\nDEFENSIVA II',
            status: 'locked',
            dependencies: ['direcao-defensiva-1'],
            position: { x: 75, y: 40 },
            type: 'subject'
        },
        {
            id: 'primeiros-socorros',
            title: 'PRIMEIROS\nSOCORROS',
            status: 'locked',
            dependencies: ['checkpoint-central'],
            position: { x: 50, y: 60 },
            type: 'subject'
        },
        {
            id: 'legislacao-1',
            title: 'LEGISLAÇÃO I',
            status: 'locked',
            dependencies: ['primeiros-socorros'],
            position: { x: 70, y: 60 },
            type: 'subject'
        },
        {
            id: 'legislacao-2',
            title: 'LEGISLAÇÃO II',
            status: 'locked',
            dependencies: ['legislacao-1'],
            position: { x: 85, y: 60 },
            type: 'subject'
        }
    ];
    
    const connections: Connection[] = [
        { from: 'manobras', to: 'baliza' },
        { from: 'manobras', to: 'checkpoint-central' },
        { from: 'direcao-basica', to: 'checkpoint-central' },
        { from: 'mecanica', to: 'checkpoint-central' },
        { from: 'meio-ambiente-1', to: 'checkpoint-central' },
        { from: 'checkpoint-central', to: 'meio-ambiente-2' },
        { from: 'checkpoint-central', to: 'direcao-defensiva-1' },
        { from: 'checkpoint-central', to: 'primeiros-socorros' },
        { from: 'direcao-defensiva-1', to: 'direcao-defensiva-2' },
        { from: 'primeiros-socorros', to: 'legislacao-1' },
        { from: 'legislacao-1', to: 'legislacao-2' }
    ];
    
    return { nodes, connections };
};