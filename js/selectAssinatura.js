// Inicializa o Clipboard.js
var clipboard = new ClipboardJS('#select-button', {
  target: function (trigger) {
    return document.getElementById('x_Signature');
  }
});

// Manipulador de evento para o sucesso na cópia
clipboard.on('success', function (e) {
  alert('A assinatura foi copiada para a área de transferência.');
});

// Manipulador de evento para o erro na cópia
clipboard.on('error', function (e) {
  alert('Ocorreu um erro ao copiar a assinatura.');
});
