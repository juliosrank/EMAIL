/**
 * Formatação inteligente de Telefone (Fixo ou Celular)
 * Suporta 10 dígitos: (XX) XXXX-XXXX
 * Suporta 11 dígitos: (XX) XXXXX-XXXX
 */
function formatarTelefone(value) {
  if (!value) return '';
  
  // Remove todos os caracteres não numéricos
  var digits = value.replace(/\D/g, '').substring(0, 11);
  
  var formattedNumber = '';
  if (digits.length > 0) {
    formattedNumber = '(' + digits.substring(0, 2);
    if (digits.length > 2) {
      if (digits.length <= 6) {
        formattedNumber += ') ' + digits.substring(2);
      } else if (digits.length <= 10) {
        formattedNumber += ') ' + digits.substring(2, 6) + '-' + digits.substring(6);
      } else {
        formattedNumber += ') ' + digits.substring(2, 7) + '-' + digits.substring(7, 11);
      }
    }
  }
  return formattedNumber;
}

document.addEventListener('DOMContentLoaded', function() {
  var telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
      var startPos = this.selectionStart;
      var prevLen = this.value.length;
      
      this.value = formatarTelefone(this.value);
      
      if (this.selectionStart) {
        var diff = this.value.length - prevLen;
        this.setSelectionRange(startPos + diff, startPos + diff);
      }
    });
  }
});