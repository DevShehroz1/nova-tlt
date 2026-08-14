(function () {
  'use strict';

  var WA_URL    = 'https://wa.me/966503065248';
  var EMAIL     = 'info@novatlt.com';

  /* ── Curtain ── */
  var curtain = document.createElement('div');
  curtain.id = 'pg-curtain';
  curtain.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:9999',
    'background:#0a0a0a',
    'transform:translateY(100%)',
    'transition:transform 0.55s cubic-bezier(0.76,0,0.24,1)',
    'pointer-events:none'
  ].join(';');
  document.body.appendChild(curtain);

  /* ── Contact-choice modal ── */
  var ccStyles = [
    '#cc-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.72);',
    'display:flex;align-items:center;justify-content:center;',
    'opacity:0;pointer-events:none;transition:opacity 0.25s ease}',
    '#cc-overlay.is-open{opacity:1;pointer-events:all}',
    '#cc-card{position:relative;background:#111;border:1px solid rgba(202,149,61,0.25);',
    'border-radius:16px;padding:40px 36px 32px;max-width:400px;width:calc(100% - 40px);',
    'transform:translateY(12px);transition:transform 0.25s ease}',
    '#cc-overlay.is-open #cc-card{transform:translateY(0)}',
    '#cc-close{position:absolute;top:14px;right:16px;background:none;border:none;',
    'color:rgba(255,255,255,0.45);font-size:22px;cursor:pointer;line-height:1;padding:4px 8px}',
    '#cc-close:hover{color:#fff}',
    '#cc-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;',
    'color:#CA953D;margin:0 0 10px}',
    '#cc-title{font-size:clamp(20px,2.5vw,26px);font-weight:700;color:#fff;margin:0 0 6px;',
    'font-family:inherit}',
    '#cc-sub{font-size:14px;color:rgba(255,255,255,0.45);margin:0 0 28px;line-height:1.5}',
    '.cc-opt{display:flex;align-items:center;gap:16px;padding:16px 18px;border-radius:10px;',
    'border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);',
    'text-decoration:none;margin-bottom:12px;transition:border-color 0.2s,background 0.2s}',
    '.cc-opt:last-child{margin-bottom:0}',
    '.cc-opt:hover{border-color:rgba(202,149,61,0.5);background:rgba(202,149,61,0.06)}',
    '.cc-opt__icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;',
    'justify-content:center;flex-shrink:0}',
    '.cc-opt--wa .cc-opt__icon{background:rgba(37,211,102,0.12)}',
    '.cc-opt--em .cc-opt__icon{background:rgba(202,149,61,0.12)}',
    '.cc-opt__label{font-size:13px;color:rgba(255,255,255,0.45);margin:0 0 2px}',
    '.cc-opt__val{font-size:15px;font-weight:600;color:#fff;margin:0}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = ccStyles;
  document.head.appendChild(styleEl);

  var ccOverlay = document.createElement('div');
  ccOverlay.id = 'cc-overlay';
  ccOverlay.innerHTML = [
    '<div id="cc-card">',
      '<button id="cc-close" aria-label="Close">&times;</button>',
      '<p id="cc-eyebrow">Get In Touch</p>',
      '<h2 id="cc-title">How Would You Like to Reach Us?</h2>',
      '<p id="cc-sub">Choose your preferred channel and we\'ll respond promptly.</p>',
      '<a class="cc-opt cc-opt--wa" href="' + WA_URL + '" target="_blank" rel="noopener">',
        '<span class="cc-opt__icon">',
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none">',
            '<path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.18 1.6 6L0 24l6.18-1.58A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zm-8.52 18.4a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.67.94.97-3.57-.24-.37A9.9 9.9 0 0112 2.1c2.65 0 5.14 1.03 7.01 2.9A9.86 9.86 0 0121.9 12c0 5.47-4.45 9.88-9.9 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 01-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.48 1.7.62.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.41-.07-.12-.27-.19-.57-.34z" fill="#25D366"/>',
          '</svg>',
        '</span>',
        '<span>',
          '<p class="cc-opt__label">Chat with us</p>',
          '<p class="cc-opt__val">WhatsApp</p>',
        '</span>',
      '</a>',
      '<a class="cc-opt cc-opt--em" href="mailto:' + EMAIL + '">',
        '<span class="cc-opt__icon">',
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none">',
            '<path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#CA953D"/>',
          '</svg>',
        '</span>',
        '<span>',
          '<p class="cc-opt__label">Send an email</p>',
          '<p class="cc-opt__val">' + EMAIL + '</p>',
        '</span>',
      '</a>',
    '</div>'
  ].join('');
  document.body.appendChild(ccOverlay);

  function openCC() {
    ccOverlay.classList.add('is-open');
  }
  function closeCC() {
    ccOverlay.classList.remove('is-open');
  }

  document.getElementById('cc-close').addEventListener('click', closeCC);
  ccOverlay.addEventListener('click', function (e) {
    if (e.target === ccOverlay) closeCC();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCC();
  });

  /* ── Navigate: slide curtain up then redirect ── */
  function navigate(href) {
    curtain.style.pointerEvents = 'all';
    curtain.style.transform = 'translateY(0)';
    setTimeout(function () { window.location.href = href; }, 560);
  }

  function revealPage() {
    curtain.style.pointerEvents = 'none';
    curtain.style.transition = 'none';
    curtain.style.transform = 'translateY(0)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        curtain.style.transition = 'transform 0.55s cubic-bezier(0.76,0,0.24,1)';
        curtain.style.transform = 'translateY(-100%)';
      });
    });
  }

  /* ── On page load: curtain covers screen then slides off ── */
  window.addEventListener('DOMContentLoaded', revealPage);

  /* ── On bfcache restore (browser back/forward): replay reveal ── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) revealPage();
  });

  /* ── Intercept all link clicks ── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;

    /* WhatsApp contact links → show choice modal */
    if (href === WA_URL) {
      e.preventDefault();
      openCC();
      return;
    }

    /* External / anchor / mailto / tel → let browser handle */
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (a.target === '_blank') return;

    /* Internal page navigation → curtain transition */
    e.preventDefault();
    navigate(href);
  });
})();
