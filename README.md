# 🎮 Sistema de Gamificação Dinâmico

Sistema de gamificação totalmente configurável que **carrega conteúdos de arquivo JSON externo**, permitindo criar cursos e trilhas de aprendizado sem modificar código.

## 🚀 Características Principais

✅ **Totalmente Dinâmico**: Número de módulos definido no arquivo de configuração  
✅ **Configuração Externa**: Toda estrutura definida em arquivo JSON  
✅ **Interface Auto-gerada**: HTML e conexões criados automaticamente  
✅ **Dependências Flexíveis**: Sistema de pré-requisitos configurável  
✅ **Sistema de Checkpoint**: Desbloqueio baseado em progresso  
✅ **Progresso Persistente**: Salvamento automático no navegador  
✅ **Responsive Design**: Funciona em dispositivos móveis  

## 📁 Arquivos do Projeto

- **`demo.html`** - Sistema principal de gamificação
- **`config.json`** - Configuração completa (11 módulos)
- **`config-simples.json`** - Exemplo simples (4 módulos)
- **`demo-dinamico.html`** - Interface para testar diferentes configurações
- **`CONFIG-GUIDE.md`** - Guia completo de configuração

## 🎯 Como Usar

### Método 1: Uso Direto
1. Edite o arquivo `config.json` com seus módulos
2. Abra `demo.html` no navegador
3. O sistema carrega automaticamente a configuração

### Método 2: Interface de Demonstração
1. Abra `demo-dinamico.html` no navegador
2. Escolha uma configuração pré-definida ou crie a sua
3. Teste diferentes estruturas de curso instantaneamente

## ⚙️ Estrutura da Configuração

```json
{
  "settings": {
    "checkpointRequiredModules": 4,
    "showProgressMessages": true,
    "autoSave": true,
    "debugMode": false
  },
  "modules": {
    "id-do-modulo": {
      "title": "Nome do Módulo",
      "description": "Descrição breve",
      "content": "Conteúdo completo...",
      "initialState": "available|locked",
      "position": { "x": 50, "y": 30 },
      "isCheckpointRequirement": true,
      "dependencies": ["modulo-prereq"],
      "directUnlocks": ["proximo-modulo"],
      "requiresCheckpoint": true
    }
  },
  "connections": [
    { "from": "modulo1", "to": "modulo2" }
  ]
}
```

## 🔧 Funcionalidades Avançadas

### Estados dos Módulos
- **`available`**: Desbloqueado e acessível
- **`locked`**: Bloqueado, aguardando pré-requisitos
- **`completed`**: Já concluído pelo usuário

### Sistema de Dependências
- **`dependencies`**: Módulos que devem ser completados primeiro
- **`directUnlocks`**: Módulos desbloqueados imediatamente
- **`requiresCheckpoint`**: Só desbloqueia após checkpoint ativo
- **`isCheckpointRequirement`**: Conta para ativar checkpoint

### Funções JavaScript Disponíveis
```javascript
// Recarregar configuração
reloadConfiguration('nova-config.json')

// Debug e diagnóstico
debugInfo()

// Gerenciar progresso
resetProgress()
exportConfiguration()

// Atalhos (se debugMode = true)
// Ctrl+D: Debug info
// Ctrl+R: Reset progress
// Ctrl+L: Reload config
```

## 📊 Exemplos de Uso

### Curso Linear (Sequencial)
```json
{
  "modules": {
    "modulo1": {
      "initialState": "available",
      "directUnlocks": ["modulo2"]
    },
    "modulo2": {
      "initialState": "locked", 
      "dependencies": ["modulo1"],
      "directUnlocks": ["modulo3"]
    }
  }
}
```

### Curso com Checkpoint Central
```json
{
  "modules": {
    "basico1": {
      "initialState": "available",
      "isCheckpointRequirement": true
    },
    "basico2": {
      "initialState": "available", 
      "isCheckpointRequirement": true
    },
    "avancado": {
      "initialState": "locked",
      "requiresCheckpoint": true
    }
  }
}
```

### Curso com Múltiplas Dependências
```json
{
  "modules": {
    "final": {
      "initialState": "locked",
      "dependencies": ["modulo1", "modulo2", "modulo3"]
    }
  }
}
```

## 🎨 Personalização Visual

### Posicionamento
- Coordenadas `x` e `y` de 0 a 100 (%)
- Checkpoint sempre em `x: 50, y: 45`

### Conexões Visuais
- Linhas automáticas entre módulos
- Suporte a conexões com checkpoint
- Estilos configuráveis via CSS

## 🐛 Depuração

### Console do Navegador (F12)
```javascript
debugInfo()           // Informações completas
gameConfig            // Configuração atual  
completedModules      // Progresso do usuário
```

### Modo Debug
Ative `debugMode: true` para:
- Atalhos de teclado
- Logs detalhados
- Informações de diagnóstico

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móveis (responsive)
- ✅ Offline (após carregamento inicial)
- ✅ Sem dependências externas

## 🔄 Migração de Sistemas Existentes

Para converter um sistema hardcoded:

1. **Extraia os módulos** para o formato JSON
2. **Defina dependências** entre módulos
3. **Configure posicionamento** visual
4. **Teste** com diferentes configurações
5. **Ajuste** baseado no feedback

## 💡 Casos de Uso

- **Cursos Online**: Trilhas de aprendizado
- **Treinamento Corporativo**: Módulos sequenciais  
- **Certificações**: Pré-requisitos obrigatórios
- **Jogos Educativos**: Progressão por níveis
- **Tutoriais**: Passos ordenados

## 🤝 Contribuição

O sistema é modular e extensível. Para adicionar funcionalidades:

1. Modifique a estrutura JSON conforme necessário
2. Adapte as funções de processamento
3. Mantenha compatibilidade com configurações existentes
4. Documente mudanças no CONFIG-GUIDE.md

---

**Desenvolvido para máxima flexibilidade e facilidade de uso!** 🎯