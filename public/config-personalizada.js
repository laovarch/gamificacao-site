// config-personalizada.js
// Responsável apenas pelo carregamento de configuração personalizada e UI de upload

window.currentConfig = null;

window.handleCustomConfigUpload = function(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const json = JSON.parse(e.target.result);
      window.currentConfig = json;
      // Chama loadConfiguration automaticamente se disponível
      if (typeof window.loadConfiguration === 'function') {
        window.loadConfiguration(window.currentConfig, 'personalizada');
      }
      if (typeof callback === 'function') callback(json);
    } catch (err) {
      alert('Arquivo JSON inválido!');
    }
  };
  reader.readAsText(file);
};

// UI de upload (pode ser customizada conforme necessário)
document.addEventListener('DOMContentLoaded', function() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const fileInfo = document.getElementById('fileInfo');
  if (!uploadArea || !fileInput) return;

  uploadArea.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
  uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
    }
  });
  fileInput.addEventListener('change', function() {
    if (fileInput.files.length) {
      const file = fileInput.files[0];
      window.handleCustomConfigUpload(file, (json) => {
        fileInfo.style.display = 'block';
        fileInfo.textContent = 'Configuração carregada: ' + file.name;
        // Aqui pode-se disparar evento para carregar a gamificação
      });
    }
  });
});
