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
   * Constrói o HTML da assinatura para a Web e Área de Transferência
   */
  function buildSignatureHTML(data, isForDesktopFile = false) {
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

    const email = escapeHtml(data.email) || '<span style="color:#94a3b8">email@atriohoteis.com.br</span>';
    const emailLink = data.email 
      ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#475569; text-decoration:none;">${escapeHtml(data.email)}</a>` 
      : email;

    const telefoneHTML = data.telefone
      ? `<p style="margin:2px 0px 0px 0px; font-family:'Inter', Arial, sans-serif; font-size:11px; color:#475569; line-height:16px;">${escapeHtml(data.telefone)}</p>`
      : '';

    // No desktop do Outlook, a imagem fica na pasta _arquivos da assinatura
    const logoSrc = isForDesktopFile ? 'Atrio Hotel Management_arquivos/image001.png' : 'logomarca/atrio.png';

    return `
<div id="x_Signature">
  <table style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; text-align: start; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: auto;" cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <!-- Coluna da Logomarca -->
        <td valign="middle" align="center" style="padding: 10px 24px 10px 0px; border-right: 1.5px solid #cbd5e1; width: 200px;">
          <a href="https://atriohoteis.com.br" target="_blank" style="text-decoration:none; display:block;">
            <img data-imagetype="External" src="${logoSrc}" alt="Atrio Hotel Management" width="200" height="39" style="display:block; outline:none; border:none; width:200px; height:39px; max-width:200px;">
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
    signatureOutput.innerHTML = buildSignatureHTML(data, false);
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
   * Converte a imagem do logo para Base64
   */
  async function getLogoBase64() {
    try {
      const response = await fetch('logomarca/atrio.png');
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const res = reader.result;
          resolve(res.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return '';
    }
  }

  /**
   * Gera e baixa o instalador automático .bat para o Outlook Desktop com suporte completo a RTF, HTM e imagens.
   * Usa abordagem de script PowerShell temporário para evitar limite de 8191 caracteres do cmd.exe.
   * Detecta automaticamente pastas de assinatura locais e do OneDrive.
   */
  async function generateDesktopInstaller() {
    const data = getFormData();
    const logoBase64 = await getLogoBase64();

    // HTML formatado para o arquivo .htm do Outlook Desktop
    const rawHtml = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD><TITLE>Atrio Hotel Management</TITLE>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
</HEAD>
<BODY style="margin:0; padding:0;">
${buildSignatureHTML(data, true)}
</BODY></HTML>`;

    // Plain text format
    const plainText = `${data.nome || 'NOME COMPLETO'}
${data.cargo || ''} ${data.setor ? '• ' + data.setor : ''}
Microsoft Teams: ${data.email || ''}
${data.telefone || ''}
ATRIOHOTEIS.COM.BR`;

    // RTF format (necessário para o diálogo de seleção de assinaturas padrão do Outlook)
    const cargoSetorText = data.cargo && data.setor ? `${data.cargo} \\bullet  ${data.setor}` : (data.cargo || data.setor || '');
    const rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1046{\\fonttbl{\\f0\\fnil\\fcharset0 Segoe UI;}{\\f1\\fnil\\fcharset0 Arial;}}
{\\colortbl ;\\red219\\green155\\blue14;\\red30\\green34\\blue41;\\red71\\green85\\blue105;}
{\\*\\generator AtrioSignatureGenerator;}
\\viewkind4\\uc1 
\\pard\\sa100\\sl240\\slmult1\\b\\f0\\fs22\\cf2 ${data.nome || 'NOME COMPLETO'}\\b0\\par
\\b\\fs18\\cf1 ${cargoSetorText}\\b0\\par
\\fs16\\cf3 Microsoft Teams:\\par
${data.email || ''}\\par
${data.telefone || ''}\\par
\\b\\fs18\\cf1 ATRIOHOTEIS.COM.BR\\b0\\par
}`;

    const base64Html = btoa(unescape(encodeURIComponent(rawHtml)));
    const base64Txt = btoa(unescape(encodeURIComponent(plainText)));
    const base64Rtf = btoa(unescape(encodeURIComponent(rtfContent)));

    // Gera um script PowerShell completo que será escrito em arquivo temporário pelo .bat
    const ps1Content = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = 'Stop'
$sigName = 'Atrio Hotel Management'
$erros = @()
$instalados = @()

# --- Dados Base64 embutidos ---
$logoB64 = '${logoBase64}'
$htmB64 = '${base64Html}'
$txtB64 = '${base64Txt}'
$rtfB64 = '${base64Rtf}'

# --- Detectar todas as pastas de assinatura possiveis ---
$sigPaths = @()

# 1. Pasta local padrao do Outlook Desktop classico
$localSig = Join-Path $env:APPDATA 'Microsoft\Signatures'
$sigPaths += $localSig

# 2. Pasta do OneDrive (Novo Outlook / Outlook 365 com roaming signatures)
$oneDrivePaths = @($env:OneDrive, $env:OneDriveCommercial, $env:OneDriveConsumer)
foreach ($od in $oneDrivePaths) {
    if ($od -and (Test-Path $od)) {
        # Procurar pasta Signatures dentro do OneDrive
        $odSig = Get-ChildItem -Path $od -Filter 'Signatures' -Directory -Recurse -Depth 3 -ErrorAction SilentlyContinue |
                 Where-Object { $_.FullName -match 'Microsoft' } |
                 Select-Object -First 1
        if ($odSig) {
            $sigPaths += $odSig.FullName
        }
    }
}

# Remover duplicatas
$sigPaths = $sigPaths | Select-Object -Unique

Write-Host ''
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '  INSTALADOR DE ASSINATURA - ATRIO HOTEL MANAGEMENT' -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host ''

foreach ($sigDir in $sigPaths) {
    Write-Host "  Instalando em: $sigDir" -ForegroundColor Yellow
    try {
        # Criar pasta principal
        if (-not (Test-Path $sigDir)) {
            New-Item -Path $sigDir -ItemType Directory -Force | Out-Null
        }

        # Criar subpastas de arquivos (Outlook usa _arquivos e _files)
        $filesDir1 = Join-Path $sigDir ($sigName + '_arquivos')
        $filesDir2 = Join-Path $sigDir ($sigName + '_files')
        if (-not (Test-Path $filesDir1)) { New-Item -Path $filesDir1 -ItemType Directory -Force | Out-Null }
        if (-not (Test-Path $filesDir2)) { New-Item -Path $filesDir2 -ItemType Directory -Force | Out-Null }

        # Gravar logomarca
        $logoBytes = [System.Convert]::FromBase64String($logoB64)
        [System.IO.File]::WriteAllBytes((Join-Path $filesDir1 'image001.png'), $logoBytes)
        [System.IO.File]::WriteAllBytes((Join-Path $filesDir2 'image001.png'), $logoBytes)

        # Gravar HTM
        $htmText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($htmB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.htm"), $htmText, [System.Text.Encoding]::UTF8)

        # Gravar TXT
        $txtText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($txtB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.txt"), $txtText, [System.Text.Encoding]::UTF8)

        # Gravar RTF
        $rtfText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($rtfB64))
        [System.IO.File]::WriteAllText((Join-Path $sigDir "$sigName.rtf"), $rtfText, [System.Text.Encoding]::UTF8)

        $instalados += $sigDir
        Write-Host "    [OK] Arquivos gravados com sucesso." -ForegroundColor Green
    } catch {
        $erros += "Erro em '$sigDir': $_"
        Write-Host "    [ERRO] $_" -ForegroundColor Red
    }
}

# --- Configurar como assinatura padrao via registro ---
Write-Host ''
Write-Host '  Configurando como assinatura padrao no Outlook...' -ForegroundColor Yellow

$regPaths = @(
    'HKCU:\Software\Microsoft\Office\16.0\Common\MailSettings',
    'HKCU:\Software\Microsoft\Office\15.0\Common\MailSettings'
)
foreach ($rp in $regPaths) {
    try {
        if (-not (Test-Path $rp)) { New-Item -Path $rp -Force | Out-Null }
        Set-ItemProperty -Path $rp -Name 'NewSignature' -Value $sigName -ErrorAction SilentlyContinue
        Set-ItemProperty -Path $rp -Name 'ReplySignature' -Value $sigName -ErrorAction SilentlyContinue
    } catch { }
}

# Configurar nos perfis do Outlook
try {
    Get-ChildItem 'HKCU:\Software\Microsoft\Office\16.0\Outlook\Profiles' -Recurse -ErrorAction SilentlyContinue |
    ForEach-Object {
        if ($_.Property -contains 'NewSignature' -or $_.Property -contains '001f6600') {
            Set-ItemProperty -Path $_.PSPath -Name 'NewSignature' -Value $sigName -ErrorAction SilentlyContinue
            Set-ItemProperty -Path $_.PSPath -Name 'ReplySignature' -Value $sigName -ErrorAction SilentlyContinue
        }
    }
} catch { }

Write-Host "    [OK] Registro configurado." -ForegroundColor Green

# --- Resultado final ---
Write-Host ''
if ($erros.Count -eq 0) {
    Write-Host '============================================================' -ForegroundColor Green
    Write-Host "  SUCESSO! Assinatura '$sigName' instalada!" -ForegroundColor Green
    Write-Host '============================================================' -ForegroundColor Green
    Write-Host ''
    Write-Host '  Pastas instaladas:' -ForegroundColor White
    foreach ($p in $instalados) { Write-Host "    > $p" -ForegroundColor Gray }
    Write-Host ''
    Write-Host '  Abra ou reinicie o Outlook para utilizar.' -ForegroundColor White
} else {
    Write-Host '============================================================' -ForegroundColor Red
    Write-Host '  ATENCAO: Ocorreram erros durante a instalacao!' -ForegroundColor Red
    Write-Host '============================================================' -ForegroundColor Red
    foreach ($e in $erros) { Write-Host "  $e" -ForegroundColor Red }
}
Write-Host ''
`.trim().replace(/\r?\n/g, '\r\n');

    const ps1Bytes = new TextEncoder().encode(ps1Content);
    // Converter bytes para base64 de forma segura (sem spread operator que pode causar stack overflow)
    let binaryStr = '';
    for (let i = 0; i < ps1Bytes.length; i++) {
      binaryStr += String.fromCharCode(ps1Bytes[i]);
    }
    const ps1Base64 = btoa(binaryStr);
    const ps1Base64Lines = [];
    for (let i = 0; i < ps1Base64.length; i += 76) {
      ps1Base64Lines.push(ps1Base64.substring(i, i + 76));
    }

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

set "PS_B64=%TEMP%\atrio_sig.b64"
set "PS_SCRIPT=%TEMP%\atrio_sig_install.ps1"

(
echo -----BEGIN CERTIFICATE-----
${ps1Base64Lines.map(line => `echo ${line}`).join('\n')}
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
