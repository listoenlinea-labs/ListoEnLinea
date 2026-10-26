(() => {
  'use strict';

  const QR_LIBRARY_URL = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
  const QR_PREFIX = 'MJVISITA:1:';
  let qrBlob = null;
  let qrCode = '';
  let qrFileName = '';
  let lastAutoDownloadedCode = '';
  let libraryPromise = null;

  const $ = id => document.getElementById(id);

  function showMessage(message) {
    if (typeof window.toast === 'function') {
      window.toast(message);
      return;
    }
    console.info(message);
  }

  function loadQrLibrary() {
    if (window.QRCode) return Promise.resolve(window.QRCode);
    if (libraryPromise) return libraryPromise;

    libraryPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-mj-qr-library]');
      if (existing) {
        existing.addEventListener('load', () => resolve(window.QRCode), { once: true });
        existing.addEventListener('error', () => reject(new Error('No fue posible cargar el generador QR')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = QR_LIBRARY_URL;
      script.async = true;
      script.dataset.mjQrLibrary = 'true';
      script.onload = () => window.QRCode ? resolve(window.QRCode) : reject(new Error('El generador QR no quedó disponible'));
      script.onerror = () => reject(new Error('No fue posible cargar el generador QR'));
      document.head.appendChild(script);
    });

    return libraryPromise;
  }

  function injectStyles() {
    if ($('mjVisitQrStyles')) return;
    const style = document.createElement('style');
    style.id = 'mjVisitQrStyles';
    style.textContent = `
      .page-visitas-v2 .visit-qr-card{margin-top:18px;padding:18px;border:1px solid #e6eaf1;border-radius:16px;background:#fff;text-align:center}
      .page-visitas-v2 .visit-qr-title{margin:0 0 5px;color:#202940;font-size:13px;font-weight:900}
      .page-visitas-v2 .visit-qr-help{margin:0 0 14px;color:#758197;font-size:10px;line-height:1.5}
      .page-visitas-v2 .visit-qr-box{display:grid;place-items:center;width:min(280px,100%);min-height:280px;margin:0 auto;padding:10px;border:1px solid #e4e8ef;border-radius:15px;background:#fff;box-shadow:0 10px 28px rgba(32,41,64,.06)}
      .page-visitas-v2 .visit-qr-box canvas,.page-visitas-v2 .visit-qr-box img{display:block!important;width:min(260px,100%)!important;height:auto!important;max-width:260px!important}
      .page-visitas-v2 .visit-qr-status{margin:12px 0 0;color:#8a94a7;font-size:9px;line-height:1.45}
      .page-visitas-v2 .visit-qr-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-top:14px}
      @media(max-width:720px){
        .page-visitas-v2 .visit-qr-card{padding:14px}
        .page-visitas-v2 .visit-qr-box{min-height:250px}
        .page-visitas-v2 #codeModal .modal-foot{flex-wrap:wrap}
        .page-visitas-v2 #codeModal .modal-foot .btn{flex:1 1 130px}
      }
    `;
    document.head.appendChild(style);
  }

  function ensureUi() {
    const modal = $('codeModal');
    const accessCode = modal?.querySelector('.access-code');
    const footer = modal?.querySelector('.modal-foot');
    if (!modal || !accessCode || !footer) return false;

    if (!$('visitQrCard')) {
      const card = document.createElement('div');
      card.id = 'visitQrCard';
      card.className = 'visit-qr-card';
      card.innerHTML = `
        <p class="visit-qr-title">Código QR de acceso</p>
        <p class="visit-qr-help">El visitante podrá presentar este QR en la entrada. El código contiene únicamente el identificador de la autorización, sin datos personales.</p>
        <div class="visit-qr-box" id="visitQrBox" aria-live="polite"></div>
        <p class="visit-qr-status" id="visitQrStatus">Generando QR…</p>
      `;
      accessCode.after(card);
    }

    const copyButton = $('copyInvitation');
    if (copyButton) {
      copyButton.textContent = 'Copiar texto';
      copyButton.classList.remove('btn-primary');
    }

    if (!$('downloadVisitQr')) {
      const download = document.createElement('button');
      download.type = 'button';
      download.id = 'downloadVisitQr';
      download.className = 'btn';
      download.textContent = 'Descargar QR';
      download.addEventListener('click', () => downloadQr(false));
      footer.insertBefore(download, copyButton || null);
    }

    if (!$('shareVisitQr')) {
      const share = document.createElement('button');
      share.type = 'button';
      share.id = 'shareVisitQr';
      share.className = 'btn btn-primary';
      share.textContent = 'Compartir';
      share.addEventListener('click', shareQr);
      footer.appendChild(share);
    }

    return true;
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(',');
    const mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/png';
    const binary = atob(parts[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  async function qrElementToBlob(container) {
    const canvas = container.querySelector('canvas');
    if (canvas) {
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('No fue posible crear la imagen QR')), 'image/png');
      });
    }

    const image = container.querySelector('img');
    if (image?.src?.startsWith('data:')) return dataUrlToBlob(image.src);
    throw new Error('No fue posible crear la imagen QR');
  }

  function safeFileName(code) {
    return `MisionJardines_Visita_${String(code).replace(/[^a-z0-9_-]/gi, '_')}.png`;
  }

  async function renderQr(code) {
    if (!code || code === '—' || !ensureUi()) return;
    if (qrCode === code && qrBlob) return;

    qrCode = code;
    qrBlob = null;
    qrFileName = safeFileName(code);
    const box = $('visitQrBox');
    const status = $('visitQrStatus');
    box.innerHTML = '';
    status.textContent = 'Generando QR…';

    try {
      const QRCodeClass = await loadQrLibrary();
      new QRCodeClass(box, {
        text: `${QR_PREFIX}${code}`,
        width: 260,
        height: 260,
        colorDark: '#172033',
        colorLight: '#ffffff',
        correctLevel: QRCodeClass.CorrectLevel.M
      });

      await new Promise(resolve => setTimeout(resolve, 60));
      const visual = box.querySelector('canvas,img');
      if (visual) {
        visual.setAttribute('role', 'img');
        visual.setAttribute('aria-label', `Código QR de acceso ${code}`);
      }
      qrBlob = await qrElementToBlob(box);
      status.textContent = `QR listo · Código ${code}`;

      if (lastAutoDownloadedCode !== code) {
        lastAutoDownloadedCode = code;
        downloadQr(true);
      }
    } catch (error) {
      status.textContent = 'No fue posible generar el QR automáticamente.';
      showMessage(error.message || 'No fue posible generar el QR');
    }
  }

  function downloadQr(automatic = false) {
    if (!qrBlob || !qrCode) {
      if (!automatic) showMessage('El QR todavía se está generando.');
      return;
    }
    const url = URL.createObjectURL(qrBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = qrFileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    if (!automatic) showMessage('QR descargado.');
  }

  function shareText() {
    const code = $('generatedCode')?.textContent?.trim() || qrCode;
    const summary = $('generatedSummary')?.textContent?.trim() || '';
    return `Misión Jardines\nVisita autorizada\nCódigo: ${code}${summary ? `\n${summary}` : ''}\nPresenta el código QR en la entrada.`;
  }

  async function shareQr() {
    if (!qrBlob || !qrCode) {
      showMessage('El QR todavía se está generando.');
      return;
    }

    const text = shareText();
    const file = new File([qrBlob], qrFileName, { type: 'image/png' });

    try {
      if (navigator.share) {
        const data = { title: 'Acceso a Misión Jardines', text };
        if (!navigator.canShare || navigator.canShare({ files: [file] })) data.files = [file];
        await navigator.share(data);
        return;
      }

      if (navigator.clipboard) await navigator.clipboard.writeText(text);
      downloadQr(false);
      showMessage('Tu navegador no ofrece el menú de compartir. Se copió la invitación y se descargó el QR.');
    } catch (error) {
      if (error?.name === 'AbortError') return;
      try {
        if (navigator.clipboard) await navigator.clipboard.writeText(text);
      } catch (_) {}
      showMessage('No fue posible abrir el menú de compartir. El QR sigue disponible para descargar.');
    }
  }

  function syncFromModal() {
    const code = $('generatedCode')?.textContent?.trim();
    if (code && code !== '—') renderQr(code);
  }

  function init() {
    if (location.pathname.split('/').pop() !== 'visitas.html') return;
    injectStyles();
    if (!ensureUi()) return;

    loadQrLibrary().catch(() => {});

    const modal = $('codeModal');
    const code = $('generatedCode');
    const observer = new MutationObserver(syncFromModal);
    observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    if (code) observer.observe(code, { childList: true, characterData: true, subtree: true });
    syncFromModal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
