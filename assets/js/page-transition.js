(function () {
  'use strict';

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
    'pointer-events:none',
    'display:flex',
    'align-items:center',
    'justify-content:center'
  ].join(';');

  /* ── Logo inside curtain ── */
  var logo = document.createElement('img');
  logo.src = 'assets/img/logo_white.svg';
  logo.alt = 'NOVA TLT';
  logo.style.cssText = [
    'width:140px',
    'opacity:0',
    'transition:opacity 0.25s ease',
    'pointer-events:none',
    'user-select:none'
  ].join(';');
  curtain.appendChild(logo);

  document.body.appendChild(curtain);

  /* ── Navigate: slide curtain up, show logo, then redirect ── */
  function navigate(href) {
    curtain.style.pointerEvents = 'all';
    curtain.style.transform = 'translateY(0)';
    /* fade logo in after curtain starts rising */
    setTimeout(function () { logo.style.opacity = '1'; }, 180);
    setTimeout(function () { window.location.href = href; }, 560);
  }

  /* ── On page load: curtain covers screen, fade logo in, then slide curtain up ── */
  window.addEventListener('DOMContentLoaded', function () {
    /* snap curtain to cover without animation */
    curtain.style.transition = 'none';
    curtain.style.transform = 'translateY(0)';
    logo.style.opacity = '1';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        /* slide curtain off-screen upward */
        curtain.style.transition = 'transform 0.55s cubic-bezier(0.76,0,0.24,1)';
        curtain.style.transform = 'translateY(-100%)';
        /* fade logo out as curtain leaves */
        setTimeout(function () { logo.style.opacity = '0'; }, 200);
      });
    });
  });

  /* ── Intercept all internal link clicks ── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (a.target === '_blank') return;
    e.preventDefault();
    navigate(href);
  });
})();
