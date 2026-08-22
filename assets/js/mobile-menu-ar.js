(function () {
  'use strict';
  if (window.innerWidth > 1024) return;
  if (document.getElementById('nova-mob-overlay')) return;

  var overlay = document.createElement('div');
  overlay.id = 'nova-mob-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'القائمة');
  overlay.innerHTML =
    '<div class="mob-topbar">' +
      '<div class="mob-topbar-left">' +
        '<button class="mob-back" id="mob-overlay-back" aria-label="رجوع">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          ' رجوع' +
        '</button>' +
      '</div>' +
      '<span class="mob-topbar-title" id="mob-overlay-title">NOVA TLT</span>' +
      '<button class="mob-close" id="mob-overlay-close" aria-label="إغلاق القائمة">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="mob-panels">' +
      '<div class="mob-main-panel">' +
        '<a href="index.html" class="mob-nav-item"><span class="mob-label">الرئيسية</span></a>' +
        '<div class="mob-nav-item" data-mob-panel="company"><span class="mob-label">الشركة</span><svg class="mob-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
        '<div class="mob-nav-item" data-mob-panel="whatwedo"><span class="mob-label">ما نقدّمه</span><svg class="mob-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>' +
        '<a href="projects.html" class="mob-nav-item"><span class="mob-label">المشاريع</span></a>' +
      '</div>' +
      '<div class="mob-sub-panel" id="mob-panel-company">' +
        '<div class="mob-sub-panel-title">الشركة</div>' +
        '<a href="about.html" class="mob-panel-link">من نحن</a>' +
        '<a href="careers.html" class="mob-panel-link">الوظائف</a>' +
      '</div>' +
      '<div class="mob-sub-panel" id="mob-panel-whatwedo">' +
        '<div class="mob-sub-panel-title">ما نقدّمه</div>' +
        '<a href="services.html" class="mob-panel-link">الخدمات</a>' +
        '<a href="fleet.html" class="mob-panel-link">الأسطول</a>' +
        '<a href="industries.html" class="mob-panel-link">القطاعات التي نخدمها</a>' +
      '</div>' +
    '</div>' +
    '<div class="mob-footer">' +
      '<a href="contact.html" class="mob-footer-cta" id="mob-overlay-cta">اتصل بنا ←</a>' +
    '</div>';

  document.body.appendChild(overlay);

  var menuBtn = document.querySelector('.header__hamburger-btn');
  if (!menuBtn) return;
  menuBtn.innerHTML = '<svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true"><rect y="0" width="22" height="2" rx="1" fill="currentColor"/><rect y="7" width="22" height="2" rx="1" fill="currentColor"/><rect y="14" width="22" height="2" rx="1" fill="currentColor"/></svg>';

  var closeBtn = document.getElementById('mob-overlay-close');
  var backBtn  = document.getElementById('mob-overlay-back');
  var topbarTitle = document.getElementById('mob-overlay-title');

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

  /* Contact CTA — direct link, no modal */
  var ctaBtn = document.getElementById('mob-overlay-cta');
  if (ctaBtn) ctaBtn.addEventListener('click', function () { closeMenu(); });
})();
