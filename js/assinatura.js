// Função para gerar a assinatura
function gerarAssinatura() {
  // Obtém os valores dos campos do formulário
  var nome = document.getElementById("nome").value;
  var cargo = document.getElementById("cargo").value;
  var setor = document.getElementById("setor").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;
  var celular = document.getElementById("celular").value;
  var unidadeSelecionada = document.getElementById("unidades_de_missao").value;

  // Verifica se a unidade foi selecionada
  if (unidadeSelecionada === "") {
    alert("Selecione uma unidade de missão antes de gerar a assinatura.");
    return;
  }

  // Verifica qual unidade foi selecionada e define o caminho do arquivo HTML correspondente
  var caminhoAssinatura = "";
  switch (unidadeSelecionada) {
    case "cecb":
      caminhoAssinatura = "assinaturas/cecb.html";
      break;
    case "cecc":
      caminhoAssinatura = "assinaturas/cecc.html";
      break;
    case "cecma":
      caminhoAssinatura = "assinaturas/cecma.html";
      break;
    case "padre":
      caminhoAssinatura = "assinaturas/padre.html";
      break;
    case "timoteo":
      caminhoAssinatura = "assinaturas/timoteo.html";
      break;
    default:
      alert("Unidade de missão inválida.");
      return;
  }

  // Realiza uma requisição AJAX para carregar o arquivo HTML da assinatura
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Substitui as variáveis no conteúdo do arquivo HTML da assinatura com os valores do formulário
      var assinatura = this.responseText;
      assinatura = assinatura.replace("{{nome}}", nome);
      assinatura = assinatura.replace("{{cargo}}", cargo);
      assinatura = assinatura.replace("{{setor}}", setor);
      assinatura = assinatura.replace("{{email}}", email);
      assinatura = assinatura.replace("{{telefone}}", telefone);
      assinatura = assinatura.replace("{{celular}}", celular);

      // Define o conteúdo da coluna 2 como a assinatura gerada
      var column2 = document.getElementById("column-2");
      column2.innerHTML = "<div class='centered-content'>" + assinatura + "</div>";
      column2.classList.add("align-center");
    }
    

  };
  xhttp.open("GET", caminhoAssinatura, true);
  xhttp.send();
}

// Adiciona um listener de evento para o botão "Gerar Assinatura"
document.getElementById("submit-button").addEventListener("click", gerarAssinatura);
