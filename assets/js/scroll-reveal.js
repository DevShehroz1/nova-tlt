(function () {
  'use strict';

  /* ── 1. Nav char-split hover animation ── */
  /* Skip on RTL: per-character spans break Arabic ligatures */
  if (document.documentElement.getAttribute('dir') !== 'rtl') {
    document.querySelectorAll('.text-hover').forEach(function (el) {
      el.querySelectorAll('.text-hover__elem').forEach(function (elem) {
        var chars = elem.textContent.split('');
        elem.innerHTML = chars.map(function (ch, i) {
          var safe = ch === ' ' ? '&nbsp;' : ch.replace(/[<>&"]/g, function (c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
          });
          return '<span class="text-hover__char" style="transition-delay:' + (i * 28) + 'ms">' + safe + '</span>';
        }).join('');
      });
    });
  }

  /* ── 2. Hero entrance (fires immediately on load) ── */
  var HERO_SEL = [
    '.inner-hero__eyebrow', '.inner-hero__title', '.inner-hero__sub',
    '.page-hero__eyebrow', '.page-hero__title', '.page-hero__sub'
  ];
  var heroItems = [];
  HERO_SEL.forEach(function (sel) {
    var el = document.querySelector(sel);
    if (el) heroItems.push(el);
  });
  heroItems.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.75s ease ' + (0.08 + i * 0.14) + 's, transform 0.75s cubic-bezier(0.22,1,0.36,1) ' + (0.08 + i * 0.14) + 's';
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      heroItems.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

  /* ── 3. Scroll-reveal for sections ── */
  if (!('IntersectionObserver' in window)) return;

  var SCROLL_SEL = [
    '.section-eyebrow', '.section-title', '.section-sub',
    '.sec__eyebrow', '.sec__title', '.sec__sub',
    '.card', '.cert-card', '.cert-tile', '.team-card',
    '.stat-item', '.hero-badge',
    '.inner-cta__title', '.inner-cta__sub',
    '.about-body', '.career-card', '.project-card', '.news-card',
    '.btn-gold', '.btn-ghost', '.ghost-btn', '.gold-btn'
  ].join(',');

  var heroSet = new Set(heroItems);
  var revealEls = Array.from(document.querySelectorAll(SCROLL_SEL)).filter(function (el) {
    return !heroSet.has(el);
  });

  revealEls.forEach(function (el) {
    var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    var idx = Math.min(siblings.indexOf(el), 5);
    var delay = idx * 0.09;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition =
      'opacity 0.6s ease ' + delay + 's,' +
      'transform 0.65s cubic-bezier(0.22,1,0.36,1) ' + delay + 's';
  });

  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.08 });

  revealEls.forEach(function (el) { revealIO.observe(el); });

  /* ── 4. Counter animation for stat numbers ── */
  var statEls = document.querySelectorAll('.stat-num, .stat__num, .hero-badge__num');
  statEls.forEach(function (el) {
    var original = el.textContent.trim();
    var num = parseFloat(original.replace(/[^0-9.]/g, ''));
    var suffix = original.replace(/[0-9.]/g, '').trim();
    if (isNaN(num) || num === 0) return;

    var done = false;
    var cntIO = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || done) return;
      done = true;
      var t0 = null;
      var dur = 1600;
      (function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * num) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = original;
      })(performance.now());
      cntIO.unobserve(el);
    }, { threshold: 0.3 });
    cntIO.observe(el);
  });

})();
