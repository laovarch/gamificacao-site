# Troubleshooting - Demo Dinâmica

## Problemas Comuns e Soluções

### 1. **Configuração não carrega**

**Sintomas:**
- Botão clicado mas nada acontece
- Mensagem de erro no console

**Verificações:**
1. Abra o Console do navegador (F12)
2. Verifique se há erros de rede (404, CORS)
3. Confirme se o arquivo JSON existe na pasta

**Soluções:**
- Para **erro 404**: Verifique se o arquivo existe na mesma pasta
- Para **erro CORS**: Sirva os arquivos através de um servidor HTTP
- Para **erro JSON**: Valide a sintaxe no [jsonlint.com](https://jsonlint.com)

### 2. **Iframe não responde**

**Sintomas:**
- Sistema carrega mas não muda de configuração
- Console mostra "Erro ao comunicar com o sistema"

**Soluções:**
1. Aguarde o iframe carregar completamente
2. Recarregue a página (F5)
3. Teste com configuração menor (config-teste.json)

### 3. **Módulos não aparecem**

**Sintomas:**
- Sistema carrega mas mapa fica vazio
- Contador mostra 0/0 módulos

**Verificações:**
1. Verifique sintaxe JSON
2. Confirme propriedades obrigatórias:
   - `title`, `description`, `content`
   - `position` com `x` e `y` numéricos
   - `initialState` válido

### 4. **Como testar se está funcionando**

1. **Teste Básico:**
   - Clique em "Configuração de Teste (2 módulos)"
   - Deve carregar rapidamente
   - Console deve mostrar: "Configuração processada: 2 módulos carregados"

2. **Teste Avançado:**
   - Use F12 para abrir Console
   - Clique em uma configuração
   - Acompanhe os logs de carregamento

3. **Teste Manual:**
   - Crie um arquivo JSON simples
   - Use "Carregar Arquivo JSON"
   - Verifique se carrega corretamente

### 5. **Estrutura Mínima de Teste**

```json
{
  "settings": {
    "checkpointRequiredModules": 0,
    "showProgressMessages": true,
    "autoSave": true,
    "debugMode": true
  },
  "modules": {
    "teste": {
      "title": "Teste",
      "description": "Módulo de teste",
      "content": "Conteúdo de teste",
      "initialState": "available",
      "position": { "x": 50, "y": 50 }
    }
  },
  "connections": []
}
```

### 6. **Logs Importantes**

No Console (F12), procure por:
- ✅ "Carregando configuração: config.json"
- ✅ "Configuração carregada: [objeto]"
- ✅ "Configuração enviada para iframe"
- ✅ "Configuração processada: X módulos carregados"

### 7. **Forçar Recarregamento**

Se nada funciona:
1. Feche todas as abas
2. Limpe cache do navegador (Ctrl+Shift+Delete)
3. Abra novamente demo-dinamico.html
4. Teste com config-teste.json primeiro

### 8. **Servidor HTTP Local**

Para resolver problemas de CORS:

**Python 3:**
```bash
cd pasta-do-projeto
python -m http.server 8000
# Acesse: http://localhost:8000/demo-dinamico.html
```

**Node.js:**
```bash
npx http-server
# Acesse o endereço mostrado
```

**VS Code:**
- Instale extensão "Live Server"
- Clique direito no arquivo > "Open with Live Server"
