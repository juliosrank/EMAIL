/**
 * Gerador de Assinaturas de E-mail
 * Colégio Católica Machado de Assis (UBEC)
 * Autor: Julio Scheffmacher Rank
 */

(function () {
  'use strict';

  // Elementos do DOM
  const form = document.getElementById('signature-form');
  const inputNome = document.getElementById('nome');
  const inputCargo = document.getElementById('cargo');
  const inputSetor = document.getElementById('setor');
  const inputEmail = document.getElementById('email');
  const inputTelefone = document.getElementById('telefone');
  const inputCelular = document.getElementById('celular');
  
  const signatureOutput = document.getElementById('signature-output');
  const signatureRenderBox = document.getElementById('signature-render-box');
  
  const btnCopySignature = document.getElementById('btn-copy-signature');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnDemoData = document.getElementById('btn-demo-data');
  const btnClearData = document.getElementById('btn-clear-data');
  const btnToggleZoom = document.getElementById('btn-toggle-zoom');
  const zoomText = document.getElementById('zoom-text');
  
  // Modal de Ajuda
  const helpModal = document.getElementById('help-modal');
  const btnHelp = document.getElementById('btn-help');
  const btnOpenDesktopHelper = document.getElementById('btn-open-desktop-helper');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalGotIt = document.getElementById('btn-modal-got-it');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  const btnCopyPath = document.getElementById('btn-copy-path');
  const btnDownloadShortcut = document.getElementById('btn-download-shortcut');
  const toastContainer = document.getElementById('toast-container');

  // Estado da aplicação
  let isZoomActive = false;

  // Dados padrão para exemplo inicial / placeholder
  const defaultValues = {
    nome: 'Maria Silva de Assis',
    cargo: 'Coordenadora Pedagógica',
    setor: 'Ensino Fundamental e Médio',
    email: 'maria.assis@cecma.edu.br',
    telefone: '(61) 3561-8000',
    celular: '(61) 99999-8888'
  };

  /**
   * Template HTML oficial da assinatura do Machado de Assis
   */
  function buildSignatureHTML(data) {
    const nome = escapeHtml(data.nome || defaultValues.nome);
    const cargo = escapeHtml(data.cargo || defaultValues.cargo);
    const setor = escapeHtml(data.setor || defaultValues.setor);
    const email = escapeHtml(data.email || defaultValues.email);
    const telefone = escapeHtml(data.telefone || '');
    const celular = escapeHtml(data.celular || '');

    // Construção dos blocos de contato opcionais
    let contatosHTML = '';
    if (email) {
      contatosHTML += `<p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)"><a href="mailto:${email}" style="color:rgb(40,52,138); text-decoration:none;">${email}</a></p>`;
    }
    if (celular) {
      contatosHTML += `<p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)"><span style="font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; font-size:15px; color:rgb(40,52,138)">${celular}</span></p>`;
    }
    if (telefone) {
      contatosHTML += `<p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)">${telefone}</p>`;
    }
    
    // Fallback se todos os contatos estiverem vazios
    if (!contatosHTML) {
      contatosHTML = `<p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)">${defaultValues.email}</p>`;
    }

    return `
<div id="x_Signature">
  <div>
    <div class="R1UVb" style="height: auto; width: 100%;" has-hovered="true">
      <table style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: medium; text-align: start; border-collapse: collapse; border-spacing: 0px; width: 640px; background-color: rgb(255, 255, 255); transform: scale(0.460938, 0.460938); transform-origin: left top;" min-scale="0.4609375">
        <tbody>
          <tr>
            <td align="left" style="margin:0px">
              <table align="left" style="border-collapse:collapse; float:left">
                <tbody>
                  <tr>
                    <td valign="top" style="margin:0px; width:530px">
                      <table width="100%" style="border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td align="left" style="padding:5px 0px 0px 35px; margin:0px">
                              <h1 style="margin:0px; line-height:20px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; font-size:20px; font-weight:bold; color:rgb(0,138,209)">${nome}</h1>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:10px 0px 0px 35px; margin:0px">
                              <p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:14px; font-size:14px; color:rgb(40,52,138)"><i>${cargo}</i><br aria-hidden="true">${setor}</p>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" style="padding:15px 0px 10px 35px; margin:0px">
                              <div style="padding-left:5px; margin:0px; border-left:3px solid rgb(0,138,209)!important">
                                ${contatosHTML}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="right" style="border-collapse:collapse; float:right">
                <tbody>
                  <tr>
                    <td align="left" style="margin:0px; width:50px; background-color:rgb(255,255,255)">
                      <table width="100%" style="border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td align="right" style="padding:0px 10px 0px 0px; margin:0px; font-size:0px">
                              <img data-imagetype="External" src="https://www.ubec.edu.br/mkt/email-mkt/mail/unidades_de_missao/images/SELO-GPTW.png" alt="GPTW" width="31" style="display:block; outline:none; border:none;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" style="margin:0px; background-color:rgb(255,255,255)">
              <table width="100%" style="border-collapse:collapse">
                <tbody>
                  <tr>
                    <td valign="top" style="margin:0px; width:600px">
                      <table width="100%" style="border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td style="margin:0px; font-size:0px">
                              <img data-imagetype="External" src="logomarca/cecma.png" alt="Colégio Católica Machado de Assis" width="634" style="display:block; outline:none; border:none; max-width:634px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    `.trim();
  }

  /**
   * Utilitário de escape de HTML
   */
  function escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  /**
   * Obtém os valores atuais digitados pelo usuário
   */
  function getFormData() {
    return {
      nome: inputNome.value.trim(),
      cargo: inputCargo.value.trim(),
      setor: inputSetor.value.trim(),
      email: inputEmail.value.trim(),
      telefone: inputTelefone.value.trim(),
      celular: inputCelular.value.trim()
    };
  }

  /**
   * Atualiza a renderização da assinatura na tela
   */
  function renderSignature() {
    const data = getFormData();
    const html = buildSignatureHTML(data);
    signatureOutput.innerHTML = html;
  }

  /**
   * Copia a assinatura em formato HTML rico para a área de transferência
   */
  async function copySignatureToClipboard() {
    const signatureElement = document.getElementById('x_Signature');
    if (!signatureElement) {
      showToast('Erro: Assinatura não encontrada.', 'danger');
      return;
    }

    const htmlContent = signatureElement.outerHTML;
    const plainText = signatureElement.innerText || signatureElement.textContent;

    let copySuccess = false;

    // Método 1: Clipboard API Moderna (com suporte a text/html)
    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const typeHtml = 'text/html';
        const typeText = 'text/plain';
        
        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([plainText], { type: typeText });

        const item = new ClipboardItem({
          [typeHtml]: blobHtml,
          [typeText]: blobText
        });

        await navigator.clipboard.write([item]);
        copySuccess = true;
      } catch (err) {
        console.warn('Falha no navigator.clipboard.write, usando fallback:', err);
      }
    }

    // Método 2: Fallback com Selection + execCommand('copy')
    if (!copySuccess) {
      try {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(signatureElement);
        selection.removeAllRanges();
        selection.addRange(range);
        
        copySuccess = document.execCommand('copy');
        selection.removeAllRanges();
      } catch (fallbackErr) {
        console.error('Erro no fallback de cópia:', fallbackErr);
      }
    }

    if (copySuccess) {
      btnCopySignature.classList.add('copied');
      btnCopyText.textContent = 'Assinatura Copiada!';
      
      showToast('Assinatura copiada com formatação! Basta colar (Ctrl + V) no Outlook.', 'success');

      setTimeout(() => {
        btnCopySignature.classList.remove('copied');
        btnCopyText.textContent = 'Copiar Assinatura Formatada';
      }, 3000);
    } else {
      showToast('Não foi possível copiar automaticamente. Selecione a assinatura e use Ctrl+C.', 'warning');
    }
  }

  /**
   * Sistema de Notificações Toast
   */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Animação de entrada
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remover após 4 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  /**
   * Copia o caminho da pasta de assinaturas do Outlook Desktop
   */
  function copyOutlookFolderPath() {
    const path = '%APPDATA%\\Microsoft\\Signatures';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(path).then(() => {
        showToast('Caminho copiado! Pressione Win+R, cole e aperte Enter.', 'success');
      }).catch(() => {
        fallbackCopyText(path);
      });
    } else {
      fallbackCopyText(path);
    }
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Caminho copiado! Pressione Win+R, cole e aperte Enter.', 'success');
  }

  /**
   * Baixa um script de atalho Windows (.cmd) que abre a pasta de assinaturas
   */
  function downloadShortcutScript() {
    const scriptContent = '@echo off\r\necho Abrindo pasta de assinaturas do Outlook...\r\nstart "" "%APPDATA%\\Microsoft\\Signatures"\r\n';
    const blob = new Blob([scriptContent], { type: 'application/cmd' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abrir_Pasta_Assinaturas_Outlook.cmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Atalho baixado! Execute o arquivo para abrir a pasta de assinaturas.', 'success');
  }

  /**
   * Preenche com dados de exemplo
   */
  function fillDemoData() {
    inputNome.value = defaultValues.nome;
    inputCargo.value = defaultValues.cargo;
    inputSetor.value = defaultValues.setor;
    inputEmail.value = defaultValues.email;
    inputTelefone.value = defaultValues.telefone;
    inputCelular.value = defaultValues.celular;
    renderSignature();
    showToast('Dados de exemplo preenchidos.', 'info');
  }

  /**
   * Limpa o formulário
   */
  function clearFormData() {
    inputNome.value = '';
    inputCargo.value = '';
    inputSetor.value = '';
    inputEmail.value = '';
    inputTelefone.value = '';
    inputCelular.value = '';
    renderSignature();
    showToast('Formulário limpo.', 'info');
    inputNome.focus();
  }

  /**
   * Alterna escala de zoom da visualização
   */
  function toggleZoom() {
    isZoomActive = !isZoomActive;
    if (isZoomActive) {
      signatureRenderBox.classList.add('zoom-active');
      zoomText.textContent = 'Zoom 115%';
      btnToggleZoom.classList.add('active');
    } else {
      signatureRenderBox.classList.remove('zoom-active');
      zoomText.textContent = 'Zoom 100%';
      btnToggleZoom.classList.remove('active');
    }
  }

  /**
   * Controle do Modal de Ajuda
   */
  function openHelpModal(defaultTabId = null) {
    if (defaultTabId) {
      switchTab(defaultTabId);
    }
    helpModal.classList.add('active');
    helpModal.setAttribute('aria-hidden', 'false');
  }

  function closeHelpModal() {
    helpModal.classList.remove('active');
    helpModal.setAttribute('aria-hidden', 'true');
  }

  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  // Event Listeners
  function setupEventListeners() {
    // Digitação em tempo real no formulário
    const inputs = [inputNome, inputCargo, inputSetor, inputEmail, inputTelefone, inputCelular];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', renderSignature);
        input.addEventListener('change', renderSignature);
      }
    });

    // Ações do formulário
    btnDemoData.addEventListener('click', fillDemoData);
    btnClearData.addEventListener('click', clearFormData);

    // Botão de Copiar Assinatura
    btnCopySignature.addEventListener('click', copySignatureToClipboard);

    // Controle de Zoom
    btnToggleZoom.addEventListener('click', toggleZoom);

    // Botões para Abrir Modal
    btnHelp.addEventListener('click', () => openHelpModal('tab-desktop'));
    btnOpenDesktopHelper.addEventListener('click', () => openHelpModal('tab-desktop'));

    // Fechar Modal
    btnCloseModal.addEventListener('click', closeHelpModal);
    btnModalGotIt.addEventListener('click', closeHelpModal);
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) {
        closeHelpModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && helpModal.classList.contains('active')) {
        closeHelpModal();
      }
    });

    // Abas do Modal
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        switchTab(tabId);
      });
    });

    // Ações Desktop do Modal
    btnCopyPath.addEventListener('click', copyOutlookFolderPath);
    btnDownloadShortcut.addEventListener('click', downloadShortcutScript);
  }

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    fillDemoData(); // Inicializa já renderizado com visual pronto para teste
  });

})();
