/* Google Translate + RTL helper — Saudi Arabic (MSA) + Arabic-Indic numerals */
(function () {
  var COOKIE = 'googtrans';
  var AR_VAL  = '/en/ar';
  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

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

  function applyDir(ar) {
    document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', ar ? 'ar-SA' : 'en');
  }

  function updateLabel(ar) {
    document.querySelectorAll('.nt-lang-btn-label').forEach(function (el) {
      el.textContent = ar ? 'Eng' : 'عربي';
    });
  }

  /* Convert 0-9 → ٠-٩ in a single text node */
  function toArabicDigits(str) {
    return str.replace(/[0-9]/g, function (d) { return AR_DIGITS[+d]; });
  }

  /* Walk all text nodes under root and convert digits */
  function convertDigits(root) {
    var walker = document.createTreeWalker(
      root || document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      /* skip script / style / noscript content */
      var tag = node.parentNode && node.parentNode.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') continue;
      if (/[0-9]/.test(node.textContent)) {
        node.textContent = toArabicDigits(node.textContent);
      }
    }
  }

  /* Watch for Google Translate injecting translated nodes and convert digits there too */
  function watchForTranslation() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType === 1) convertDigits(n);   /* element */
          if (n.nodeType === 3 && /[0-9]/.test(n.textContent)) { /* text */
            var tag = n.parentNode && n.parentNode.tagName;
            if (tag !== 'SCRIPT' && tag !== 'STYLE') {
              n.textContent = toArabicDigits(n.textContent);
            }
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  /* public: toggle */
  window.ntToggleLang = function () {
    if (isArabic()) { deleteCookie(COOKIE); } else { setCookie(COOKIE, AR_VAL); }
    location.reload();
  };

  /* legacy */
  window.ntSwitchLang = function (toAr) {
    if (toAr) { setCookie(COOKIE, AR_VAL); } else { deleteCookie(COOKIE); }
    location.reload();
  };

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      /* layout: 0 = SIMPLE — no visible widget bar */
      { pageLanguage: 'en', includedLanguages: 'ar', autoDisplay: false, layout: 0 },
      'google_translate_element'
    );
  };

  function init() {
    var ar = isArabic();
    applyDir(ar);
    updateLabel(ar);

    if (ar) {
      /* First pass — convert digits already in the DOM */
      convertDigits(document.body);
      /* Second pass after Google Translate finishes rewriting text (~1.5 s) */
      setTimeout(function () { convertDigits(document.body); }, 1600);
      /* Watch ongoing mutations from Google Translate */
      watchForTranslation();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
