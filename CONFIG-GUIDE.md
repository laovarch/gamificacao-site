# Guia de Configuração do Sistema de Gamificação Dinâmico

## Visão Geral

Este sistema de gamificação **carrega as configurações de um arquivo JSON externo** (`config.json`), permitindo que você configure facilmente:
- Quantos conteúdos terá o sistema (dinâmico)
- Quais conteúdos estão disponíveis inicialmente
- Dependências entre módulos
- Estados iniciais (bloqueado/desbloqueado)
- Conectividade e posicionamento visual

## Arquivo de Configuração (config.json)

O sistema lê automaticamente o arquivo `config.json` que deve estar na mesma pasta do HTML. Estrutura:

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
      "title": "Título do Módulo",
      "description": "Descrição breve",
      "content": "Conteúdo completo do módulo",
      "initialState": "available",
      "isCheckpointRequirement": true,
      "directUnlocks": ["proximo-modulo"],
      "dependencies": ["modulo-prereq"],
      "requiresCheckpoint": false,
      "position": { "x": 50, "y": 30 }
    }
  },
  "connections": [
    { "from": "modulo1", "to": "modulo2" },
    { "from": "modulo1", "to": "checkpoint" }
  ]
}
```

## Propriedades dos Módulos

### Propriedades Obrigatórias
- **`title`**: Nome do módulo (string)
- **`description`**: Descrição breve (string)  
- **`content`**: Conteúdo completo (string)
- **`initialState`**: Estado inicial - `"available"` ou `"locked"`
- **`position`**: Posição no mapa - `{"x": 50, "y": 30}` (valores em %)

### Propriedades Opcionais
- **`isCheckpointRequirement`**: Se o módulo é necessário para ativar checkpoint (boolean)
- **`directUnlocks`**: Array de módulos desbloqueados diretamente (array de strings)
- **`dependencies`**: Array de módulos que devem ser completados primeiro (array de strings)
- **`requiresCheckpoint`**: Se só desbloqueia após checkpoint ativo (boolean)

## Configurações Gerais

```json
"settings": {
  "checkpointRequiredModules": 4,    // Quantos módulos ativam o checkpoint
  "showProgressMessages": true,      // Mostrar mensagens de conclusão
  "autoSave": true,                  // Salvar progresso automaticamente
  "debugMode": false                 // Ativar modo debug
}
```

## Conexões Visuais

As linhas conectoras entre módulos são definidas no array `connections`:

```json
"connections": [
  { "from": "manobras", "to": "baliza" },
  { "from": "manobras", "to": "checkpoint" },
  { "from": "checkpoint", "to": "primeiros-socorros" }
]
```

## Exemplos Práticos

### Exemplo 1: Sistema Simples (3 módulos)
```json
{
  "settings": {
    "checkpointRequiredModules": 2,
    "showProgressMessages": true,
    "autoSave": true,
    "debugMode": false
  },
  "modules": {
    "modulo1": {
      "title": "Módulo Inicial",
      "description": "Primeiro módulo do curso",
      "content": "Conteúdo introdutório...",
      "initialState": "available",
      "isCheckpointRequirement": true,
      "position": { "x": 30, "y": 30 }
    },
    "modulo2": {
      "title": "Módulo Básico",
      "description": "Segundo módulo",
      "content": "Conteúdo básico...",
      "initialState": "available", 
      "isCheckpointRequirement": true,
      "position": { "x": 70, "y": 30 }
    },
    "modulo3": {
      "title": "Módulo Avançado",
      "description": "Módulo final",
      "content": "Conteúdo avançado...",
      "initialState": "locked",
      "requiresCheckpoint": true,
      "position": { "x": 50, "y": 70 }
    }
  },
  "connections": [
    { "from": "modulo1", "to": "checkpoint" },
    { "from": "modulo2", "to": "checkpoint" },
    { "from": "checkpoint", "to": "modulo3" }
  ]
}
```

### Exemplo 2: Sistema Linear (sequencial)
```json
{
  "settings": {
    "checkpointRequiredModules": 0,
    "showProgressMessages": true,
    "autoSave": true
  },
  "modules": {
    "inicio": {
      "title": "Início",
      "description": "Módulo inicial",
      "content": "Começando o curso...",
      "initialState": "available",
      "directUnlocks": ["meio"],
      "position": { "x": 25, "y": 50 }
    },
    "meio": {
      "title": "Meio",
      "description": "Módulo intermediário", 
      "content": "Continuando o aprendizado...",
      "initialState": "locked",
      "dependencies": ["inicio"],
      "directUnlocks": ["fim"],
      "position": { "x": 50, "y": 50 }
    },
    "fim": {
      "title": "Fim",
      "description": "Módulo final",
      "content": "Concluindo o curso...",
      "initialState": "locked",
      "dependencies": ["meio"],
      "position": { "x": 75, "y": 50 }
    }
  },
  "connections": [
    { "from": "inicio", "to": "meio" },
    { "from": "meio", "to": "fim" }
  ]
}
```

## Funções Disponíveis

### `reloadConfiguration(filename)`
Recarrega configuração de arquivo específico:
```javascript
reloadConfiguration('minha-config.json')
```

### `exportConfiguration()`
Baixa configuração atual com progresso em JSON.

### `resetProgress()`
Reseta todo o progresso do usuário.

### `debugInfo()`
Mostra informações detalhadas no console (F12).

## Atalhos de Teclado (Debug Mode)

Quando `debugMode: true`:
- **Ctrl + D**: Mostra informações de debug
- **Ctrl + R**: Reset do progresso  
- **Ctrl + L**: Recarrega configuração

## Como Usar

1. **Crie seu arquivo `config.json`** com a estrutura de módulos desejada
2. **Coloque o arquivo na mesma pasta** do `demo.html`
3. **Abra o `demo.html`** - O sistema carregará automaticamente
4. **Para modificar**: Edite o `config.json` e recarregue a página (ou Ctrl+L)

## Vantagens do Sistema Dinâmico

✅ **Completamente flexível**: Adicione/remova módulos sem tocar no código  
✅ **Configuração externa**: Fácil manutenção e versionamento  
✅ **Geração automática**: Interface criada dinamicamente  
✅ **Validação automática**: Sistema detecta erros de configuração  
✅ **Backup fácil**: Exporte/importe configurações em JSON  

## Solução de Problemas

- **"Erro ao carregar config.json"**: Verifique se o arquivo existe na mesma pasta
- **Módulo não aparece**: Verifique sintaxe JSON e propriedades obrigatórias
- **Conexões não funcionam**: Verifique se IDs dos módulos existem
- **Posicionamento incorreto**: Ajuste valores x/y (0-100)

Para depuração detalhada, ative `debugMode: true` e use `debugInfo()` no console.
