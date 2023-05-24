window.addEventListener('DOMContentLoaded', function() {
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

      var selectButton = document.getElementById('select-button');
      selectButton.addEventListener('click', selectAssinatura);
    }
  };

  xmlhttp.open('GET', 'assinatura.html', true);
  xmlhttp.send();

  function selectAssinatura() {
    var column2Content = document.getElementById('column-2');
    var range = document.createRange();
    range.selectNode(column2Content);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
});
