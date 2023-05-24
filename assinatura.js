window.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var responseText = this.responseText;

        var template = Handlebars.compile(responseText); // Compila o template

        var data = {
          nome: document.getElementById('nome').value,
          cargo: document.getElementById('cargo').value,
          setor: document.getElementById('setor').value,
          email: document.getElementById('email').value,
          telefone: document.getElementById('telefone').value,
          celular: document.getElementById('celular').value        
        };

        var renderedHTML = template(data); // Renderiza o template com os dados

        document.getElementById('column-2').innerHTML = renderedHTML;
      }
    };

    xmlhttp.open('GET', 'assinatura.html', true);
    xmlhttp.send();
  });

  var selectButton = document.getElementById('select-button');
  selectButton.addEventListener('click', selectAssinatura);

  function selectAssinatura() {
    var column2Content = document.getElementById('column-2');
    var range = document.createRange();
    range.selectNode(column2Content);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }

  // Função para formatar o número de telefone
function formatarTelefone(telefone) {
  var digits = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do valor digitado

  var formattedNumber = '';
  if (digits.length > 0) {
    formattedNumber = '(' + digits.substring(0, 2) + ') ';
    if (digits.length > 2) {
      if (digits.length <= 8) {
        formattedNumber += digits.substring(2, 6) + '-' + digits.substring(6, 8);
      } else {
        formattedNumber += digits.substring(2, 6) + '-' + digits.substring(6, 10);
      }
    }
  }

  return formattedNumber;
}

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

  var telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function() {
    var numeroFormatado = formatarTelefone(this.value);
    this.value = numeroFormatado;
  });

  var celularInput = document.getElementById('celular');
  celularInput.addEventListener('input', function() {
    var numeroFormatado = formatarCelular(this.value);
    this.value = numeroFormatado;
  });

  // Aplicar zoom no conteúdo da coluna 2
  var column2 = document.getElementById('column-2');
  column2.style.zoom = '2.2'; // Ajuste o valor de zoom conforme necessário
});
