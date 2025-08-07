// upload-manager.js
// Gerenciamento de upload de arquivos de configuração

// Inicialização do sistema de upload
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');

    // Clique na área de upload
    if (uploadArea) uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }

    // Seleção de arquivo
    if (fileInput) fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
});

function handleFileUpload(file) {
    if (!file.name.endsWith('.json')) {
        showNotification('❌ Por favor, selecione um arquivo JSON válido');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            // Validação básica da estrutura
            if (!config.title || !config.modules) {
                throw new Error('Estrutura de configuração inválida');
            }
            // Mostra informações do arquivo
            const fileInfo = document.getElementById('fileInfo');
            fileInfo.innerHTML = `
                <strong>✅ Arquivo carregado com sucesso!</strong><br>
                📁 ${file.name}<br>
                📊 ${Object.keys(config.modules).length} módulos encontrados<br>
                🎯 ${config.title}
            `;
            fileInfo.style.display = 'block';
            // Carrega a configuração
            loadConfiguration(config, 'personalizada');
            // Recolhe a sessão após upload bem-sucedido
            const content = document.getElementById('customConfigContent');
            const toggleIcon = document.getElementById('customConfigToggle');
            content.classList.remove('visible');
            content.classList.add('hidden');
            toggleIcon.textContent = '▼';
            toggleIcon.classList.remove('rotated');
            setTimeout(() => {
                if (content.classList.contains('hidden')) {
                    content.style.display = 'none';
                }
            }, 300);
        } catch (error) {
            showNotification('❌ Erro ao processar arquivo JSON: ' + error.message);
            console.error('Erro no JSON:', error);
        }
    };
    reader.readAsText(file);
}

function toggleCustomConfigSection() {
    const content = document.getElementById('customConfigContent');
    const toggleIcon = document.getElementById('customConfigToggle');
    
    if (content.style.display === 'none' || content.style.display === '') {
        // Abrir
        content.style.display = 'block';
        content.classList.remove('hidden');
        content.classList.add('visible');
        toggleIcon.textContent = '▲';
        toggleIcon.classList.add('rotated');
    } else {
        // Fechar
        content.classList.remove('visible');
        content.classList.add('hidden');
        toggleIcon.textContent = '▼';
        toggleIcon.classList.remove('rotated');
        
        // Aguarda a animação antes de esconder completamente
        setTimeout(() => {
            if (content.classList.contains('hidden')) {
                content.style.display = 'none';
            }
        }, 300);
    }
}
