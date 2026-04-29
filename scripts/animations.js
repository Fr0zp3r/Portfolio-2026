(function () {
  'use strict';

  const capture = !!window.PORTFOLIO_CAPTURE_MODE;

  document.documentElement.classList.add('hero-started');

  const reduced = capture || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (capture) {
    runStaticInit();
    return;
  }

  initNavState();
  initScrollProgress();
  initSectionPinRail();

  if (typeof gsap === 'undefined') {
    releaseHeroFallback();
    return;
  }

  if (!reduced) {
    initCustomCursor();
    initMagneticTargets();
    initScrambleHover();
  }

  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  function runReducedInit() {
    splitHeroWords();
    gsap.set('.hero__title .word, .case-hero__title .word', { y: 0, autoAlpha: 1 });
    gsap.set('.hero__top, .hero__bottom, .index__cell, .case-hero__metaBar, .case-hero__head, .case-hero__eyebrow, .case-hero__manifesto, .case-hero__keydata, .heroCard, .case-hero__media, .reveal, .mini-piece', { autoAlpha: 1, y: 0, clearProps: 'clipPath' });

    window.addEventListener('langchange', resetSplitTitle);

    if (hasScrollTrigger) {
      window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    }
  }

  function runFullInit() {
    initHero();

    if (!hasScrollTrigger) return;

    // Hero gets first paint priority; scroll inits run next frame
    window.requestAnimationFrame(function () {
      initScrollReveals();
      initWorkReveals();
      initMiniGallery();
      initCaseMediaReveals();
      initCounters();
      initParallax();
      initStrike();
      initLangChange();

      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
      }

      // Lazy media can shift layout; debounce refreshes so image decode does not
      // fight the scroll thread while a media-heavy case page is settling.
      var refreshScheduled = false;
      var refreshTimer = null;
      var scheduleRefresh = function () {
        if (refreshScheduled) return;
        refreshScheduled = true;
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(function () {
          refreshScheduled = false;
          requestAnimationFrame(function () { ScrollTrigger.refresh(); });
        }, 140);
      };
      Array.prototype.forEach.call(document.images, function (img) {
        if (img.complete) return;
        img.addEventListener('load', scheduleRefresh, { once: true });
        img.addEventListener('error', scheduleRefresh, { once: true });
      });

      // Safety net: keep it temporary; observing body forever can cause jank on
      // pages with many animated sections.
      if (typeof ResizeObserver === 'function') {
        var ro = new ResizeObserver(scheduleRefresh);
        ro.observe(document.body);
        window.addEventListener('load', function () {
          setTimeout(function () { ro.disconnect(); }, 1800);
        }, { once: true });
      }
    });
  }

  function boot() {
    if (reduced) runReducedInit();
    else runFullInit();
  }

  if (document.body.dataset.case) {
    var booted = false;
    var fire = function () { if (booted) return; booted = true; boot(); };
    window.addEventListener('casehydrated', fire, { once: true });
    setTimeout(fire, 500);
  } else {
    boot();
  }

  function splitHeroWords() {
    var title = document.querySelector('.hero__title, .case-hero__title');
    if (!title) return [];

    if (title.querySelector('.word-mask .word')) {
      title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
      title.dataset.split = 'words';
      return gsap.utils.toArray(title.querySelectorAll('.word'));
    }

    if (!title.dataset.originalHtml) {
      title.dataset.originalHtml = title.innerHTML;
      title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
    }

    var parts = title.dataset.originalHtml.split(/<br\s*\/?>/i);
    title.innerHTML = '';

    parts.forEach(function (part, index) {
      if (index > 0) title.appendChild(document.createElement('br'));

      var mask = document.createElement('span');
      var word = document.createElement('span');

      mask.className = 'word-mask';
      mask.setAttribute('aria-hidden', 'true');
      word.className = 'word';
      word.innerHTML = part.trim();

      mask.appendChild(word);
      title.appendChild(mask);
    });

    title.dataset.split = 'words';
    return gsap.utils.toArray(title.querySelectorAll('.word'));
  }

  function initHero() {
    var isCase = !!document.querySelector('.case-hero');
    var words = splitHeroWords();
    var compactMotion = window.matchMedia('(max-width: 900px)').matches;

    if (isCase) {
      var caseIntro = ['.case-hero__metaBar', '.case-hero__eyebrow', '.case-hero__manifesto', '.case-hero__keydata', '.heroCard', '.case-hero__media'];
      var intro = caseIntro.filter(function (s) { return document.querySelector(s); });
      gsap.set(intro, { autoAlpha: 0, y: compactMotion ? 14 : 24 });
      gsap.set(words, { y: '116%', autoAlpha: 0 });

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.case-hero__metaBar', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.42 : 0.58 });
      if (document.querySelector('.case-hero__eyebrow')) {
        tl.to('.case-hero__eyebrow', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.34 : 0.42 }, '-=0.18');
      }
      tl.to(words, {
        y: 0,
        autoAlpha: 1,
        duration: compactMotion ? 0.72 : 0.96,
        ease: 'expo.out',
        stagger: compactMotion ? 0.035 : 0.055
      }, compactMotion ? '-=0.08' : '-=0.04');
      if (document.querySelector('.case-hero__manifesto')) {
        tl.to('.case-hero__manifesto', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.44 : 0.58 }, '-=0.22');
      }
      if (document.querySelector('.case-hero__keydata')) {
        tl.to('.case-hero__keydata', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.34 : 0.44 }, '-=0.28');
      }
      if (document.querySelector('.heroCard')) {
        tl.to('.heroCard', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.42 : 0.56 }, compactMotion ? '-=0.12' : '-=0.06');
      }
      if (document.querySelector('.case-hero__media')) {
        tl.to('.case-hero__media', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.48 : 0.62 }, '-=0.08');
      }
      tl.call(function () { document.documentElement.classList.add('hero-intro-complete'); });
      return;
    }

    gsap.set('.hero__top, .hero__bottom', { autoAlpha: 0, y: compactMotion ? 14 : 24 });
    gsap.set('.index__cell', { autoAlpha: 0, y: compactMotion ? 10 : 16 });
    gsap.set(words, { y: '116%', autoAlpha: 0 });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__top', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.46 : 0.68 })
      .to(words, {
        y: 0,
        autoAlpha: 1,
        duration: compactMotion ? 0.82 : 1.08,
        ease: 'expo.out',
        stagger: compactMotion ? 0.045 : 0.075
      }, '-=0.28')
      .to('.hero__bottom', { autoAlpha: 1, y: 0, duration: compactMotion ? 0.55 : 0.82 }, '-=0.62')
      .to('.index__cell', {
        autoAlpha: 1,
        y: 0,
        duration: compactMotion ? 0.36 : 0.5,
        stagger: compactMotion ? 0.025 : 0.045
      }, '-=0.36')
      .call(function () { document.documentElement.classList.add('hero-intro-complete'); });
  }

  function releaseHeroFallback() {
    document.documentElement.classList.add('hero-fallback');
  }

  function runStaticInit() {
    releaseHeroFallback();

    document.querySelectorAll('.reveal, .hero__top, .hero__bottom, .case-hero__metaBar, .case-hero__head, .case-hero__eyebrow, .case-hero__manifesto, .case-hero__keydata, .heroCard, .case-hero__media').forEach(function (el) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });

    document.querySelectorAll('.hero__title .word, .case-hero__title .word, .work__visual, .work__visual img, .parallax').forEach(function (el) {
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });

    document.querySelectorAll('.index__cell strong').forEach(function (el) {
      el.textContent = el.textContent.trim();
    });

    document.querySelectorAll('.strike__line').forEach(function (el) {
      el.style.transform = 'scaleX(1)';
    });
  }

  function resetSplitTitle() {
    var words = splitHeroWords();
    if (words.length) gsap.set(words, { y: 0, autoAlpha: 1 });
    if (hasScrollTrigger) ScrollTrigger.refresh();
  }

  function initScrollReveals() {
    var els = gsap.utils.toArray('.reveal').filter(function (el) {
      return !el.closest('.hero') && !el.closest('.case-hero');
    });
    if (!els.length) return;

    var compactMotion = window.matchMedia('(max-width: 900px)').matches;
    var vp = window.innerHeight;

    // Batch-read all rects before any GSAP writes to avoid layout thrashing
    var rects = els.map(function (el) { return el.getBoundingClientRect(); });

    els.forEach(function (el, index) {
      // Elements already at or past the trigger threshold don't need initial hiding
      if (rects[index].top < vp * 0.87) return;

      var children = el.querySelectorAll(':scope > .reveal-child');
      var delay = compactMotion ? 0 : (index % 4) * 0.045;

      if (children.length) {
        gsap.from(children, {
          opacity: 0,
          y: compactMotion ? 12 : 20,
          duration: compactMotion ? 0.48 : 0.72,
          delay: delay,
          ease: 'power2.out',
          stagger: compactMotion ? 0.035 : 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      } else {
        gsap.from(el, {
          opacity: 0,
          y: compactMotion ? 12 : 20,
          duration: compactMotion ? 0.48 : 0.72,
          delay: delay,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      }
    });
  }

  function initCounters() {
    document.querySelectorAll('.index__cell strong').forEach(function (el) {
      var text = el.textContent.trim();
      var match = text.match(/^(\d+)(\+?)$/);
      if (!match) return;

      var rawNumber = match[1];
      var target = parseInt(rawNumber, 10);
      var suffix = match[2] || '';
      var pad = rawNumber.length > 1 && rawNumber.charAt(0) === '0' ? rawNumber.length : 0;
      var obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 1.25,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: function () {
          var value = String(Math.round(obj.val));
          el.textContent = (pad ? value.padStart(pad, '0') : value) + suffix;
        }
      });
    });

  }

  function initMiniGallery() {
    var grid = document.querySelector('.mini-gallery__grid');
    if (!grid) return;
    var pieces = gsap.utils.toArray(grid.querySelectorAll('.mini-piece'));
    if (!pieces.length) return;

    var compactMotion = window.matchMedia('(max-width: 900px)').matches;
    gsap.from(pieces, {
      opacity: 0,
      y: compactMotion ? 10 : 16,
      duration: compactMotion ? 0.38 : 0.52,
      ease: 'power2.out',
      stagger: compactMotion ? 0.035 : 0.055,
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
    });
  }

  function initWorkReveals() {
    document.querySelectorAll('.work__visual').forEach(function (el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 0 100% 0)', y: 10 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 0.92,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true }
        }
      );
    });
  }

  function initCaseMediaReveals() {
    var media = gsap.utils.toArray('.case-hero .media, .chapter .media, .fullBleed').filter(function (el) {
      return !el.closest('.case-hero__media');
    });
    if (!media.length) return;

    var compactMedia = window.matchMedia('(max-width: 900px)').matches;
    var vpMedia = window.innerHeight;

    // Batch-read rects before GSAP writes to prevent layout thrashing
    var mediaRects = media.map(function (el) { return el.getBoundingClientRect(); });

    media.forEach(function (el, i) {
      // Skip elements already visible — don't clip content the user can already see
      if (mediaRects[i].top < vpMedia * 0.88) return;

      gsap.fromTo(el,
        { autoAlpha: 0.88, clipPath: 'inset(6% 0 6% 0)', scale: compactMedia ? 1 : 1.03 },
        {
          autoAlpha: 1,
          clipPath: 'inset(0% 0 0% 0)',
          scale: 1,
          duration: compactMedia ? 0.68 : 0.88,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }
      );
    });
  }

  function initParallax() {
    document.querySelectorAll('.work__visual img').forEach(function (img) {
      gsap.set(img, { scale: 1.08, transformOrigin: 'center center', force3D: true });

      gsap.fromTo(img,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.work__visual'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        }
      );
    });
  }

  function initStrike() {
    var line = document.querySelector('.strike__line');
    if (!line) return;

    gsap.to(line, {
      scaleX: 1,
      duration: 0.7,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.strike', start: 'top 80%', once: true }
    });
  }

  function initLangChange() {
    window.addEventListener('langchange', resetSplitTitle);
  }

  function initScrollProgress() {
    var progress = document.querySelector('.progress');
    var ticking = false;

    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.prepend(progress);
    }

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var value = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = 'scaleX(' + Math.max(0, Math.min(1, value)).toFixed(4) + ')';
      ticking = false;
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
  }

  function initNavState() {
    var ticking = false;
    var nav = document.querySelector('.nav');
    if (!nav) return;

    function update() {
      document.documentElement.classList.toggle('nav-scrolled', window.scrollY > 18);
      ticking = false;
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
  }

  function initCustomCursor() {
    if (!finePointer) return;

    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'cursor-dot is-hidden';
      dot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'cursor-ring is-hidden';
      ring.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ring);
    }

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    var setDotX = gsap.quickSetter(dot, 'x', 'px');
    var setDotY = gsap.quickSetter(dot, 'y', 'px');
    var setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    var setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    document.addEventListener('pointermove', function (event) {
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
      setDotX(event.clientX);
      setDotY(event.clientY);
      setRingX(event.clientX);
      setRingY(event.clientY);
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    });

    document.querySelectorAll('a, button, [role="button"], .work').forEach(function (el) {
      el.addEventListener('pointerenter', function () { ring.classList.add('is-hover'); });
      el.addEventListener('pointerleave', function () { ring.classList.remove('is-hover'); });
    });
  }

  function initMagneticTargets() {
    if (!finePointer) return;

    var targets = gsap.utils.toArray([
      '.nav__cta',
      '.archive__link',
      '.contact__email',
      '.outro__next',
      '.outro__cta',
      '.outro__back',
      '.case-close',
      '.foot__button',
      '[data-magnetic]'
    ].join(',')).filter(function (el, index, list) {
      return list.indexOf(el) === index;
    });
    if (!targets.length) return;

    var radius = 120;
    var maxShift = 8;
    var setters = targets.map(function (el) {
      return {
        el: el,
        x: gsap.quickTo(el, 'x', { duration: 0.32, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.32, ease: 'power3.out' })
      };
    });

    document.addEventListener('pointermove', function (event) {
      setters.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var dx = event.clientX - centerX;
        var dy = event.clientY - centerY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          var strength = (1 - distance / radius) * maxShift;
          var safeDistance = distance || 1;
          item.x((dx / safeDistance) * strength);
          item.y((dy / safeDistance) * strength);
        } else {
          item.x(0);
          item.y(0);
        }
      });
    }, { passive: true });

    window.addEventListener('blur', function () {
      setters.forEach(function (item) {
        item.x(0);
        item.y(0);
      });
    });
  }

  function initScrambleHover() {
    var chars = '·/:§—';
    var selector = [
      '.work__cta:not(.work__cta--disabled) span',
      '.archive__link span',
      '.outro__cta',
      '.outro__back'
    ].join(',');

    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('pointerenter', function () { scramble(el); });
      el.addEventListener('focus', function () { scramble(el); });
    });

    function scramble(el) {
      if (el.dataset.scrambling === 'true') return;

      var original = el.textContent;
      var letters = Array.from(original);
      var start = performance.now();
      var duration = 180;

      if (!original.trim()) return;
      el.dataset.scrambling = 'true';

      function frame(now) {
        var progress = Math.min(1, (now - start) / duration);

        el.textContent = letters.map(function (letter, index) {
          if (/\s/.test(letter)) return letter;
          var settlePoint = (index / Math.max(letters.length - 1, 1)) * 0.65;
          return progress > settlePoint + 0.28
            ? letter
            : chars.charAt(Math.floor(Math.random() * chars.length));
        }).join('');

        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          el.textContent = original;
          delete el.dataset.scrambling;
        }
      }

      window.requestAnimationFrame(frame);
    }
  }

  function initSectionPinRail() {
    var labels = [];
    var rail = document.querySelector('.section-pin');
    var ticking = false;

    document.querySelectorAll('.s-head__tag, .contact__tag').forEach(function (tag) {
      var label = getSectionLabel(tag.textContent);
      var scope = tag.closest('.works, .contact') || tag.closest('.s-head');
      var next = scope && scope.classList.contains('s-head') ? scope.nextElementSibling : null;

      if (!label || !scope) return;

      labels.push({ el: scope, label: label, dark: scope.classList.contains('contact'), source: tag });

      if (next && !next.classList.contains('s-head')) {
        labels.push({ el: next, label: label, dark: false, source: tag });
      }
    });

    // Case-study labels
    var caseHero = document.querySelector('.case-hero');
    if (caseHero) {
      var caseEyebrow = caseHero.querySelector('.case-hero__eyebrow');
      var caseHeroLabel = caseEyebrow ? getSectionLabel(caseEyebrow.textContent) : null;
      if (caseHeroLabel) {
        labels.push({ el: caseHero, label: caseHeroLabel, dark: false, source: caseEyebrow });
      }
    }

    document.querySelectorAll('.sectionHead').forEach(function (head) {
      var tag = head.querySelector('.label');
      if (!tag) return;
      var label = getSectionLabel(tag.textContent);
      if (!label) return;
      var next = head.nextElementSibling;
      labels.push({ el: head, label: label, dark: false, source: tag });
      while (next && !next.classList.contains('sectionHead')) {
        var isDark = next.classList && (
          next.classList.contains('caseInterlude') ||
          next.classList.contains('outro') ||
          (next.classList.contains('fullBleed') && !next.classList.contains('fullBleed--light'))
        );
        labels.push({ el: next, label: label, dark: !!isDark, source: tag });
        next = next.nextElementSibling;
      }
    });

    document.querySelectorAll('.credits').forEach(function (el) {
      var tag = el.querySelector('.label');
      var label = tag ? getSectionLabel(tag.textContent) : null;
      if (label) labels.push({ el: el, label: label, dark: false, source: tag });
    });

    document.querySelectorAll('.outro').forEach(function (el) {
      var meta = el.querySelector('.outro__meta');
      var label = meta ? getSectionLabel(meta.textContent) : null;
      if (label) labels.push({ el: el, label: label, dark: true, source: meta });
    });

    if (!labels.length) return;

    if (!rail) {
      rail = document.createElement('div');
      rail.className = 'section-pin';
      rail.setAttribute('aria-hidden', 'true');
      document.body.appendChild(rail);
    }

    function update() {
      var anchor = window.innerHeight * 0.48;
      var active = null;

      labels.some(function (item) {
        var rect = item.el.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom >= anchor) {
          active = item;
          return true;
        }
        return false;
      });

      if (active) {
        rail.textContent = active.label;
        rail.classList.add('is-visible');
        rail.classList.toggle('is-dark', active.dark);
      } else {
        rail.classList.remove('is-visible', 'is-dark');
      }

      ticking = false;
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    function refreshLabels() {
      labels.forEach(function (item) {
        var label = item.source ? getSectionLabel(item.source.textContent) : null;
        if (label) item.label = label;
      });
      requestTick();
    }

    window.addEventListener('langchange', refreshLabels);
    window.addEventListener('casehydrated', refreshLabels);
  }

  function getSectionLabel(text) {
    var normalized = text.replace(/\s+/g, ' ').trim();
    var match = normalized.match(/\u00A7\s*\d+(?:\s*(?:\u2014|-)\s*[^\u00B7|/]+)?/);
    return match ? match[0].replace(/\s+/g, ' ').trim() : null;
  }
})();
