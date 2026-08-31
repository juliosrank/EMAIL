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

  const signatureCanvas = document.getElementById('signature-canvas');
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

  // Pré-carregamento dos assets de imagem
  const assets = {
    logo: new Image(),
    phone: new Image(),
    site: new Image(),
    grad: new Image(),
    loaded: false
  };

  assets.logo.src = 'logomarca/atrio.png';
  assets.phone.src = 'logomarca/telefone.png';
  assets.site.src = 'logomarca/site.png';
  assets.grad.src = 'logomarca/gradiente.png';

  // Carregamento das fontes personalizadas Funkis
  const fontRegular = new FontFace('Funkis', "url('logomarca/FunkisA.1.2.3TRIAL-Regular-BF65138f81db20d.otf')", { weight: '400' });
  const fontBold = new FontFace('Funkis', "url('logomarca/FunkisA.1.2.3TRIAL-Bold-BF65138f80ccb5c.otf')", { weight: '700' });

  const preloadPromise = Promise.all([
    fontRegular.load().then(f => document.fonts.add(f)).catch(e => console.warn('Erro ao carregar Funkis Regular:', e)),
    fontBold.load().then(f => document.fonts.add(f)).catch(e => console.warn('Erro ao carregar Funkis Bold:', e)),
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(resolve => { assets.logo.onload = assets.logo.onerror = resolve; }),
    new Promise(resolve => { assets.phone.onload = assets.phone.onerror = resolve; }),
    new Promise(resolve => { assets.site.onload = assets.site.onerror = resolve; }),
    new Promise(resolve => { assets.grad.onload = assets.grad.onerror = resolve; })
  ]).then(() => {
    assets.loaded = true;
    renderSignature();
  });

  function getFormData() {
    return {
      nome: inputNome ? inputNome.value.trim() : '',
      cargo: inputCargo ? inputCargo.value.trim() : '',
      telefone: inputTelefone ? inputTelefone.value.trim() : ''
    };
  }

  /**
   * Renderiza a assinatura no Canvas em 2x (Retina / Alta Resolução) com fontes Funkis personalizadas
   */
  function renderSignature() {
    if (!signatureCanvas) return;
    const ctx = signatureCanvas.getContext('2d');
    const data = getFormData();

    const nomeText = data.nome ? data.nome.trim().toUpperCase() : 'NOME SOBRENOME';
    const cargoText = data.cargo ? data.cargo.trim() : 'Cargo';
    const telText = data.telefone ? data.telefone.trim() : '(00) 0000-0000';

    // Medição de largura com a nova fonte Funkis para auto-expansão dinâmica
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.font = "700 34px 'Funkis', Montserrat, Arial, sans-serif";
    const nomeWidth = tempCtx.measureText(nomeText).width;

    tempCtx.font = "400 24px 'Funkis', Montserrat, Arial, sans-serif";
    const cargoWidth = tempCtx.measureText(cargoText).width;

    tempCtx.font = "400 22px 'Funkis', Montserrat, Arial, sans-serif";
    const telWidth = tempCtx.measureText(telText).width + 50;
    const siteWidth = tempCtx.measureText('atriohoteis.com.br').width + 50;

    const maxContentRight = Math.max(nomeWidth, cargoWidth, telWidth, siteWidth);

    // Largura dinâmica
    const rightPadding = 35;
    const minW = 920;
    const W = Math.max(minW, 415 + Math.round(maxContentRight) + rightPadding);
    const H = 270;

    signatureCanvas.width = W;
    signatureCanvas.height = H;
    signatureCanvas.style.width = (W / 2) + 'px';
    signatureCanvas.style.height = (H / 2) + 'px';

    // 1. Fundo 100% Transparente
    ctx.clearRect(0, 0, W, H);

    // 2. Logomarca Atrio (Coluna Esquerda)
    if (assets.logo.complete && assets.logo.naturalWidth > 0) {
      const logoW = 330;
      const logoH = Math.round(logoW * (assets.logo.naturalHeight / assets.logo.naturalWidth));
      const logoX = 25;
      const logoY = Math.round((250 - logoH) / 2);
      ctx.drawImage(assets.logo, logoX, logoY, logoW, logoH);
    }

    // 3. Divisor Vertical Dourado
    ctx.fillStyle = '#DB9B0E';
    ctx.fillRect(380, 22, 4, 206);

    // 4. Nome Completo (Funkis Bold, Caixa Alta)
    ctx.fillStyle = data.nome ? '#000000' : '#94a3b8';
    ctx.font = "700 34px 'Funkis', Montserrat, Arial, sans-serif";
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(nomeText, 415, 58);

    // 5. Cargo (Funkis Regular, Dourado)
    ctx.fillStyle = data.cargo ? '#DB9B0E' : '#94a3b8';
    ctx.font = "400 24px 'Funkis', Montserrat, Arial, sans-serif";
    ctx.fillText(cargoText, 415, 94);

    // 6. Telefone (Ícone + Funkis Regular - com espaçamento maior após o cargo)
    if (assets.phone.complete && assets.phone.naturalWidth > 0) {
      ctx.drawImage(assets.phone, 415, 134, 32, 32);
    }
    ctx.fillStyle = data.telefone ? '#000000' : '#94a3b8';
    ctx.font = "400 22px 'Funkis', Montserrat, Arial, sans-serif";
    ctx.fillText(telText, 458, 158);

    // 7. Website (Ícone + Funkis Regular)
    if (assets.site.complete && assets.site.naturalWidth > 0) {
      ctx.drawImage(assets.site, 415, 178, 32, 32);
    }
    ctx.fillStyle = '#000000';
    ctx.font = "400 22px 'Funkis', Montserrat, Arial, sans-serif";
    ctx.fillText('atriohoteis.com.br', 458, 202);

    // 8. Barra Gradiente Oficial (Imagem oficial recortada nas proporções exatas da marca)
    if (assets.grad.complete && assets.grad.naturalWidth > 0) {
      ctx.drawImage(assets.grad, 0, 250, W, 20);
    } else {
      ctx.fillStyle = '#DB9B0E';
      ctx.fillRect(0, 250, W, 20);
    }
  }

  /**
   * Copia a imagem PNG transparente diretamente para a Área de Transferência
   */
  async function copySignatureToClipboard() {
    if (!signatureCanvas) return;

    btnCopySignature.classList.add('copied');
    btnCopyText.textContent = 'Copiando...';

    try {
      const dataUrl = signatureCanvas.toDataURL('image/png');
      const displayW = Math.round(signatureCanvas.width / 2);
      const displayH = Math.round(signatureCanvas.height / 2);
      const htmlContent = `<img src="${dataUrl}" alt="Atrio Hotel Management" width="${displayW}" height="${displayH}" style="display:block; width:${displayW}px; height:${displayH}px; border:0; outline:none;" border="0">`;

      let copied = false;

      // Método 1: Clipboard API com Promise síncrona para preservar permissão de gesto do usuário
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const blobPromise = new Promise((resolve, reject) => {
            signatureCanvas.toBlob(blob => {
              if (blob) resolve(blob);
              else reject(new Error('Canvas toBlob failed'));
            }, 'image/png');
          });

          const htmlBlob = new Blob([htmlContent], { type: 'text/html' });

          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blobPromise,
              'text/html': htmlBlob
            })
          ]);
          copied = true;
        } catch (err1) {
          console.warn('Falha no método combinado, tentando somente image/png:', err1);
          try {
            const blobPromise2 = new Promise((resolve, reject) => {
              signatureCanvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject(new Error('Canvas toBlob failed'));
              }, 'image/png');
            });
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blobPromise2
              })
            ]);
            copied = true;
          } catch (err2) {
            console.warn('ClipboardItem falhou:', err2);
          }
        }
      }

      // Método 2: Fallback via elemento contenteditable e execCommand('copy')
      if (!copied) {
        const container = document.createElement('div');
        container.contentEditable = 'true';
        container.innerHTML = htmlContent;
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        document.body.appendChild(container);

        const range = document.createRange();
        range.selectNodeContents(container);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        copied = document.execCommand('copy');
        document.body.removeChild(container);
        sel.removeAllRanges();
      }

      if (copied) {
        btnCopySignature.classList.add('copied');
        btnCopyText.textContent = 'Assinatura Copiada!';
        showToast('Assinatura copiada para a área de transferência! Cole (Ctrl+V) no Outlook.');

        setTimeout(() => {
          btnCopySignature.classList.remove('copied');
          btnCopyText.textContent = 'Copiar Assinatura';
        }, 2500);
      } else {
        btnCopySignature.classList.remove('copied');
        btnCopyText.textContent = 'Copiar Assinatura';
        showToast('Não foi possível copiar diretamente. Clique em "Baixar Imagem (.png)".');
      }

    } catch (e) {
      console.error('Erro ao copiar:', e);
      btnCopySignature.classList.remove('copied');
      btnCopyText.textContent = 'Copiar Assinatura';
      showToast('Erro ao copiar. Use o botão "Baixar Imagem (.png)".');
    }
  }

  /**
   * Baixa a imagem gerada em PNG
   */
  function downloadSignatureImage() {
    if (!signatureCanvas) return;
    const dataUrl = signatureCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'Assinatura_Atrio.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Imagem da assinatura baixada (.png)!');
  }

  /**
   * Gera o instalador .bat para Outlook Desktop
   */
  async function generateDesktopInstaller() {
    if (!signatureCanvas) return;
    const data = getFormData();
    const dataUrl = signatureCanvas.toDataURL('image/png');
    const sigBase64 = dataUrl.split(',')[1];

    const nomeText = data.nome ? data.nome.trim().toUpperCase() : 'NOME SOBRENOME';
    const cargoText = data.cargo ? data.cargo.trim() : 'Cargo';
    const telefoneText = data.telefone ? data.telefone.trim() : '';

    const displayW = Math.round(signatureCanvas.width / 2);
    const displayH = Math.round(signatureCanvas.height / 2);

    const rawHtml = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD><TITLE>Atrio Hotel Management</TITLE>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
</HEAD>
<BODY style="margin:0; padding:0; background:transparent;">
<a href="https://atriohoteis.com.br" target="_blank" style="text-decoration:none; display:inline-block; border:0;"><img src="Atrio Hotel Management_arquivos/signature.png" alt="Atrio Hotel Management" width="${displayW}" height="${displayH}" style="display:block; width:${displayW}px; height:${displayH}px; border:0; outline:none;" border="0"></a>
</BODY></HTML>`;

    const plainText = `${nomeText}
${cargoText}
${telefoneText}
atriohoteis.com.br`;

    const rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1046{\\fonttbl{\\f0\\fnil\\fcharset0 Funkis;}{\\f1\\fnil\\fcharset0 Montserrat;}{\\f2\\fnil\\fcharset0 Arial;}}
{\\colortbl ;\\red219\\green155\\blue14;\\red0\\green0\\blue0;}
{\\*\\generator AtrioSignatureGenerator;}
\\viewkind4\\uc1 
\\pard\\sa60\\sl240\\slmult1\\b\\f0\\fs22\\cf2 ${nomeText}\\b0\\par
\\f0\\fs18\\cf1 ${cargoText}\\par
\\fs16\\cf2 ${telefoneText}\\par
\\fs16\\cf2 atriohoteis.com.br\\par
}`;

    const base64Html = btoa(unescape(encodeURIComponent(rawHtml)));
    const base64Txt = btoa(unescape(encodeURIComponent(plainText)));
    const base64Rtf = btoa(unescape(encodeURIComponent(rtfContent)));

    const ps1Content = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = 'Stop'
$sigName = 'Atrio Hotel Management'
$erros = @()
$instalados = @()

$sigB64 = '${sigBase64}'
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

        $filesDir1 = Join-Path $sigDir ($sigName + '_arquivos')
        $filesDir2 = Join-Path $sigDir ($sigName + '_files')
        if (-not (Test-Path $filesDir1)) { New-Item -Path $filesDir1 -ItemType Directory -Force | Out-Null }
        if (-not (Test-Path $filesDir2)) { New-Item -Path $filesDir2 -ItemType Directory -Force | Out-Null }

        if ($sigB64) {
            $sigBytes = [System.Convert]::FromBase64String($sigB64)
            [System.IO.File]::WriteAllBytes((Join-Path $filesDir1 'signature.png'), $sigBytes)
            [System.IO.File]::WriteAllBytes((Join-Path $filesDir2 'signature.png'), $sigBytes)
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
    preloadPromise.then(renderSignature);
    renderSignature();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
