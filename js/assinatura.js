/**
 * Gerador de Assinaturas de E-mail
 * Atrio Hotel Management
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
   * Constrói o HTML oficial da assinatura Atrio Hotel Management
   */
  function buildSignatureHTML(data) {
    const nome = escapeHtml(data.nome) || '<span style="color:#94a3b8">NOME COMPLETO</span>';
    
    // Cargo e Setor
    let cargoSetor = '';
    if (data.cargo && data.setor) {
      cargoSetor = `${escapeHtml(data.cargo)} • ${escapeHtml(data.setor)}`;
    } else if (data.cargo) {
      cargoSetor = escapeHtml(data.cargo);
    } else if (data.setor) {
      cargoSetor = escapeHtml(data.setor);
    } else {
      cargoSetor = '<span style="color:#94a3b8">CARGO / SETOR</span>';
    }

    const email = escapeHtml(data.email) || '<span style="color:#94a3b8">nome.sobrenome@atriohoteis.com.br</span>';
    const emailLink = data.email 
      ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#475569; text-decoration:none;">${escapeHtml(data.email)}</a>` 
      : email;

    const telefoneHTML = data.telefone
      ? `<p style="margin:2px 0px 0px 0px; font-family:'Inter', Arial, sans-serif; font-size:11px; color:#475569; line-height:16px;">${escapeHtml(data.telefone)}</p>`
      : '';

    return `
<div id="x_Signature">
  <table style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; text-align: start; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: auto;" cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <!-- Coluna da Logomarca -->
        <td valign="middle" align="center" style="padding: 10px 24px 10px 0px; border-right: 1.5px solid #cbd5e1; width: 190px;">
          <a href="https://atriohoteis.com.br" target="_blank" style="text-decoration:none; display:block;">
            <img data-imagetype="External" src="logomarca/atrio.png" alt="Atrio Hotel Management" width="180" style="display:block; outline:none; border:none; width:180px; max-width:180px; height:auto;">
          </a>
        </td>

        <!-- Coluna de Dados -->
        <td valign="middle" align="left" style="padding: 8px 0px 8px 24px;">
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="padding: 0px 0px 2px 0px;">
                  <h1 style="margin:0px; font-family:'Inter', Arial, sans-serif; font-size:18px; font-weight:700; color:#1e2229; letter-spacing:1.5px; text-transform:uppercase; line-height:22px;">${nome}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 0px 0px 12px 0px;">
                  <p style="margin:0px; font-family:'Inter', Arial, sans-serif; font-size:12px; font-weight:600; color:#DB9B0E; letter-spacing:1.5px; text-transform:uppercase; line-height:16px;">${cargoSetor}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 0px 0px 8px 0px;">
                  <p style="margin:0px; font-family:'Inter', Arial, sans-serif; font-size:11px; color:#475569; line-height:16px;">Microsoft Teams:<br>${emailLink}</p>
                  ${telefoneHTML}
                </td>
              </tr>
              <tr>
                <td style="padding: 4px 0px 0px 0px;">
                  <p style="margin:0px; font-family:'Inter', Arial, sans-serif; font-size:12px; font-weight:700; color:#DB9B0E; letter-spacing:3.5px; text-transform:uppercase; line-height:16px;"><a href="https://atriohoteis.com.br" target="_blank" style="color:#DB9B0E; text-decoration:none;">ATRIOHOTEIS.COM.BR</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
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
    
    const rawHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body style="margin:0; padding:0;">
${buildSignatureHTML(data)}
</body>
</html>`;

    const plainText = `${data.nome || 'NOME COMPLETO'}
${data.cargo || ''} - ${data.setor || ''}
Microsoft Teams: ${data.email || ''}
${data.telefone || ''}
ATRIOHOTEIS.COM.BR`;

    const base64Html = btoa(unescape(encodeURIComponent(rawHtml)));
    const base64Txt = btoa(unescape(encodeURIComponent(plainText)));

    const batContent = `@echo off
chcp 65001 >nul
title Instalador de Assinatura - Atrio Hotel Management
cls
echo ============================================================
echo   INSTALADOR DE ASSINATURA - ATRIO HOTEL MANAGEMENT
echo ============================================================
echo.
echo [1/3] Preparando pasta de assinaturas do Outlook...
set "SIG_DIR=%APPDATA%\\Microsoft\\Signatures"
if not exist "%SIG_DIR%" mkdir "%SIG_DIR%"

echo [2/3] Gravando arquivos da assinatura...
powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.IO.File]::WriteAllText('%SIG_DIR%\\Atrio Hotel Management.htm', [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${base64Html}')), [System.Text.Encoding]::UTF8)"
powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.IO.File]::WriteAllText('%SIG_DIR%\\Atrio Hotel Management.txt', [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${base64Txt}')), [System.Text.Encoding]::UTF8)"

echo [3/3] Configurando assinatura padrao no Outlook...
reg add "HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings" /v "NewSignature" /t REG_SZ /d "Atrio Hotel Management" /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings" /v "ReplySignature" /t REG_SZ /d "Atrio Hotel Management" /f >nul 2>&1

echo.
echo ============================================================
echo   SUCESSO! Assinatura 'Atrio Hotel Management' instalada!
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
    renderSignature();
  });

})();
