// Função para formatar o número de celular
function formatarCelular(celular) {
    var digits = celular.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do valor digitado

    var formattedNumber = '';
    if (digits.length > 0) {
      formattedNumber = '(' + digits.substring(0, 2) + ') ';
      if (digits.length > 2) {
        if (digits.length <= 7) {
          formattedNumber += digits.substring(2, 7);
        } else {
          formattedNumber += digits.substring(2, 7) + '-' + digits.substring(7, 11);
        }
      }
    }

    return formattedNumber;
  }

  var celularInput = document.getElementById('celular');
  celularInput.addEventListener('input', function() {
    var numeroFormatado = formatarCelular(this.value);
    this.value = numeroFormatado;
  });