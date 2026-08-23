(function () {
  if (window.innerWidth > 1024) return;

  /* Remove English overlay injected by mobile-menu.js */
  var old = document.getElementById('nova-mob-overlay');
  if (old) old.remove();

  /* ── Styles ── */
  var s = document.createElement('style');
  s.textContent =
    '@media (max-width:1024px){' +
      '[dir=rtl] .header__actions{direction:rtl;}' +
      '[dir=rtl] .header__actions .header__hamburger-btn{order:1;}' +
      '[dir=rtl] .header__actions .nt-lang-wrap{order:2;}' +
    '}' +
    '.ar-mob{direction:rtl;}' +
    '.ar-mob .ar-mob-topbar{display:flex;align-items:center;justify-content:space-between;padding:0 20px;height:64px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;}' +
    '.ar-mob .ar-mob-logo{height:40px;width:auto;display:block;}' +
    '.ar-mob .ar-mob-close{width:40px;height:40px;border:1px solid rgba(255,255,255,0.15);border-radius:50%;background:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color .2s,color .2s;}' +
    '.ar-mob .ar-mob-close:hover{border-color:#CA953D;color:#CA953D;}' +
    '.ar-mob .ar-mob-back{display:none;align-items:center;gap:6px;background:none;border:none;color:rgba(255,255,255,0.55);font-family:"Tajawal",sans-serif;font-size:14px;cursor:pointer;padding:0;transition:color .2s;flex-shrink:0;letter-spacing:0;}' +
    '.ar-mob.sub-open .ar-mob-back{display:flex;}' +
    '.ar-mob .ar-mob-back:hover{color:#fff;}' +
    '.ar-mob .ar-mob-panels{flex:1;position:relative;overflow:hidden;}' +
    '.ar-mob .ar-mob-main{position:absolute;inset:0;padding:0 28px;overflow-y:auto;display:flex;flex-direction:column;justify-content:center;transition:transform .42s cubic-bezier(.22,1,.36,1);}' +
    '.ar-mob.sub-open .ar-mob-main{transform:translateX(30%);}' +
    '.ar-mob .ar-mob-lang{display:flex;gap:16px;padding:0 0 12px;justify-content:flex-start;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:4px;}' +
    '.ar-mob .ar-mob-lang a{font-size:13px;font-weight:600;color:rgba(255,255,255,0.4);text-decoration:none;letter-spacing:.06em;transition:color .2s;font-family:inherit;}' +
    '.ar-mob .ar-mob-lang a.active,.ar-mob .ar-mob-lang a:hover{color:#CA953D;}' +
    '.ar-mob .ar-mob-item{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#f7f1ed;text-decoration:none;font-family:"Tajawal",sans-serif;font-size:clamp(28px,8vw,44px);font-weight:700;letter-spacing:0;cursor:pointer;transition:color .2s;}' +
    '.ar-mob .ar-mob-item:first-of-type{border-top:1px solid rgba(255,255,255,0.06);}' +
    '.ar-mob .ar-mob-item:hover,.ar-mob .ar-mob-item:active{color:#CA953D;}' +
    '.ar-mob .ar-mob-chev{flex-shrink:0;color:rgba(255,255,255,0.3);transition:color .2s,transform .2s;width:20px;height:20px;}' +
    '.ar-mob .ar-mob-item:hover .ar-mob-chev{color:#CA953D;transform:translateX(-4px);}' +
    '.ar-mob .ar-mob-sub{position:absolute;inset:0;padding:0 28px;overflow-y:auto;display:flex;flex-direction:column;background:#0a0a0a;transform:translateX(-100%);transition:transform .42s cubic-bezier(.22,1,.36,1);}' +
    '.ar-mob .ar-mob-sub.active{transform:translateX(0);}' +
    '.ar-mob .ar-mob-sub-title{font-family:"Tajawal",sans-serif;font-size:12px;color:#CA953D;padding:24px 0 14px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;letter-spacing:.08em;text-transform:uppercase;}' +
    '.ar-mob .ar-mob-link{display:flex;align-items:center;justify-content:space-between;padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.65);font-family:"Tajawal",sans-serif;font-size:22px;font-weight:500;text-decoration:none;letter-spacing:0;transition:color .2s;}' +
    '.ar-mob .ar-mob-link:hover{color:#f7f1ed;}' +
    '.ar-mob .ar-mob-link svg{color:rgba(255,255,255,0.2);flex-shrink:0;transition:color .2s;}' +
    '.ar-mob .ar-mob-link:hover svg{color:#CA953D;}' +
    '.ar-mob .ar-mob-footer{padding:20px 28px 32px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0;}' +
    '.ar-mob .ar-mob-cta{display:inline-flex;align-items:center;gap:10px;font-family:"Tajawal",sans-serif;font-size:15px;font-weight:600;letter-spacing:0;color:#CA953D;text-decoration:none;padding:12px 24px;border:1px solid rgba(202,149,61,.35);border-radius:5rem;transition:background .25s,border-color .25s;}' +
    '.ar-mob .ar-mob-cta:hover{background:rgba(202,149,61,.1);border-color:#CA953D;}';
  document.head.appendChild(s);

  /* ── SVG helpers ── */
  var chevLeft  = '<svg class="ar-mob-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var chevSmall = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var backArrow = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var arrowIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  /* ── Build overlay ── */
  var ov = document.createElement('div');
  ov.id = 'nova-mob-overlay';
  ov.className = 'ar-mob';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');

  ov.innerHTML =
    '<div class="ar-mob-topbar">' +
      '<button class="ar-mob-back" id="ar-mob-back" aria-label="رجوع">' + backArrow + ' رجوع</button>' +
      '<img src="assets/img/logo.png" alt="NOVA TLT" class="ar-mob-logo" />' +
      '<button class="ar-mob-close" id="ar-mob-close" aria-label="إغلاق">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="ar-mob-panels">' +
      '<div class="ar-mob-main">' +
        '<div class="ar-mob-lang">' +
          '<a href="ar.html" class="active">عر</a>' +
          '<a href="index.html" style="direction:ltr">ENG</a>' +
        '</div>' +
        '<a href="ar.html" class="ar-mob-item">الرئيسية</a>' +
        '<div class="ar-mob-item" data-sub="company"><span>الشركة</span>' + chevLeft + '</div>' +
        '<div class="ar-mob-item" data-sub="whatwedo"><span>خدماتنا</span>' + chevLeft + '</div>' +
        '<div class="ar-mob-item" data-sub="work"><span>مشاريعنا</span>' + chevLeft + '</div>' +
        '<a href="ar-contact.html" class="ar-mob-item">تواصل معنا</a>' +
      '</div>' +
      '<div class="ar-mob-sub" id="ar-sub-company">' +
        '<div class="ar-mob-sub-title">الشركة</div>' +
        '<a href="ar-about.html" class="ar-mob-link">من نحن' + chevSmall + '</a>' +
        '<a href="ar-careers.html" class="ar-mob-link">الوظائف' + chevSmall + '</a>' +
      '</div>' +
      '<div class="ar-mob-sub" id="ar-sub-whatwedo">' +
        '<div class="ar-mob-sub-title">خدماتنا</div>' +
        '<a href="ar-services.html" class="ar-mob-link">الخدمات' + chevSmall + '</a>' +
        '<a href="ar-fleet.html" class="ar-mob-link">الأسطول' + chevSmall + '</a>' +
        '<a href="ar-industries.html" class="ar-mob-link">القطاعات' + chevSmall + '</a>' +
      '</div>' +
      '<div class="ar-mob-sub" id="ar-sub-work">' +
        '<div class="ar-mob-sub-title">مشاريعنا</div>' +
        '<a href="ar-projects.html" class="ar-mob-link">المشاريع' + chevSmall + '</a>' +
      '</div>' +
    '</div>' +
    '<div class="ar-mob-footer">' +
      '<a href="ar-contact.html" class="ar-mob-cta">' + arrowIcon + ' تواصل معنا</a>' +
    '</div>';

  document.body.appendChild(ov);

  /* ── Controls ── */
  var menuBtn  = document.querySelector('.header__hamburger-btn');
  var closeBtn = document.getElementById('ar-mob-close');
  var backBtn  = document.getElementById('ar-mob-back');

  function closeMenu() {
    ov.classList.remove('is-open', 'sub-open');
    ov.querySelectorAll('.ar-mob-sub.active').forEach(function (p) { p.classList.remove('active'); });
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', function () {
    ov.classList.toggle('is-open');
    document.body.style.overflow = ov.classList.contains('is-open') ? 'hidden' : '';
  });
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  backBtn && backBtn.addEventListener('click', function () {
    ov.classList.remove('sub-open');
    ov.querySelectorAll('.ar-mob-sub.active').forEach(function (p) { p.classList.remove('active'); });
  });

  ov.querySelectorAll('[data-sub]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = document.getElementById('ar-sub-' + trigger.dataset.sub);
      if (!panel) return;
      ov.classList.add('sub-open');
      panel.classList.add('active');
    });
  });
})();
