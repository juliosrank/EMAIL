/**
 * Validação e Formatação Inteligente de Contato (Telefone ou E-mail)
 * Atrio Hotel Management
 * Autor: Julio Scheffmacher Rank
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

/**
 * Detecta se o valor inserido é Telefone, E-mail ou Vazio
 * Se contiver qualquer letra ou '@', classifica imediatamente como E-mail
 * Se contiver dígitos (e nenhuma letra), classifica como Telefone
 */
function detectContactType(value) {
  if (!value) return 'empty';
  var trimmed = String(value).trim();
  if (!trimmed) return 'empty';
  
  if (/[a-zA-Z]/.test(trimmed) || trimmed.indexOf('@') !== -1) {
    return 'email';
  }
  if (/\d/.test(trimmed)) {
    return 'phone';
  }
  return 'empty';
}

window.formatarTelefone = formatarTelefone;
window.detectContactType = detectContactType;

function updateContactField(input) {
  if (!input) return;
  var rawVal = input.value;
  var type = detectContactType(rawVal);
  var contatoIcon = document.getElementById('contato-field-icon');

  if (type === 'phone') {
    var startPos = input.selectionStart;
    var prevLen = input.value.length;
    input.value = formatarTelefone(rawVal);
    if (input.selectionStart !== null && input.selectionStart !== undefined) {
      var diff = input.value.length - prevLen;
      input.setSelectionRange(startPos + diff, startPos + diff);
    }
  }

  if (contatoIcon) {
    contatoIcon.setAttribute('data-type', type);
    if (type === 'email') {
      contatoIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>';
      contatoIcon.title = 'E-mail';
    } else if (type === 'phone') {
      contatoIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
      contatoIcon.title = 'Telefone';
    } else {
      contatoIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
      contatoIcon.title = 'Telefone ou E-mail';
    }
  }
}

window.updateContactField = updateContactField;

document.addEventListener('DOMContentLoaded', function() {
  var contatoInput = document.getElementById('telefone');
  if (contatoInput) {
    contatoInput.addEventListener('input', function() {
      updateContactField(this);
    });
    updateContactField(contatoInput);
  }
});