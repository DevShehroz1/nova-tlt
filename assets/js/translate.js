/* Google Translate + RTL + Arabic-Indic numerals for Nova TLT */
(function () {
  var COOKIE    = 'googtrans';
  var AR_VAL    = '/en/ar';
  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  /* ── cookies ── */
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

  /* ── direction + lang ── */
  function applyDir(ar) {
    document.documentElement.setAttribute('dir', ar ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', ar ? 'ar-SA' : 'en');
  }

  /* ── label shows CURRENT language ── */
  function updateLabel(ar) {
    document.querySelectorAll('.nt-lang-label').forEach(function (el) {
      el.textContent = ar ? 'عربي' : 'ENG';
    });
    document.querySelectorAll('.nt-lang-option').forEach(function (el) {
      var isAr = el.getAttribute('data-lang') === 'ar';
      el.classList.toggle('is-active', ar ? isAr : !isAr);
    });
  }

  /* ── dropdown open/close ── */
  function initDropdown() {
    var btn  = document.getElementById('nt-lang-btn');
    var menu = document.getElementById('nt-lang-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('is-open');
    });

    menu.querySelectorAll('.nt-lang-option').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        var href = opt.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });
    });

    document.addEventListener('click', function () {
      menu.classList.remove('is-open');
    });
  }

  /* ── Arabic-Indic numeral conversion ──
     Skip: phone links, ltr elements, preloader, scripts             */
  function toArabicDigits(str) {
    return str.replace(/[0-9]/g, function (d) { return AR_DIGITS[+d]; });
  }

  function shouldSkipNode(node) {
    var el = node.parentNode;
    if (!el) return true;
    var tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return true;
    /* skip phone/email anchors */
    if (tag === 'A') {
      var href = el.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) return true;
    }
    /* skip elements with explicit ltr direction */
    if (el.getAttribute('dir') === 'ltr') return true;
    /* skip preloader */
    if (el.closest && el.closest('#arc-preloader')) return true;
    return false;
  }

  function convertDigits(root) {
    var walker = document.createTreeWalker(
      root || document.body, NodeFilter.SHOW_TEXT, null, false
    );
    var node;
    while ((node = walker.nextNode())) {
      if (shouldSkipNode(node)) continue;
      if (/[0-9]/.test(node.textContent)) {
        node.textContent = toArabicDigits(node.textContent);
      }
    }
  }

  function watchForDigits() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'characterData') {
          if (!shouldSkipNode(m.target) && /[0-9]/.test(m.target.textContent)) {
            m.target.textContent = toArabicDigits(m.target.textContent);
          }
          return;
        }
        m.addedNodes.forEach(function (n) {
          if (n.nodeType === 1) convertDigits(n);
          if (n.nodeType === 3 && !shouldSkipNode(n) && /[0-9]/.test(n.textContent)) {
            n.textContent = toArabicDigits(n.textContent);
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ── sync elem-2 hover spans from elem-1 after GT translation ── */
  function syncHoverSpans() {
    document.querySelectorAll('.text-hover__inner').forEach(function (wrap) {
      var e1 = wrap.querySelector('.text-hover__elem-1');
      var e2 = wrap.querySelector('.text-hover__elem-2');
      if (e1 && e2 && e1.textContent !== e2.textContent) {
        e2.textContent = e1.textContent;
      }
    });
  }

  /* ── boot ── */
  function init() {
    var ar = isArabic();
    applyDir(ar);
    updateLabel(ar);
    initDropdown();

    if (ar) {
      convertDigits(document.body);
      /* after GT finishes translating (~1.5s): sync hover spans + re-convert digits */
      setTimeout(function () {
        syncHoverSpans();
        convertDigits(document.body);
      }, 1600);
      watchForDigits();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
