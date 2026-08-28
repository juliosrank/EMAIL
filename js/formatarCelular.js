/**
 * Formatação dinâmica de Celular / WhatsApp
 * Padrão: (XX) XXXXX-XXXX
 */
function formatarCelular(value) {
  if (!value) return '';
  
  // Remove todos os caracteres não numéricos
  var digits = value.replace(/\D/g, '').substring(0, 11);
  
  var formattedNumber = '';
  if (digits.length > 0) {
    formattedNumber = '(' + digits.substring(0, 2);
    if (digits.length > 2) {
      if (digits.length <= 7) {
        formattedNumber += ') ' + digits.substring(2);
      } else {
        formattedNumber += ') ' + digits.substring(2, 7) + '-' + digits.substring(7, 11);
      }
    }
  }
  return formattedNumber;
}

document.addEventListener('DOMContentLoaded', function() {
  var celularInput = document.getElementById('celular');
  if (celularInput) {
    celularInput.addEventListener('input', function() {
      var startPos = this.selectionStart;
      var prevLen = this.value.length;
      
      this.value = formatarCelular(this.value);
      
      // Ajuste básico de cursor
      if (this.selectionStart) {
        var diff = this.value.length - prevLen;
        this.setSelectionRange(startPos + diff, startPos + diff);
      }
    });
  }
});