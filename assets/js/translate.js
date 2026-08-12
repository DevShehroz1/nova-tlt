/* Google Translate + RTL + Arabic-Indic numerals */
(function () {
  var COOKIE  = 'googtrans';
  var AR_VAL  = '/en/ar';
  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  /* ── cookie helpers ── */
  function getCookie(name) {
    var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function setCookie(name, val) {
    var exp = '; expires=' + new Date(Date.now() + 365 * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(val) + exp + '; path=/';
    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      document.cookie = name + '=' + encodeURIComponent(val) + exp + '; domain=.' + location.hostname + '; path=/';
    }
  }
  function deleteCookie(name) {
    var past = '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = name + '=' + past;
    document.cookie = name + '=; domain=.' + location.hostname + past;
  }

  function isArabic() {
    var c = getCookie(COOKIE);
    return c === AR_VAL || c === '/ar/ar';
  }

  /* ── direction ── */
  function applyDir(ar) {
    document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', ar ? 'ar-SA' : 'en');
  }

  /* ── label: show CURRENT language ── */
  function updateLabel(ar) {
    document.querySelectorAll('.nt-lang-label').forEach(function (el) {
      el.textContent = ar ? 'عربي' : 'ENG';
    });
    /* dim the active option in the dropdown */
    document.querySelectorAll('.nt-lang-option').forEach(function (el) {
      var isAr = el.getAttribute('data-lang') === 'ar';
      el.classList.toggle('is-active', ar ? isAr : !isAr);
    });
  }

  /* ── dropdown open / close ── */
  function initDropdown() {
    var btn  = document.getElementById('nt-lang-btn');
    var menu = document.getElementById('nt-lang-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('is-open');
    });

    /* option clicks */
    menu.querySelectorAll('.nt-lang-option').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        var toAr = opt.getAttribute('data-lang') === 'ar';
        if (toAr) { setCookie(COOKIE, AR_VAL); } else { deleteCookie(COOKIE); }
        location.reload();
      });
    });

    /* close on outside click */
    document.addEventListener('click', function () {
      menu.classList.remove('is-open');
    });
  }

  /* ── Arabic-Indic numeral conversion ── */
  function toArabicDigits(str) {
    return str.replace(/[0-9]/g, function (d) { return AR_DIGITS[+d]; });
  }

  function convertDigits(root) {
    var walker = document.createTreeWalker(
      root || document.body, NodeFilter.SHOW_TEXT, null, false
    );
    var node;
    while ((node = walker.nextNode())) {
      var tag = node.parentNode && node.parentNode.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') continue;
      if (/[0-9]/.test(node.textContent)) {
        node.textContent = toArabicDigits(node.textContent);
      }
    }
  }

  function watchForDigits() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        /* text content changed in place (counter animations) */
        if (m.type === 'characterData') {
          if (/[0-9]/.test(m.target.textContent)) {
            m.target.textContent = toArabicDigits(m.target.textContent);
          }
          return;
        }
        /* new nodes added (Google Translate replacements) */
        m.addedNodes.forEach(function (n) {
          if (n.nodeType === 1) convertDigits(n);
          if (n.nodeType === 3 && /[0-9]/.test(n.textContent)) {
            var tag = n.parentNode && n.parentNode.tagName;
            if (tag !== 'SCRIPT' && tag !== 'STYLE') {
              n.textContent = toArabicDigits(n.textContent);
            }
          }
        });
      });
    });
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true   /* catches counter animation textContent changes */
    });
  }

  /* ── Google Translate init ── */
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'ar', autoDisplay: false, layout: 0 },
      'google_translate_element'
    );
  };

  /* ── boot ── */
  function init() {
    var ar = isArabic();
    applyDir(ar);
    updateLabel(ar);
    initDropdown();

    if (ar) {
      convertDigits(document.body);
      /* re-run after Google Translate finishes (~1.5 s) */
      setTimeout(function () { convertDigits(document.body); }, 1600);
      watchForDigits();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
