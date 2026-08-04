(function () {
  'use strict';

  /* Inject curtain element */
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

  /* Slide curtain up then navigate */
  function navigate(href) {
    curtain.style.pointerEvents = 'all';
    curtain.style.transform = 'translateY(0)';
    setTimeout(function () { window.location.href = href; }, 560);
  }

  /* On page load, slide curtain down off screen */
  window.addEventListener('DOMContentLoaded', function () {
    curtain.style.transition = 'none';
    curtain.style.transform = 'translateY(0)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        curtain.style.transition = 'transform 0.55s cubic-bezier(0.76,0,0.24,1)';
        curtain.style.transform = 'translateY(-100%)';
      });
    });
  });

  /* Intercept all internal link clicks */
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
