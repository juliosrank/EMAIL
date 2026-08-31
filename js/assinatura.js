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
  const inputTelefone = document.getElementById('telefone');

  const signatureOutput = document.getElementById('signature-output');
  const btnCopySignature = document.getElementById('btn-copy-signature');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnDownloadImage = document.getElementById('btn-download-image');
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

  function getFormData() {
    return {
      nome: inputNome ? inputNome.value.trim() : '',
      cargo: inputCargo ? inputCargo.value.trim() : '',
      telefone: inputTelefone ? inputTelefone.value.trim() : ''
    };
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
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Constrói o HTML nativo da assinatura compatível com Web, Desktop, Light Mode e Dark Mode
   */
  function buildSignatureHTML(data) {
    const nomeText = data.nome ? data.nome.trim().toUpperCase() : '';
    const nome = nomeText ? escapeHtml(nomeText) : '<span style="color:#94a3b8">NOME SOBRENOME</span>';
    const cargo = data.cargo ? escapeHtml(data.cargo.trim()) : '<span style="color:#94a3b8">Cargo</span>';

    const logoSrc = 'https://raw.githubusercontent.com/juliosrank/EMAIL/main/logomarca/atrio.png';
    const phoneSrc = 'https://raw.githubusercontent.com/juliosrank/EMAIL/main/logomarca/telefone.png';
    const siteSrc = 'https://raw.githubusercontent.com/juliosrank/EMAIL/main/logomarca/site.png';
    const gradSrc = 'https://raw.githubusercontent.com/juliosrank/EMAIL/main/logomarca/gradiente.png';

    const telFormatted = data.telefone ? escapeHtml(data.telefone.trim()) : '<span style="color:#94a3b8">(00) 0000-0000</span>';
    const telDigits = data.telefone ? data.telefone.replace(/\D/g, '') : '0000000000';
    const telColor = data.telefone ? '#000000' : '#94a3b8';

    return `
<div id="x_Signature">
  <table cellpadding="0" cellspacing="0" border="0" style="font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:12px; line-height:normal; border-collapse:collapse; border-spacing:0px; width:auto;">
    <tbody>
      <tr>
        <!-- Coluna da Logomarca -->
        <td valign="middle" align="center" style="padding:10px 24px 10px 0px; border-right:2px solid #DB9B0E; width:180px; mso-line-height-rule:exactly;">
          <a href="https://atriohoteis.com.br" target="_blank" style="text-decoration:none; display:block; border:0; outline:none;">
            <img src="${logoSrc}" alt="Atrio Hotel Management" width="180" height="35" border="0" style="display:block; width:180px; height:auto; max-width:180px; border:0; outline:none;">
          </a>
        </td>

        <!-- Coluna de Dados -->
        <td valign="middle" align="left" style="padding:4px 0px 4px 24px; font-family:'Montserrat',Arial,Helvetica,sans-serif; mso-line-height-rule:exactly;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tbody>
              <!-- Nome Completo -->
              <tr>
                <td style="padding:0px 0px 3px 0px; font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:#000000; letter-spacing:1px; line-height:20px; mso-line-height-rule:exactly;">
                  <span style="font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:17px; font-weight:bold; color:#000000; letter-spacing:1px; text-transform:uppercase;">${nome}</span>
                </td>
              </tr>
              <!-- Cargo -->
              <tr>
                <td style="padding:0px 0px 10px 0px; font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:13px; font-weight:500; color:#DB9B0E; line-height:16px; mso-line-height-rule:exactly;">
                  <span style="font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:13px; font-weight:500; color:#DB9B0E;">${cargo}</span>
                </td>
              </tr>
              <!-- Telefone -->
              <tr>
                <td style="padding:0px 0px 4px 0px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    <tbody>
                      <tr>
                        <td valign="middle" width="16" height="16" style="width:16px; height:16px; font-size:0px; line-height:0px; mso-line-height-rule:exactly; padding:0px 8px 0px 0px;">
                          <img src="${phoneSrc}" alt="" width="16" height="16" border="0" style="display:block; width:16px; height:16px; border:0; outline:none;">
                        </td>
                        <td valign="middle" style="padding:0px; font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:12px; font-weight:500; line-height:16px; white-space:nowrap; mso-line-height-rule:exactly;">
                          <a href="tel:${telDigits}" style="font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:12px; font-weight:500; color:${telColor}; text-decoration:none; line-height:16px;"><span style="color:${telColor}; text-decoration:none;">${telFormatted}</span></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <!-- Website -->
              <tr>
                <td style="padding:0px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    <tbody>
                      <tr>
                        <td valign="middle" width="16" height="16" style="width:16px; height:16px; font-size:0px; line-height:0px; mso-line-height-rule:exactly; padding:0px 8px 0px 0px;">
                          <img src="${siteSrc}" alt="" width="16" height="16" border="0" style="display:block; width:16px; height:16px; border:0; outline:none;">
                        </td>
                        <td valign="middle" style="padding:0px; font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:12px; font-weight:500; line-height:16px; white-space:nowrap; mso-line-height-rule:exactly;">
                          <a href="https://atriohoteis.com.br" target="_blank" style="font-family:'Montserrat',Arial,Helvetica,sans-serif; font-size:12px; font-weight:500; color:#000000; text-decoration:none; line-height:16px;"><span style="color:#000000; text-decoration:none;">atriohoteis.com.br</span></a>
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

      <!-- Barra Gradiente Inferior -->
      <tr>
        <td colspan="2" style="padding:12px 0px 0px 0px; font-size:0px; line-height:0px; mso-line-height-rule:exactly;">
          <table cellpadding="0" cellspacing="0" width="100%" border="0" style="width:100%; border-collapse:collapse;">
            <tbody>
              <tr>
                <td height="10" style="height:10px; font-size:0px; line-height:0px; background-color:#DB9B0E; mso-line-height-rule:exactly;">
                  <img src="${gradSrc}" alt="" width="100%" height="10" border="0" style="display:block; width:100%; height:10px; max-height:10px; border:0; outline:none;">
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`.trim();
  }

  /**
   * Atualiza a pré-visualização em tempo real na tela
   */
  function renderSignature() {
    if (!signatureOutput) return;
    const data = getFormData();
    signatureOutput.innerHTML = buildSignatureHTML(data);
  }

  /**
   * Copia a assinatura nativa em HTML (que se adapta a Dark Mode e Light Mode)
   */
  async function copySignatureToClipboard() {
    const data = getFormData();
    const html = buildSignatureHTML(data);
    const plainText = `${data.nome ? data.nome.toUpperCase() : 'NOME SOBRENOME'}\n${data.cargo || 'Cargo'}\n${data.telefone || ''}\natriohoteis.com.br`;

    let success = false;

    if (navigator.clipboard && window.ClipboardItem) {
      try {
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
          })
        ]);
        success = true;
      } catch (err) {
        console.warn('Clipboard API error, tentando execCommand fallback:', err);
      }
    }

    if (!success) {
      const container = document.createElement('div');
      container.innerHTML = html;
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      const range = document.createRange();
      range.selectNodeContents(container);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      success = document.execCommand('copy');
      document.body.removeChild(container);
      sel.removeAllRanges();
    }

    if (success) {
      btnCopySignature.classList.add('copied');
      btnCopyText.textContent = 'Assinatura Copiada!';
      showToast('Assinatura copiada! Cole (Ctrl+V) nas configurações do Outlook Web.');

      setTimeout(() => {
        btnCopySignature.classList.remove('copied');
        btnCopyText.textContent = 'Copiar Assinatura';
      }, 2500);
    } else {
      showToast('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
    }
  }

  /**
   * Gera e baixa a assinatura em PNG de alta resolução
   */
  function downloadSignatureImage() {
    const data = getFormData();
    const nomeText = data.nome ? data.nome.trim().toUpperCase() : 'NOME SOBRENOME';
    const cargoText = data.cargo ? data.cargo.trim() : 'Cargo';
    const telText = data.telefone ? data.telefone.trim() : '(00) 0000-0000';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.font = '700 34px Montserrat, Arial, sans-serif';
    const nomeWidth = tempCtx.measureText(nomeText).width;
    tempCtx.font = '500 24px Montserrat, Arial, sans-serif';
    const cargoWidth = tempCtx.measureText(cargoText).width;
    tempCtx.font = '500 22px Montserrat, Arial, sans-serif';
    const telWidth = tempCtx.measureText(telText).width + 50;

    const maxContentRight = Math.max(nomeWidth, cargoWidth, telWidth, 260);
    const W = Math.max(920, 415 + Math.round(maxContentRight) + 35);
    const H = 260;

    canvas.width = W;
    canvas.height = H;

    // Fundo Transparente
    ctx.clearRect(0, 0, W, H);

    const imgLogo = new Image();
    const imgPhone = new Image();
    const imgSite = new Image();
    imgLogo.src = 'logomarca/atrio.png';
    imgPhone.src = 'logomarca/telefone.png';
    imgSite.src = 'logomarca/site.png';

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(r => { imgLogo.onload = imgLogo.onerror = r; }),
      new Promise(r => { imgPhone.onload = imgPhone.onerror = r; }),
      new Promise(r => { imgSite.onload = imgSite.onerror = r; })
    ]).then(() => {
      // Logo
      if (imgLogo.complete && imgLogo.naturalWidth > 0) {
        const logoW = 330;
        const logoH = Math.round(logoW * (imgLogo.naturalHeight / imgLogo.naturalWidth));
        ctx.drawImage(imgLogo, 25, Math.round((240 - logoH) / 2), logoW, logoH);
      }

      // Linha Dourada
      ctx.fillStyle = '#DB9B0E';
      ctx.fillRect(380, 24, 4, 192);

      // Nome
      ctx.fillStyle = data.nome ? '#000000' : '#94a3b8';
      ctx.font = '700 34px Montserrat, Arial, sans-serif';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(nomeText, 415, 62);

      // Cargo
      ctx.fillStyle = data.cargo ? '#DB9B0E' : '#94a3b8';
      ctx.font = '500 24px Montserrat, Arial, sans-serif';
      ctx.fillText(cargoText, 415, 104);

      // Telefone
      if (imgPhone.complete && imgPhone.naturalWidth > 0) {
        ctx.drawImage(imgPhone, 415, 126, 32, 32);
      }
      ctx.fillStyle = data.telefone ? '#000000' : '#94a3b8';
      ctx.font = '500 22px Montserrat, Arial, sans-serif';
      ctx.fillText(telText, 458, 150);

      // Site
      if (imgSite.complete && imgSite.naturalWidth > 0) {
        ctx.drawImage(imgSite, 415, 172, 32, 32);
      }
      ctx.fillStyle = '#000000';
      ctx.font = '500 22px Montserrat, Arial, sans-serif';
      ctx.fillText('atriohoteis.com.br', 458, 196);

      // Gradiente Vetorial
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, '#C47F0A');
      grad.addColorStop(0.25, '#DB9B0E');
      grad.addColorStop(0.55, '#EBB426');
      grad.addColorStop(0.85, '#DB9B0E');
      grad.addColorStop(1, '#C6820B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 240, W, 20);

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'Assinatura_Atrio.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Imagem da assinatura baixada (.png)!');
    });
  }

  /**
   * Gera o instalador .bat para Outlook Desktop
   */
  async function generateDesktopInstaller() {
    const data = getFormData();
    const nomeText = data.nome ? data.nome.trim().toUpperCase() : 'NOME SOBRENOME';
    const cargoText = data.cargo ? data.cargo.trim() : 'Cargo';
    const telefoneText = data.telefone ? data.telefone.trim() : '';

    const htmlContent = buildSignatureHTML(data);
    const plainText = `${nomeText}\n${cargoText}\n${telefoneText}\natriohoteis.com.br`;

    const rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1046{\\fonttbl{\\f0\\fnil\\fcharset0 Montserrat;}{\\f1\\fnil\\fcharset0 Segoe UI;}{\\f2\\fnil\\fcharset0 Arial;}}
{\\colortbl ;\\red219\\green155\\blue14;\\red0\\green0\\blue0;}
{\\*\\generator AtrioSignatureGenerator;}
\\viewkind4\\uc1 
\\pard\\sa60\\sl240\\slmult1\\b\\f0\\fs22\\cf2 ${nomeText}\\b0\\par
\\f0\\fs18\\cf1 ${cargoText}\\par
\\fs16\\cf2 ${telefoneText}\\par
\\fs16\\cf2 atriohoteis.com.br\\par
}`;

    const base64Html = btoa(unescape(encodeURIComponent(htmlContent)));
    const base64Txt = btoa(unescape(encodeURIComponent(plainText)));
    const base64Rtf = btoa(unescape(encodeURIComponent(rtfContent)));

    const ps1Content = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = 'Stop'
$sigName = 'Atrio Hotel Management'
$erros = @()
$instalados = @()

$htmB64 = '${base64Html}'
$txtB64 = '${base64Txt}'
$rtfB64 = '${base64Rtf}'

$sigPaths = @()
$localSig = Join-Path $env:APPDATA 'Microsoft\\Signatures'
$sigPaths += $localSig

$oneDrivePaths = @($env:OneDrive, $env:OneDriveCommercial, $env:OneDriveConsumer)
foreach ($od in $oneDrivePaths) {
    if ($od -and (Test-Path $od)) {
        $odSig = Get-ChildItem -Path $od -Filter 'Signatures' -Directory -Recurse -Depth 3 -ErrorAction SilentlyContinue |
                 Where-Object { $_.FullName -match 'Microsoft' } |
                 Select-Object -First 1
        if ($odSig) {
            $sigPaths += $odSig.FullName
        }
    }
}
$sigPaths = $sigPaths | Select-Object -Unique

Write-Host ''
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  INSTALADOR DE ASSINATURA - ATRIO HOTEL MANAGEMENT' -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host ''

foreach ($sigDir in $sigPaths) {
    Write-Host "  Instalando em: $sigDir" -ForegroundColor Yellow
    try {
        if (-not (Test-Path $sigDir)) {
            New-Item -Path $sigDir -ItemType Directory -Force | Out-Null
        }

        $htmText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($htmB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.htm"), $htmText, [System.Text.Encoding]::UTF8)

        $txtText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($txtB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.txt"), $txtText, [System.Text.Encoding]::UTF8)

        $rtfText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($rtfB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.rtf"), $rtfText, [System.Text.Encoding]::UTF8)

        $instalados += $sigDir
        Write-Host "    [OK] Arquivos gravados com sucesso." -ForegroundColor Green
    } catch {
        $erros += "Erro em '$sigDir': $_"
        Write-Host "    [ERRO] $_" -ForegroundColor Red
    }
}

Write-Host ''
Write-Host '  Configurando como assinatura padrao no Outlook...' -ForegroundColor Yellow

$regPaths = @(
    'HKCU:\\Software\\Microsoft\\Office\\16.0\\Common\\MailSettings',
    'HKCU:\\Software\\Microsoft\\Office\\15.0\\Common\\MailSettings'
)
foreach ($rp in $regPaths) {
    try {
        if (-not (Test-Path $rp)) { New-Item -Path $rp -Force | Out-Null }
        Set-ItemProperty -Path $rp -Name 'NewSignature' -Value $sigName -ErrorAction SilentlyContinue
        Set-ItemProperty -Path $rp -Name 'ReplySignature' -Value $sigName -ErrorAction SilentlyContinue
    } catch { }
}

try {
    Get-ChildItem 'HKCU:\\Software\\Microsoft\\Office\\16.0\\Outlook\\Profiles' -Recurse -ErrorAction SilentlyContinue |
    ForEach-Object {
        if ($_.Property -contains 'NewSignature' -or $_.Property -contains '001f6600') {
            Set-ItemProperty -Path $_.PSPath -Name 'NewSignature' -Value $sigName -ErrorAction SilentlyContinue
            Set-ItemProperty -Path $_.PSPath -Name 'ReplySignature' -Value $sigName -ErrorAction SilentlyContinue
        }
    }
} catch { }

Write-Host "    [OK] Registro configurado." -ForegroundColor Green
Write-Host ''
if ($erros.Count -eq 0) {
    Write-Host '============================================================' -ForegroundColor Green
    Write-Host "  SUCESSO! Assinatura '$sigName' instalada!" -ForegroundColor Green
    Write-Host '============================================================' -ForegroundColor Green
    Write-Host ''
    Write-Host '  Abra ou reinicie o Outlook para utilizar.' -ForegroundColor White
} else {
    Write-Host '============================================================' -ForegroundColor Red
    Write-Host '  ATENCAO: Ocorreram erros durante a instalacao!' -ForegroundColor Red
    Write-Host '============================================================' -ForegroundColor Red
}
Write-Host ''
`.trim().replace(/\r?\n/g, '\r\n');

    const ps1Bytes = new TextEncoder().encode(ps1Content);
    let binaryStr = '';
    for (let i = 0; i < ps1Bytes.length; i++) {
      binaryStr += String.fromCharCode(ps1Bytes[i]);
    }
    const ps1Base64 = btoa(binaryStr);
    const ps1Base64Lines = [];
    for (let i = 0; i < ps1Base64.length; i += 76) {
      ps1Base64Lines.push(ps1Base64.substring(i, i + 76));
    }
    const echoLines = ps1Base64Lines.map(function(line) { return 'echo ' + line; }).join('\n');

    const batFinal = `@echo off
chcp 65001 >nul
title Instalador de Assinatura - Atrio Hotel Management
cls
echo ============================================================
echo   INSTALADOR DE ASSINATURA - ATRIO HOTEL MANAGEMENT
echo ============================================================
echo.
echo   Preparando instalacao, aguarde...
echo.

set "PS_B64=%TEMP%\\atrio_sig.b64"
set "PS_SCRIPT=%TEMP%\\atrio_sig_install.ps1"

(
echo -----BEGIN CERTIFICATE-----
${echoLines}
echo -----END CERTIFICATE-----
) > "%PS_B64%"

certutil -decode "%PS_B64%" "%PS_SCRIPT%" >nul 2>&1

if not exist "%PS_SCRIPT%" (
    echo.
    echo   [ERRO] Nao foi possivel preparar o instalador.
    echo   Tente executar como Administrador.
    echo.
    pause
    goto :fim
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

del /q "%PS_B64%" >nul 2>&1
del /q "%PS_SCRIPT%" >nul 2>&1

:fim
echo.
echo   Pressione qualquer tecla para fechar...
pause >nul
`;

    const blob = new Blob([batFinal], { type: 'application/bat' });
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
    if (inputNome) inputNome.value = '';
    if (inputCargo) inputCargo.value = '';
    if (inputTelefone) inputTelefone.value = '';
    renderSignature();
    showToast('Formulário limpo.');
    if (inputNome) inputNome.focus();
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
    const inputs = [inputNome, inputCargo, inputTelefone];
    inputs.forEach(input => {
      if (input) {
        ['input', 'change', 'keyup', 'paste'].forEach(evt => {
          input.addEventListener(evt, () => {
            requestAnimationFrame(renderSignature);
          });
        });
      }
    });

    if (btnClearData) btnClearData.addEventListener('click', clearForm);
    if (btnCopySignature) btnCopySignature.addEventListener('click', copySignatureToClipboard);
    if (btnDownloadImage) btnDownloadImage.addEventListener('click', downloadSignatureImage);
    if (btnInstallDesktop) btnInstallDesktop.addEventListener('click', generateDesktopInstaller);

    if (btnHelp) btnHelp.addEventListener('click', () => openHelpModal('tab-desktop'));
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeHelpModal);
    if (btnModalClose) btnModalClose.addEventListener('click', closeHelpModal);

    if (helpModal) {
      helpModal.addEventListener('click', e => {
        if (e.target === helpModal) closeHelpModal();
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && helpModal && helpModal.classList.contains('active')) {
        closeHelpModal();
      }
    });

    tabItems.forEach(item => {
      item.addEventListener('click', () => {
        switchTab(item.getAttribute('data-tab'));
      });
    });
  }

  function init() {
    setupEvents();
    renderSignature();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
