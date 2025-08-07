# 🎮 Sistema de Gamificação Dinâmico

Sistema de gamificação totalmente configurável com **editor visual** e **exportação de HTML independente**, permitindo criar cursos e trilhas de aprendizado sem programação.

## 🚀 Características Principais

✅ **Totalmente Dinâmico**: Número de módulos definido no arquivo de configuração  
✅ **Editor Visual**: Interface drag-and-drop para criar configurações  
✅ **Exportação Independente**: Gera HTML completo que funciona offline  
✅ **Upload de Configurações**: Carrega arquivos JSON personalizados  
✅ **Progresso Persistente**: Salvamento automático por configuração  
✅ **Dependências Flexíveis**: Sistema de pré-requisitos configurável  
✅ **Sistema de Checkpoint**: Desbloqueio automático baseado em progresso  
✅ **Responsive Design**: Funciona em dispositivos móveis  
✅ **Interface Moderna**: Design intuitivo e animações suaves

## 📁 Estrutura do Projeto

```
gamificacao-site/
├── index.html              # Sistema principal de gamificação
├── config-editor.html      # Editor visual de configurações
├── public/
│   ├── gamificacao-core.js       # Lógica principal do sistema
│   ├── config-personalizada.js   # Sistema de upload/configuração
│   └── html-generator.js         # Gerador de HTML exportado
├── config-completa.json    # Configuração exemplo (11 módulos)
├── config-simples.json     # Exemplo simples (4 módulos)
├── config.json            # Configuração padrão
└── docs/
    ├── CONFIG-GUIDE.md     # Guia completo de configuração
    ├── CHECKPOINT-RULES.md # Regras dos checkpoints
    └── TROUBLESHOOTING.md  # Solução de problemas
```

## 🎯 Como Usar

### 📝 Método 1: Editor Visual
1. Abra `config-editor.html` no navegador
2. Use a interface drag-and-drop para:
   - Adicionar módulos ao mapa
   - Configurar propriedades (título, descrição, conteúdo)
   - Definir dependências entre módulos
   - Ajustar posições visuais
3. Clique em "Baixar HTML Completo" para gerar arquivo independente

### 📤 Método 2: Upload de Configuração
1. Abra `index.html` no navegador
2. Na seção "Carregar Configuração Personalizada":
   - Clique ou arraste um arquivo JSON
   - O sistema carrega automaticamente
3. Clique em "Baixar HTML" para exportar com a configuração

### 💾 Método 3: Configuração Direta
1. Edite qualquer arquivo `.json` (ex: `config.json`)
2. Faça upload pelo `index.html`
3. Sistema carrega a nova configuração instantaneamente

## ⚙️ Estrutura da Configuração

```json
{
  "title": "Nome do Curso",
  "subtitle": "Descrição do curso",
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
      "content": "Conteúdo completo em HTML...",
      "initialState": "available|locked",
      "type": "module|checkpoint",
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

### 📤 Exportação de HTML
- **HTML Independente**: Arquivo único que funciona offline
- **Progresso Separado**: Cada configuração mantém seu próprio progresso
- **CSS Integrado**: Todos os estilos incluídos automaticamente
- **JavaScript Embarcado**: Funcionalidade completa sem dependências

### 🎨 Editor Visual
- **Drag & Drop**: Arraste módulos para posicioná-los
- **Propriedades Dinâmicas**: Edite título, descrição e conteúdo em tempo real
- **Conexões Automáticas**: Visualize dependências entre módulos
- **Templates Prontos**: Configurações predefinidas para começar rapidamente

### 😊 Sistema de Emojis Personalizados
- **Emoji por Módulo**: Cada módulo pode ter seu próprio emoji
- **Padrão Inteligente**: Emoji padrão 📚 (livro) para módulos de conteúdo
- **Estados Dinâmicos**: Emojis mudam baseado no estado (🔒 bloqueado, ✅ concluído)
- **Personalização Completa**: Configure emojis únicos no editor visual
- **Exemplos Temáticos**: 
  - 🏠 Centro/Início
  - 🌱 Fundamentos
  - 🧠 Teoria
  - ⚡ Prática
  - 🔨 Projetos
  - 🏆 Certificação

```json
{
  "modules": {
    "modulo1": {
      "title": "Introdução",
      "emoji": "🌱",
      "description": "Conceitos básicos",
      "content": "...",
      "type": "content"
    }
  }
}
```

### 💾 Sistema de Progresso
- **localStorage Inteligente**: Progresso salvo por configuração
- **Restauração Automática**: Continua de onde parou
- **Chaves Únicas**: Baseadas no título da configuração
- **Compatibilidade**: Funciona em HTML exportado

### Estados dos Módulos
- **`available`**: Desbloqueado e acessível
- **`locked`**: Bloqueado, aguardando pré-requisitos
- **`completed`**: Já concluído pelo usuário
- **`current`**: Módulo atualmente selecionado

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

## 🛠️ Desenvolvimento e API

### Funções JavaScript Disponíveis
```javascript
// Carregar configuração
loadConfiguration(configObject, source)

// Navegar entre módulos
selectModule(moduleId)
completeModule(moduleId)

// Gerenciar progresso
resetProgress()
exportConfiguration()

// Upload de arquivos (apenas no index.html)
handleCustomConfigUpload(file, callback)
toggleCustomConfigSection()

