/* Google Translate + RTL helper */
(function () {
  var COOKIE = 'googtrans';
  var AR_VAL  = '/en/ar';
  var EN_VAL  = '/en/en';

  /* ── cookie helpers ── */
  function getCookie(name) {
    var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function setCookie(name, val) {
    var host = location.hostname;
    var domain = host === 'localhost' || host === '127.0.0.1' ? '' : '; domain=.' + host;
    var expire = '; expires=' + new Date(Date.now() + 365 * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(val) + expire + domain + '; path=/';
    /* also set for root domain */
    document.cookie = name + '=' + encodeURIComponent(val) + expire + '; path=/';
  }
  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.' + location.hostname + '; path=/';
  }

  /* ── detect current lang ── */
  function isArabic() {
    var c = getCookie(COOKIE);
    return c === AR_VAL || c === '/ar/ar';
  }

  /* ── apply RTL / LTR ── */
  function applyDir(ar) {
    document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', ar ? 'ar' : 'en');
  }

  /* ── update button label ── */
  function updateLabel(ar) {
    document.querySelectorAll('.nt-lang-btn-label').forEach(function (el) {
      el.textContent = ar ? 'عربي' : 'Eng';
    });
    document.querySelectorAll('.nt-lang-en').forEach(function (el) {
      el.style.display = ar ? 'none' : '';
    });
    document.querySelectorAll('.nt-lang-ar').forEach(function (el) {
      el.style.display = ar ? '' : 'none';
    });
  }

  /* ── switch language ── */
  window.ntSwitchLang = function (toAr) {
    if (toAr) {
      setCookie(COOKIE, AR_VAL);
    } else {
      deleteCookie(COOKIE);
      setCookie(COOKIE, EN_VAL);
    }
    location.reload();
  };

  /* ── Google Translate init callback ── */
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'ar,en', autoDisplay: false },
      'google_translate_element'
    );
  };

  /* ── run on DOM ready ── */
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
