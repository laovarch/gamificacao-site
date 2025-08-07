import React, { useState, useEffect } from 'react';
import ProgressMap from '../components/ProgressMap';
import { 
    createGameMapData, 
    initializeProgress, 
    completeNode, 
    getNodeStatus 
} from '../utils/gamification';
import { ProgressState, GameMap } from '../types';

interface ContentDetails {
    [key: string]: {
        title: string;
        description: string;
        content: string;
    };
}

const contentDetails: ContentDetails = {
    'manobras': {
        title: 'Manobras',
        description: 'Aprenda as manobras básicas de condução',
        content: 'Este módulo ensina as manobras fundamentais para uma condução segura, incluindo estacionamento, conversões e mudanças de faixa.'
    },
    'baliza': {
        title: 'Baliza',
        description: 'Técnicas de estacionamento em baliza',
        content: 'Domine a arte do estacionamento em vaga de baliza, uma das habilidades mais importantes para todo condutor.'
    },
    'direcao-basica': {
        title: 'Direção Básica',
        description: 'Fundamentos da direção veicular',
        content: 'Conceitos fundamentais de direção, incluindo postura, uso dos pedais e direcionamento do veículo.'
    },
    'mecanica': {
        title: 'Mecânica',
        description: 'Noções básicas de mecânica automotiva',
        content: 'Entenda o funcionamento básico do veículo, manutenção preventiva e identificação de problemas comuns.'
    },
    'meio-ambiente-1': {
        title: 'Meio Ambiente I',
        description: 'Impactos ambientais do trânsito',
        content: 'Compreenda como o trânsito afeta o meio ambiente e como dirigir de forma mais sustentável.'
    },
    'meio-ambiente-2': {
        title: 'Meio Ambiente II',
        description: 'Práticas sustentáveis no trânsito',
        content: 'Aprofunde seus conhecimentos sobre sustentabilidade no trânsito e práticas de condução ecológica.'
    },
    'direcao-defensiva-1': {
        title: 'Direção Defensiva I',
        description: 'Princípios da direção defensiva',
        content: 'Aprenda os fundamentos da direção defensiva para prevenir acidentes e dirigir com segurança.'
    },
    'direcao-defensiva-2': {
        title: 'Direção Defensiva II',
        description: 'Técnicas avançadas de direção defensiva',
        content: 'Técnicas avançadas para situações complexas no trânsito e condução em condições adversas.'
    },
    'primeiros-socorros': {
        title: 'Primeiros Socorros',
        description: 'Atendimento básico em emergências',
        content: 'Aprenda procedimentos básicos de primeiros socorros para situações de emergência no trânsito.'
    },
    'legislacao-1': {
        title: 'Legislação I',
        description: 'Código de Trânsito Brasileiro - Parte I',
        content: 'Estude as leis de trânsito, sinalizações e normas de circulação do Código de Trânsito Brasileiro.'
    },
    'legislacao-2': {
        title: 'Legislação II',
        description: 'Código de Trânsito Brasileiro - Parte II',
        content: 'Aprofunde seus conhecimentos sobre infrações, penalidades e responsabilidades no trânsito.'
    }
};

const Home: React.FC = () => {
    const [gameMap, setGameMap] = useState<GameMap | null>(null);
    const [progress, setProgress] = useState<ProgressState | null>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [showContent, setShowContent] = useState<boolean>(false);

    useEffect(() => {
        // Inicializar o mapa do jogo e progresso
        const map = createGameMapData();
        const initialProgress = initializeProgress(map);
        
        setGameMap(map);
        setProgress(initialProgress);
    }, []);

    const handleNodeClick = (nodeId: string) => {
        if (!progress || !gameMap) return;

        const node = gameMap.nodes.find(n => n.id === nodeId);
        if (!node) return;

        const nodeStatus = getNodeStatus(node, progress);
        
        if (nodeStatus === 'available' || nodeStatus === 'current') {
            setSelectedNode(nodeId);
            setShowContent(true);
        }
    };

    const handleCompleteContent = () => {
        if (!selectedNode || !progress || !gameMap) return;

        const newProgress = completeNode(selectedNode, progress, gameMap);
        setProgress(newProgress);
        setShowContent(false);
        setSelectedNode(null);

        // Salvar progresso no localStorage
        localStorage.setItem('gamification-progress', JSON.stringify(newProgress));
    };

    const handleBackToMap = () => {
        setShowContent(false);
        setSelectedNode(null);
    };

    if (!gameMap || !progress) {
        return <div className="loading">Carregando...</div>;
    }

    if (showContent && selectedNode) {
        const content = contentDetails[selectedNode];
        if (!content) return null;

        return (
            <div className="home">
                <div className="container">
                    <div className="content-details">
                        <button onClick={handleBackToMap} className="button" style={{ marginBottom: '20px' }}>
                            ← Voltar ao Mapa
                        </button>
                        
                        <h2>{content.title}</h2>
                        <p><strong>{content.description}</strong></p>
                        <p>{content.content}</p>
                        
                        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                            <button onClick={handleCompleteContent} className="button">
                                ✓ Marcar como Concluído
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const completedCount = progress.completedNodes.length;
    const totalCount = gameMap.nodes.filter(n => n.type === 'subject').length;

    return (
        <div className="home">
            <div className="container">
                <h1>Sistema de Gamificação - Curso de Condução</h1>
                
                <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px', fontSize: '18px' }}>
                    Progresso: {completedCount}/{totalCount} módulos concluídos
                </div>

                <ProgressMap 
                    nodes={gameMap.nodes}
                    connections={gameMap.connections}
                    progress={progress}
                    onNodeClick={handleNodeClick}
                />

                <div style={{ 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    padding: '20px', 
                    borderRadius: '15px', 
                    marginTop: '20px',
                    textAlign: 'center'
                }}>
                    <h3>Como funciona</h3>
                    <p>
                        • Clique nos nós <strong>disponíveis</strong> (azuis) ou <strong>atuais</strong> (azul claro) para acessar o conteúdo<br/>
                        • Complete um módulo para desbloquear os próximos<br/>
                        • Nós <strong>bloqueados</strong> (cinza) só ficam disponíveis após completar os requisitos<br/>
                        • Seu progresso é salvo automaticamente
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;

export default Home;