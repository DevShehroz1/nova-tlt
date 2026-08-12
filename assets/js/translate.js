/* Google Translate + RTL helper */
(function () {
  var COOKIE = 'googtrans';
  var AR_VAL  = '/en/ar';

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
    document.documentElement.setAttribute('lang', ar ? 'ar' : 'en');
  }

  function updateLabel(ar) {
    document.querySelectorAll('.nt-lang-btn-label').forEach(function (el) {
      /* show what clicking WILL switch TO */
      el.textContent = ar ? 'Eng' : 'عربي';
    });
  }

  /* public: called by onclick on every page */
  window.ntToggleLang = function () {
    if (isArabic()) {
      deleteCookie(COOKIE);
    } else {
      setCookie(COOKIE, AR_VAL);
    }
    location.reload();
  };

  /* kept for any legacy onclick="ntSwitchLang(...)" calls */
  window.ntSwitchLang = function (toAr) {
    if (toAr) { setCookie(COOKIE, AR_VAL); } else { deleteCookie(COOKIE); }
    location.reload();
  };

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'ar,en', autoDisplay: false },
      'google_translate_element'
    );
  };

  function init() {
    var ar = isArabic();
    applyDir(ar);
    updateLabel(ar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
