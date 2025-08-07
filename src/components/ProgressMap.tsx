import React from 'react';
import { ContentNode, Connection, ProgressState } from '../types';
import { getNodeStatus } from '../utils/gamification';

interface ProgressMapProps {
    nodes: ContentNode[];
    connections: Connection[];
    progress: ProgressState;
    onNodeClick: (nodeId: string) => void;
}

interface NodeComponentProps {
    node: ContentNode;
    status: 'completed' | 'current' | 'available' | 'locked';
    onClick: () => void;
}

const NodeComponent: React.FC<NodeComponentProps> = ({ node, status, onClick }) => {
    const getNodeClass = () => {
        let baseClass = 'progress-node';
        if (node.type === 'checkpoint') {
            baseClass += ' checkpoint';
        }
        return `${baseClass} ${status}`;
    };

    const isClickable = status === 'available' || status === 'current';

    return (
        <div
            className={getNodeClass()}
            style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                cursor: isClickable ? 'pointer' : 'default'
            }}
            onClick={isClickable ? onClick : undefined}
        >
            {node.type === 'checkpoint' ? (
                <div className="checkpoint-icon">✓</div>
            ) : (
                <div className="node-content">
                    <span className="node-title">{node.title}</span>
                    {status === 'locked' && <div className="lock-overlay">🔒</div>}
                </div>
            )}
        </div>
    );
};

const ConnectionLine: React.FC<{ from: ContentNode; to: ContentNode }> = ({ from, to }) => {
    const x1 = from.position.x;
    const y1 = from.position.y;
    const x2 = to.position.x;
    const y2 = to.position.y;

    return (
        <svg className="connection-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#e0e0e0"
                strokeWidth="2"
                strokeDasharray="5,5"
            />
        </svg>
    );
};

const ProgressMap: React.FC<ProgressMapProps> = ({ nodes, connections, progress, onNodeClick }) => {
    const nodeMap = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
    }, {} as Record<string, ContentNode>);

    return (
        <div className="progress-map-container">
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color completed"></div>
                    <span>LIDO</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color current"></div>
                    <span>LEITURA ATUAL</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>DISPONÍVEL</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color locked"></div>
                    <span>BLOQUEADO</span>
                </div>
            </div>
            
            <div className="progress-map">
                {/* Render connections first (behind nodes) */}
                {connections.map((connection, index) => {
                    const fromNode = nodeMap[connection.from];
                    const toNode = nodeMap[connection.to];
                    if (!fromNode || !toNode) return null;
                    
                    return (
                        <ConnectionLine
                            key={`${connection.from}-${connection.to}-${index}`}
                            from={fromNode}
                            to={toNode}
                        />
                    );
                })}
                
                {/* Render nodes */}
                {nodes.map((node) => (
                    <NodeComponent
                        key={node.id}
                        node={node}
                        status={getNodeStatus(node, progress)}
                        onClick={() => onNodeClick(node.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProgressMap;