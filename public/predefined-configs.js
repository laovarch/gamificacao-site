// predefined-configs.js
// Configurações predefinidas do sistema de gamificação

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

function loadPredefinedConfig(configType) {
    const config = predefinedConfigs[configType];
    if (config) {
        loadConfiguration(config, configType);
        
        // Atualiza botões
        document.querySelectorAll('.config-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}
