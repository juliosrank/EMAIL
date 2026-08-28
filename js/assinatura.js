/**
 * Gerador de Assinaturas de E-mail
 * Colégio Católica Machado de Assis
 * Autor: Julio Scheffmacher Rank
 */

(function () {
  'use strict';

  // Elementos do DOM
  const inputNome = document.getElementById('nome');
  const inputCargo = document.getElementById('cargo');
  const inputSetor = document.getElementById('setor');
  const inputEmail = document.getElementById('email');
  const inputTelefone = document.getElementById('telefone');

  const signatureOutput = document.getElementById('signature-output');
  const btnCopySignature = document.getElementById('btn-copy-signature');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnClearData = document.getElementById('btn-clear-data');
  const btnInstallDesktop = document.getElementById('btn-install-desktop');

  // Modal
  const helpModal = document.getElementById('help-modal');
  const btnHelp = document.getElementById('btn-help');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalClose = document.getElementById('btn-modal-close');
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');

  const toastContainer = document.getElementById('toast-container');

  /**
   * Constrói o HTML da assinatura para exibição e cópia
   */
  function buildSignatureHTML(data) {
    const nome = escapeHtml(data.nome) || '<span style="color:#94a3b8">Nome Completo</span>';
    const cargo = escapeHtml(data.cargo) || '<span style="color:#94a3b8">Cargo / Função</span>';
    const setor = escapeHtml(data.setor) || '<span style="color:#94a3b8">Setor</span>';
    const email = escapeHtml(data.email) || '<span style="color:#94a3b8">email@cecma.edu.br</span>';
    const telefone = escapeHtml(data.telefone) || '<span style="color:#94a3b8">(00) 00000-0000</span>';

    const emailLink = data.email 
      ? `<a href="mailto:${escapeHtml(data.email)}" style="color:rgb(40,52,138); text-decoration:none;">${escapeHtml(data.email)}</a>` 
      : email;

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
                                <p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)">${emailLink}</p>
                                <p style="margin:0px; font-family:'source sans pro','helvetica neue',helvetica,arial,sans-serif; line-height:15px; font-size:15px; color:rgb(40,52,138)">${telefone}</p>
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

  function escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  function getFormData() {
    return {
      nome: inputNome.value.trim(),
      cargo: inputCargo.value.trim(),
      setor: inputSetor.value.trim(),
      email: inputEmail.value.trim(),
      telefone: inputTelefone.value.trim()
    };
  }

  function renderSignature() {
    const data = getFormData();
    signatureOutput.innerHTML = buildSignatureHTML(data);
  }

  /**
   * Copia a assinatura formatada em HTML rico
   */
  async function copySignatureToClipboard() {
    const signatureElement = document.getElementById('x_Signature');
    if (!signatureElement) {
      showToast('Preencha os campos para gerar a assinatura.');
      return;
    }

    const htmlContent = signatureElement.outerHTML;
    const plainText = signatureElement.innerText || signatureElement.textContent;

    let success = false;

    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        const blobText = new Blob([plainText], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText
          })
        ]);
        success = true;
      } catch (err) {
        console.warn('ClipboardItem fallback:', err);
      }
    }

    if (!success) {
      try {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(signatureElement);
        selection.removeAllRanges();
        selection.addRange(range);
        success = document.execCommand('copy');
        selection.removeAllRanges();
      } catch (err) {
        console.error('Erro na cópia:', err);
      }
    }

    if (success) {
      btnCopySignature.classList.add('copied');
      btnCopyText.textContent = 'Assinatura Copiada!';
      showToast('Assinatura copiada com sucesso! Cole (Ctrl+V) no Outlook.');

      setTimeout(() => {
        btnCopySignature.classList.remove('copied');
        btnCopyText.textContent = 'Copiar Assinatura';
      }, 2500);
    } else {
      showToast('Não foi possível copiar automaticamente. Selecione e use Ctrl+C.');
    }
  }

  /**
   * Gera e baixa o instalador automático .bat para o Outlook Desktop
   */
  function generateDesktopInstaller() {
    const data = getFormData();
    
    // Constrói HTML limpo para o arquivo .htm do Outlook
    const rawHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body style="margin:0; padding:0;">
${buildSignatureHTML(data)}
</body>
</html>`;

    const plainText = `${data.nome || 'Nome Completo'}
${data.cargo || ''} - ${data.setor || ''}
${data.email || ''} | ${data.telefone || ''}
Colégio Católica Machado de Assis`;

    // Codifica em Base64 para gravação segura via PowerShell sem erros de escape em CMD
    const base64Html = btoa(unescape(encodeURIComponent(rawHtml)));
    const base64Txt = btoa(unescape(encodeURIComponent(plainText)));

    const batContent = `@echo off
chcp 65001 >nul
title Instalador de Assinatura - Colégio Católica Machado de Assis
cls
echo ============================================================
echo   INSTALADOR DE ASSINATURA - COLÉGIO CATÓLICA MACHADO DE ASSIS
echo ============================================================
echo.
echo [1/3] Preparando pasta de assinaturas do Outlook...
set "SIG_DIR=%APPDATA%\\Microsoft\\Signatures"
if not exist "%SIG_DIR%" mkdir "%SIG_DIR%"

echo [2/3] Gravando arquivos da assinatura...
powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.IO.File]::WriteAllText('%SIG_DIR%\\Machado de Assis.htm', [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${base64Html}')), [System.Text.Encoding]::UTF8)"
powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.IO.File]::WriteAllText('%SIG_DIR%\\Machado de Assis.txt', [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${base64Txt}')), [System.Text.Encoding]::UTF8)"

echo [3/3] Configurando assinatura padrao no Outlook...
reg add "HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings" /v "NewSignature" /t REG_SZ /d "Machado de Assis" /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings" /v "ReplySignature" /t REG_SZ /d "Machado de Assis" /f >nul 2>&1

echo.
echo ============================================================
echo   SUCESSO! Assinatura 'Machado de Assis' instalada!
echo ============================================================
echo.
echo Abra ou reinicie o aplicativo Outlook Desktop para utilizar.
echo.
pause
`;

    const blob = new Blob([batContent], { type: 'application/bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Instalar_Assinatura_Outlook.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Instalador (.bat) baixado! Execute-o para configurar seu Outlook.');
  }

  function clearForm() {
    inputNome.value = '';
    inputCargo.value = '';
    inputSetor.value = '';
    inputEmail.value = '';
    inputTelefone.value = '';
    renderSignature();
    showToast('Formulário limpo.');
    inputNome.focus();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 3500);
  }

  // Modal de Ajuda
  function openHelpModal(tabId = 'tab-desktop') {
    switchTab(tabId);
    helpModal.classList.add('active');
    helpModal.setAttribute('aria-hidden', 'false');
  }

  function closeHelpModal() {
    helpModal.classList.remove('active');
    helpModal.setAttribute('aria-hidden', 'true');
  }

  function switchTab(tabId) {
    tabItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
  }

  function setupEvents() {
    const inputs = [inputNome, inputCargo, inputSetor, inputEmail, inputTelefone];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', renderSignature);
      }
    });

    btnClearData.addEventListener('click', clearForm);
    btnCopySignature.addEventListener('click', copySignatureToClipboard);
    btnInstallDesktop.addEventListener('click', generateDesktopInstaller);

    btnHelp.addEventListener('click', () => openHelpModal('tab-desktop'));
    btnCloseModal.addEventListener('click', closeHelpModal);
    btnModalClose.addEventListener('click', closeHelpModal);

    helpModal.addEventListener('click', e => {
      if (e.target === helpModal) closeHelpModal();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && helpModal.classList.contains('active')) {
        closeHelpModal();
      }
    });

    tabItems.forEach(item => {
      item.addEventListener('click', () => {
        switchTab(item.getAttribute('data-tab'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    renderSignature(); // Renderiza estado inicial limpo
  });

})();