// Geração de HTML (disponível globalmente)
generateGameHTML(config, options)
downloadHTML(htmlContent, filename)
```

### Eventos Personalizados
- **`module-selected`**: Disparado ao selecionar módulo
- **`module-completed`**: Disparado ao completar módulo
- **`configuration-loaded`**: Disparado ao carregar configuração
- **`progress-saved`**: Disparado ao salvar progresso

## 📊 Exemplos de Uso

### 🎯 Curso Linear (Sequencial)
```json
{
  "title": "Curso Básico de JavaScript",
  "modules": {
    "intro": {
      "title": "Introdução",
      "initialState": "available",
      "directUnlocks": ["variaveis"]
    },
    "variaveis": {
      "title": "Variáveis",
      "initialState": "locked", 
      "dependencies": ["intro"],
      "directUnlocks": ["funcoes"]
    },
    "funcoes": {
      "title": "Funções",
      "initialState": "locked",
      "dependencies": ["variaveis"]
    }
  }
}
```

```json
{
  "title": "Curso com Sistema de Checkpoints",
  "modules": {
    "modulo1": {
      "title": "Fundamentos 1",
      "initialState": "available",
      "isCheckpointRequirement": true
    },
    "modulo2": {
      "title": "Fundamentos 2", 
      "initialState": "available",
      "isCheckpointRequirement": true
    },
    "checkpoint1": {
      "title": "Checkpoint Básico",
      "type": "checkpoint",
      "initialState": "locked"
    },
    "avancado1": {
      "title": "Módulo Avançado",
      "initialState": "locked",
      "requiresCheckpoint": true
    }
  }
}
```

### 🌐 Curso com Múltiplas Dependências
```json
{
  "title": "Projeto Final",
  "modules": {
    "html": {
      "title": "HTML Básico",
      "initialState": "available"
    },
    "css": {
      "title": "CSS Básico",
      "initialState": "available"
    },
    "javascript": {
      "title": "JavaScript Básico",
      "initialState": "available"
    },
    "projeto": {
      "title": "Projeto Final",
      "initialState": "locked",
      "dependencies": ["html", "css", "javascript"]
    }
  }
}
```

## 🎨 Personalização e Configuração

### 🎨 Estilos Visuais
- **Módulos**: Círculos coloridos com animações
- **Checkpoints**: Maiores e com bordas especiais
- **Estados**: Cores diferentes para cada estado
- **Responsive**: Adapta automaticamente ao dispositivo

### 📐 Posicionamento
- Coordenadas `x` e `y` de 0 a 100 (%)
- Checkpoint sempre centralizado em `x: 50, y: 45`
- Editor visual permite arrastar para reposicionar

### 🔗 Conexões Visuais
- Linhas automáticas entre módulos
- Suporte a conexões com checkpoint
- Estilos configuráveis via CSS

## 🚀 Deploy e Hospedagem

### 📤 Hospedagem Simples
1. Faça upload dos arquivos para qualquer servidor web
2. Acesse `index.html` ou `config-editor.html`
3. Não requer configuração de servidor

### 📱 GitHub Pages
1. Fork este repositório
2. Ative GitHub Pages nas configurações
3. Acesse via `https://seu-usuario.github.io/gamificacao-site`

### 💾 Uso Offline
- HTML exportado funciona completamente offline
- Arrastar arquivo para navegador funciona
- Ideal para distribuição em pendrives/CDs

## 🐛 Depuração e Troubleshooting

### 🔍 Console do Navegador (F12)
```javascript
// Informações de debug
console.log(window.currentConfig)  // Configuração atual
console.log(localStorage)          // Progresso salvo

// Funções de teste
loadConfiguration(config, 'test')  // Testar configuração
resetProgress()                    // Limpar progresso
```

### 🛠️ Modo Debug
Ative `debugMode: true` para:
- Logs detalhados no console
- Informações de diagnóstico
- Mensagens de erro mais específicas

### ⚠️ Problemas Comuns
- **Módulos não aparecem**: Verifique formato JSON
- **Dependências não funcionam**: Confira IDs dos módulos
- **Progresso não salva**: Verifique localStorage do navegador
- **CSS quebrado**: Limpe cache do navegador

## 📱 Compatibilidade

- ✅ **Navegadores**: Chrome, Firefox, Safari, Edge (versões recentes)
- ✅ **Dispositivos**: Desktop, tablet, smartphone
- ✅ **Offline**: Funciona sem internet após carregamento
- ✅ **Dependências**: Zero dependências externas
- ✅ **Performance**: Otimizado para carregamento rápido

## 🔄 Migração e Integração

### 📊 Integração com LMS
- Exporte HTML para incorporar em Moodle, Canvas, etc.
- API JavaScript para comunicação com sistemas externos
- Eventos customizados para tracking de progresso

### 🔄 Migração de Sistemas Existentes
1. **Analise** a estrutura atual do curso
2. **Mapeie** módulos para o formato JSON
3. **Configure** dependências e checkpoints
4. **Teste** com usuários reais
5. **Deploy** gradualmente

## 📚 Documentação Adicional

- **[CONFIG-GUIDE.md](CONFIG-GUIDE.md)** - Guia completo de configuração JSON
- **[CHECKPOINT-RULES.md](CHECKPOINT-RULES.md)** - Regras detalhadas dos checkpoints
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solução de problemas comuns

## 📈 Próximas Funcionalidades

- [ ] Sistema de pontuação e badges
- [ ] Integração com APIs externas
- [ ] Temas visuais personalizáveis
- [ ] Analytics de progresso
- [ ] Suporte a vídeos e mídia
- [ ] Modo colaborativo

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


**[⬆️ Voltar ao topo](#-sistema-de-gamificação-dinâmico)**
