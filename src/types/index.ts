export interface ContentNode {
    id: string;
    title: string;
    status: 'completed' | 'current' | 'available' | 'locked';
    dependencies: string[]; // IDs dos nós que devem ser completados antes
    position: {
        x: number;
        y: number;
    };
    type: 'subject' | 'checkpoint'; // tipo do nó para diferentes visuais
}

export interface Connection {
    from: string;
    to: string;
}

export interface ProgressState {
    completedNodes: string[];
    currentNodeId: string | null;
    availableNodes: string[];
}

export interface UserProgress {
    userId: string;
    progress: ProgressState;
}

export interface GameMap {
    nodes: ContentNode[];
    connections: Connection[];
}