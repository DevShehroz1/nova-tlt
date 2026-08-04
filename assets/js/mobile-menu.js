(function () {
  'use strict';
  if (window.innerWidth > 1024) return;
  if (document.getElementById('nova-mob-overlay')) return;

  /* ── Inject overlay HTML ── */
  var overlay = document.createElement('div');
  overlay.id = 'nova-mob-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Navigation');
  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  overlay.innerHTML =
    '<div class="mob-topbar">' +
      '<div class="mob-topbar-left">' +
        '<button class="mob-back" id="mob-overlay-back" aria-label="Go back">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          ' Back' +
        '</button>' +
      '</div>' +
      '<span class="mob-topbar-title" id="mob-overlay-title">NOVA TLT</span>' +
      '<button class="mob-close" id="mob-overlay-close" aria-label="Close menu">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="mob-panels">' +
      '<div class="mob-main-panel">' +
        '<a href="index.html" class="mob-nav-item"><span class="mob-label">Home</span></a>' +
        '<div class="mob-nav-item" data-mob-panel="company"><span class="mob-label">Company</span><svg class="mob-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
        '<div class="mob-nav-item" data-mob-panel="whatwedo"><span class="mob-label">What We Do</span><svg class="mob-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
        '<div class="mob-nav-item" data-mob-panel="work"><span class="mob-label">Work</span><svg class="mob-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
        '<a href="news.html" class="mob-nav-item"><span class="mob-label">News</span></a>' +
      '</div>' +
      '<div class="mob-sub-panel" id="mob-panel-company">' +
        '<div class="mob-sub-panel-title">Company</div>' +
        '<a href="about.html" class="mob-panel-link">About Us</a>' +
        '<a href="safety.html" class="mob-panel-link">Safety &amp; Quality</a>' +
        '<a href="careers.html" class="mob-panel-link">Careers</a>' +
      '</div>' +
      '<div class="mob-sub-panel" id="mob-panel-whatwedo">' +
        '<div class="mob-sub-panel-title">What We Do</div>' +
        '<a href="services.html" class="mob-panel-link">Services</a>' +
        '<a href="fleet.html" class="mob-panel-link">Fleet</a>' +
        '<a href="industries.html" class="mob-panel-link">Industries We Serve</a>' +
      '</div>' +
      '<div class="mob-sub-panel" id="mob-panel-work">' +
        '<div class="mob-sub-panel-title">Work</div>' +
        '<a href="projects.html" class="mob-panel-link">Projects</a>' +
        '<a href="gallery.html" class="mob-panel-link">Gallery</a>' +
      '</div>' +
    '</div>' +
    '<div class="mob-footer">' +
      '<a href="#" class="mob-footer-cta" id="mob-overlay-cta">Get in Touch →</a>' +
    '</div>';

  document.body.appendChild(overlay);

  /* ── Replace hamburger button content with SVG icon ── */
  var menuBtn = document.querySelector('.header__hamburger-btn');
  if (!menuBtn) return;
  menuBtn.innerHTML = '<svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true"><rect y="0" width="22" height="2" rx="1" fill="currentColor"/><rect y="7" width="22" height="2" rx="1" fill="currentColor"/><rect y="14" width="22" height="2" rx="1" fill="currentColor"/></svg>';

  var closeBtn = document.getElementById('mob-overlay-close');
  var backBtn = document.getElementById('mob-overlay-back');
  var topbarTitle = document.getElementById('mob-overlay-title');

  /* ── Char-split wave animation on .mob-label ── */
  overlay.querySelectorAll('.mob-label').forEach(function (label) {
    var text = label.textContent;
    label.innerHTML = '';
    label.style.display = 'inline-flex';
    text.split('').forEach(function (char) {
      if (char === ' ') { var sp = document.createElement('span'); sp.innerHTML = '&nbsp;'; label.appendChild(sp); return; }
      var wrap = document.createElement('span'); wrap.className = 'mob-char-wrap';
      var stack = document.createElement('span'); stack.className = 'mob-char-stack';
      [char, char].forEach(function (c, j) {
        var s = document.createElement('span'); s.textContent = c;
        if (j === 1) s.setAttribute('aria-hidden', 'true');
        stack.appendChild(s);
      });
      wrap.appendChild(stack); label.appendChild(wrap);
    });
    var stacks = label.querySelectorAll('.mob-char-stack');
    var locked = false, pendingLeave = false;
    var item = label.closest('.mob-nav-item');
    if (!item) return;
    function animIn() {
      pendingLeave = false; if (locked) return; locked = true;
      stacks.forEach(function (s, i) { s.style.transitionDuration = '600ms'; s.style.transitionDelay = (18 * i) + 'ms'; s.style.transform = 'translateY(-50%)'; });
      setTimeout(function () { locked = false; if (pendingLeave) { pendingLeave = false; animOut(); } }, 18 * stacks.length + 400);
    }
    function animOut() { stacks.forEach(function (s) { s.style.transitionDuration = '0ms'; s.style.transitionDelay = '0ms'; s.style.transform = 'translateY(0)'; }); }
    item.addEventListener('mouseenter', animIn);
    item.addEventListener('mouseleave', function () { if (locked) { pendingLeave = true; } else { animOut(); } });
    item.addEventListener('touchstart', animIn, { passive: true });
  });

  /* ── Open / close ── */
  function closeMenu() {
    overlay.classList.remove('is-open', 'sub-open');
    overlay.querySelectorAll('.mob-sub-panel.active').forEach(function (p) { p.classList.remove('active'); });
    if (topbarTitle) topbarTitle.textContent = 'NOVA TLT';
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', function () {
    overlay.classList.toggle('is-open');
    document.body.style.overflow = overlay.classList.contains('is-open') ? 'hidden' : '';
  });
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  backBtn && backBtn.addEventListener('click', function () {
    overlay.classList.remove('sub-open');
    overlay.querySelectorAll('.mob-sub-panel.active').forEach(function (p) { p.classList.remove('active'); });
    if (topbarTitle) topbarTitle.textContent = 'NOVA TLT';
  });

  /* ── Drill-down panels ── */
  overlay.querySelectorAll('[data-mob-panel]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var key = trigger.getAttribute('data-mob-panel');
      var panel = document.getElementById('mob-panel-' + key);
      if (!panel) return;
      var titleEl = panel.querySelector('.mob-sub-panel-title');
      overlay.classList.add('sub-open');
      panel.classList.add('active');
      if (topbarTitle && titleEl) topbarTitle.textContent = titleEl.textContent;
    });
  });

  /* ── Contact CTA ── */
  var ctaBtn = document.getElementById('mob-overlay-cta');
  if (ctaBtn) ctaBtn.addEventListener('click', function (e) {
    e.preventDefault(); closeMenu();
    var modal = document.getElementById('modal-contact');
    if (modal) modal.classList.remove('hidden');
  });
})();
