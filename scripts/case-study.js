(function () {
  'use strict';

  var capture = !!window.PORTFOLIO_CAPTURE_MODE;
  var reduced = capture || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============ I18N HELPERS ============
  var lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase().slice(0, 2);
  if (lang !== 'en' && lang !== 'es') lang = 'es';

  var STRINGS = {
    es: {
      chapterArrow: 'Ver capítulo →',
      prevKicker: '← Proyecto anterior',
      nextKicker: 'Siguiente proyecto →',
      prevDisabledTitle: 'Inicio del <em>portafolio</em>',
      prevDisabledMeta: 'Primer caso de la serie',
      nextDisabledTitle: 'Inicio del <em>portafolio</em>',
      nextDisabledMeta: 'Último caso de la serie'
    },
    en: {
      chapterArrow: 'View chapter →',
      prevKicker: '← Previous project',
      nextKicker: 'Next project →',
      prevDisabledTitle: 'Portfolio <em>home</em>',
      prevDisabledMeta: 'First case in the series',
      nextDisabledTitle: 'Portfolio <em>home</em>',
      nextDisabledMeta: 'Last case in the series'
    }
  };
  var t = STRINGS[lang] || STRINGS.es;

  // ============ DATA HYDRATION ============
  // body[data-case="slug"] → fetch content/cases/{slug}.json
  // [data-case-field="path"] resolved as i18n[lang].<path> with fallback to root.<path> (meta.* technical fields)
  // [data-case-chapters] → injected from i18n[lang].chapters[]
  // [data-case-credits]  → injected from i18n[lang].credits[]
  // [data-case-prev|next] anchors → href + localized title/meta from data.prev|next
  var slug = document.body.dataset.case;
  var done = function () {
    window.dispatchEvent(new CustomEvent('casehydrated'));
  };
  if (slug) {
    var scriptUrl = document.currentScript ? document.currentScript.src : window.location.href;
    // Try ../content/cases first (works/ pages), then ../../content/cases (en/works/ pages)
    var paths = [
      new URL('../content/cases/' + slug + '.json', scriptUrl).href,
      new URL('../../content/cases/' + slug + '.json', scriptUrl).href
    ];

    var tryFetch = function (i) {
      if (i >= paths.length) return Promise.resolve(null);
      return fetch(paths[i])
        .then(function (r) { return r.ok ? r.json() : tryFetch(i + 1); })
        .catch(function () { return tryFetch(i + 1); });
    };

    tryFetch(0).then(function (data) {
      if (data) hydrate(data);
      done();
    });
  } else {
    done();
  }

  function getNested(obj, path) {
    if (!obj || !path) return null;
    return path.split('.').reduce(function (acc, key) {
      return acc == null ? null : acc[key];
    }, obj);
  }

  function resolveField(data, path) {
    var i18nRoot = data.i18n && data.i18n[lang] ? data.i18n[lang] : null;
    var v = getNested(i18nRoot, path);
    if (v != null) return v;
    v = getNested(data, path);
    if (v != null) return v;
    return null;
  }

  function pickLocalized(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      if (typeof value[lang] === 'string') return value[lang];
      if (typeof value.es === 'string') return value.es;
      if (typeof value.en === 'string') return value.en;
    }
    return '';
  }

  function hydrate(data) {
    var i18nRoot = data.i18n && data.i18n[lang] ? data.i18n[lang] : null;

    // Field-level fills
    document.querySelectorAll('[data-case-field]').forEach(function (el) {
      var value = resolveField(data, el.dataset.caseField);
      if (value == null) return;
      if (Array.isArray(value)) value = value.join(' · ');
      el.innerHTML = String(value);
    });

    // Snapshot block (legacy — older templates)
    var snapshotHost = document.querySelector('[data-case-snapshot]');
    if (snapshotHost) {
      var snapshot = (i18nRoot && Array.isArray(i18nRoot.snapshot)) ? i18nRoot.snapshot : data.snapshot;
      if (Array.isArray(snapshot)) {
        snapshotHost.innerHTML = snapshot.map(function (item) {
          return (
            '<div class="snapshot__item">' +
              '<div class="snapshot__label">' + (item.label || '') + '</div>' +
              '<div class="snapshot__value">' + (item.value || '') + '</div>' +
              '<p class="snapshot__small">' + (item.note || '') + '</p>' +
            '</div>'
          );
        }).join('');
      }
    }

    // Credits block
    var creditsHost = document.querySelector('[data-case-credits]');
    if (creditsHost) {
      var credits = (i18nRoot && Array.isArray(i18nRoot.credits)) ? i18nRoot.credits : data.credits;
      if (Array.isArray(credits)) {
        creditsHost.innerHTML = credits.map(function (row) {
          return (
            '<div class="credits__row">' +
              '<span>' + (row.label || '') + '</span>' +
              '<b>' + (row.value || '') + '</b>' +
            '</div>'
          );
        }).join('');
      }
    }

    // Chapter index — narrative navigation
    var chaptersHost = document.querySelector('[data-case-chapters]');
    if (chaptersHost) {
      var chapters = (i18nRoot && Array.isArray(i18nRoot.chapters)) ? i18nRoot.chapters : data.chapters;
      if (Array.isArray(chapters)) {
        chaptersHost.innerHTML = chapters.map(function (ch) {
          var anchor = ch.anchor || '#';
          return (
            '<a class="snapshot__item" href="' + anchor + '">' +
              '<div class="snapshot__num">' + (ch.num || '') + '</div>' +
              '<div class="snapshot__value">' + (ch.label || '') + '</div>' +
              '<p class="snapshot__small">' + (ch.note || '') + '</p>' +
              '<div class="snapshot__arrow">' + t.chapterArrow + '</div>' +
            '</a>'
          );
        }).join('');
      }
    }

    // Prev / Next navigation cards
    applyNavCard(
      document.querySelector('[data-case-prev]'),
      data.prev,
      t.prevKicker,
      t.prevDisabledTitle,
      t.prevDisabledMeta
    );
    applyNavCard(
      document.querySelector('[data-case-next]'),
      data.next,
      t.nextKicker,
      t.nextDisabledTitle,
      t.nextDisabledMeta
    );

    // Legacy fallback — older [data-case-next-href]/[data-case-next-title]
    if (data.next && data.next.slug) {
      document.querySelectorAll('[data-case-next-href]').forEach(function (el) {
        el.setAttribute('href', './' + data.next.slug + '.html');
      });
      document.querySelectorAll('[data-case-next-title]').forEach(function (el) {
        var title = pickLocalized(data.next.title);
        if (title) el.innerHTML = title;
      });
    }
  }

  // Block navigation on aria-disabled anchors (used in outro nav fallback)
  document.querySelectorAll('a[aria-disabled="true"]').forEach(function (link) {
    link.addEventListener('click', function (event) { event.preventDefault(); });
  });

  function applyNavCard(el, payload, kicker, fallbackTitle, fallbackMeta) {
    if (!el) return;
    var kickerEl = el.querySelector('.outro__navKicker');
    var titleEl  = el.querySelector('.outro__navTitle');
    var metaEl   = el.querySelector('.outro__navMeta');

    if (payload && payload.slug) {
      // Relative href works in both /works/ and /en/works/
      el.setAttribute('href', './' + payload.slug + '.html');
      el.classList.remove('outro__navItem--disabled');
      el.removeAttribute('aria-disabled');
      if (kickerEl) kickerEl.innerHTML = kicker;
      var title = pickLocalized(payload.title);
      var meta  = pickLocalized(payload.meta);
      if (titleEl && title) titleEl.innerHTML = title;
      if (metaEl  && meta)  metaEl.innerHTML  = meta;
      if (payload.image) el.style.setProperty('--next-image', "url('" + payload.image + "')");
    }
    /* Null payload: leave the disabled fallback baked into HTML. */
  }

  // ============ COUNTERS ============
  var counters = document.querySelectorAll('[data-counter]');
  if (capture && counters.length) {
    counters.forEach(function (el) {
      el.textContent = Number(el.dataset.counter || 0) + (el.dataset.counterSuffix || '');
    });
  }
  if (!capture && counters.length && 'IntersectionObserver' in window) {
    var animateCounter = function (el) {
      var target = Number(el.dataset.counter || 0);
      var suffix = el.dataset.counterSuffix || '';
      if (reduced) {
        el.textContent = target + suffix;
        return;
      }
      var duration = 1400;
      var start = performance.now();
      var tick = function (now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };

    var counterObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  // ============ PARALLAX ============
  if (!reduced) {
    var parallaxItems = document.querySelectorAll('[data-parallax]');
    if (parallaxItems.length) {
      var ticking = false;
      var viewportH = window.innerHeight;

      var update = function () {
        ticking = false;
        for (var i = 0; i < parallaxItems.length; i++) {
          var item = parallaxItems[i];
          var speed = Number(item.dataset.parallax || 0.06);
          var rect = item.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > viewportH) continue;
          var center = rect.top + rect.height / 2;
          var delta = (center - viewportH / 2) * speed * -0.12;
          item.style.setProperty('--parallax-offset', delta.toFixed(2) + 'px');
        }
      };

      var requestTick = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };

      update();
      window.addEventListener('scroll', requestTick, { passive: true });
      window.addEventListener('resize', function () {
        viewportH = window.innerHeight;
        requestTick();
      });
    }
  }
})();
