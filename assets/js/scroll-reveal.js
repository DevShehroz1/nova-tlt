(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;

  var TARGETS = [
    '.section-eyebrow', '.section-title', '.section-sub',
    '.inner-hero__eyebrow', '.inner-hero__title', '.inner-hero__sub',
    '.inner-cta__title', '.inner-cta__sub',
    '.card', '.cert-card',
    '.stat-item',
    '.page-hero__eyebrow', '.page-hero__title', '.page-hero__sub',
    '.sec__eyebrow', '.sec__title', '.sec__sub',
    '.team-card', '.career-card', '.project-card', '.news-card'
  ].join(',');

  var els = Array.from(document.querySelectorAll(TARGETS));
  if (!els.length) return;

  els.forEach(function (el) {
    var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    var idx = siblings.indexOf(el);
    var delay = Math.min(idx, 4) * 0.09;
    el.style.cssText += ';opacity:0;transform:translateY(22px);transition:opacity 0.55s ease ' + delay + 's,transform 0.6s cubic-bezier(0.22,1,0.36,1) ' + delay + 's;';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  els.forEach(function (el) { io.observe(el); });
})();
