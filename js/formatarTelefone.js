// Função para formatar o número de telefone
function formatarTelefone(telefone) {
    var digits = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do valor digitado

    var formattedNumber = '';
    if (digits.length > 0) {
      formattedNumber = '(' + digits.substring(0, 2) + ') ';
      if (digits.length > 2) {
        if (digits.length <= 6) {
          formattedNumber += digits.substring(2, 6);
        } else if (digits.length <= 10) {
          formattedNumber += digits.substring(2, 6) + '-' + digits.substring(6, 10);
        } else {
          formattedNumber += digits.substring(2, 7) + '-' + digits.substring(7, 11);
        }
      }
    }

    return formattedNumber;
  }

  var telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function() {
    var numeroFormatado = formatarTelefone(this.value);
    this.value = numeroFormatado;
  });