(function () {
  'use strict';

  var items = [].slice.call(document.querySelectorAll('[data-lightbox]'));
  if (!items.length) return;

  if (window.PORTFOLIO_CAPTURE_MODE) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  var lb = document.getElementById('lightbox');
  if (!lb) {
    lb = buildLightbox();
    document.body.appendChild(lb);
  }

  var img = lb.querySelector('.lightbox__img');
  var caption = lb.querySelector('.lightbox__caption');
  var count = lb.querySelector('.lightbox__count');
  var stage = lb.querySelector('.lightbox__stage');

  var idx = 0;
  var zoom = 1;
  var tx = 0;
  var ty = 0;
  var dragging = false;
  var dragStart = null;
  var lastFocus = null;
  var inertStates = [];

  function pad(n) { return String(n).padStart(2, '0'); }

  function applyTransform() {
    img.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + zoom + ')';
  }

  function resetZoom() {
    zoom = 1; tx = 0; ty = 0;
    img.style.transform = '';
    stage.classList.remove('is-zoomed', 'is-panning');
  }

  function render() {
    var el = items[idx];
    var source = el.querySelector('img');
    if (source) {
      img.src = source.currentSrc || source.src;
      img.alt = source.alt || '';
    }
    caption.innerHTML = el.dataset.caption || '';
    count.textContent = pad(idx + 1) + ' / ' + pad(items.length);
    resetZoom();
  }

  function open(i) {
    idx = i;
    lastFocus = document.activeElement;
    render();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    setBackgroundInert(true);
    window.requestAnimationFrame(function () {
      lb.querySelector('.lightbox__close').focus();
    });
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    setBackgroundInert(false);
    resetZoom();
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  function next() { idx = (idx + 1) % items.length; render(); }
  function prev() { idx = (idx - 1 + items.length) % items.length; render(); }

  function getLightboxFocusables() {
    return [].slice.call(lb.querySelectorAll(focusableSelector)).filter(function (el) {
      var rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== 'hidden';
    });
  }

  function setBackgroundInert(open) {
    if (open) {
      inertStates = [].slice.call(document.body.children).map(function (el) {
        return { el: el, inert: el.hasAttribute('inert') };
      });

      inertStates.forEach(function (item) {
        if (item.el !== lb) item.el.setAttribute('inert', '');
      });
      return;
    }

    inertStates.forEach(function (item) {
      if (!item.inert) item.el.removeAttribute('inert');
    });
    inertStates = [];
  }

  items.forEach(function (el, i) {
    if (!el.getAttribute('role')) el.setAttribute('role', 'button');
    if (!el.getAttribute('tabindex')) el.setAttribute('tabindex', '0');

    if (!el.querySelector('.media__zoom')) {
      var affordance = document.createElement('span');
      affordance.className = 'media__zoom';
      affordance.setAttribute('aria-hidden', 'true');
      affordance.innerHTML = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
      el.appendChild(affordance);
    }

    el.addEventListener('click', function (e) {
      if (e.target.closest('a:not(.media__zoom)')) return;
      e.preventDefault();
      open(i);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__next').addEventListener('click', next);
  lb.querySelector('.lightbox__prev').addEventListener('click', prev);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
      return;
    }
    if (e.key !== 'Tab') return;

    var focusables = getLightboxFocusables();
    if (!focusables.length) {
      e.preventDefault();
      return;
    }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (!lb.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
      return;
    }

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
      return;
    }

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  stage.addEventListener('click', function (e) {
    if (e.target === stage) {
      close();
      return;
    }
    if (e.target !== img) return;
    if (zoom === 1) {
      var rect = img.getBoundingClientRect();
      var cx = e.clientX - rect.left - rect.width / 2;
      var cy = e.clientY - rect.top - rect.height / 2;
      zoom = 2.2;
      tx = -cx * 1.1;
      ty = -cy * 1.1;
      stage.classList.add('is-zoomed');
    } else {
      resetZoom();
      return;
    }
    applyTransform();
  });

  img.addEventListener('pointerdown', function (e) {
    if (zoom === 1) return;
    dragging = true;
    dragStart = { x: e.clientX - tx, y: e.clientY - ty };
    stage.classList.add('is-panning');
    try { img.setPointerCapture(e.pointerId); } catch (err) {}
  });
  img.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    tx = e.clientX - dragStart.x;
    ty = e.clientY - dragStart.y;
    applyTransform();
  });
  function endDrag(e) {
    dragging = false;
    stage.classList.remove('is-panning');
    try { if (e && e.pointerId != null) img.releasePointerCapture(e.pointerId); } catch (err) {}
  }
  img.addEventListener('pointerup', endDrag);
  img.addEventListener('pointercancel', endDrag);

  stage.addEventListener('wheel', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (reduced) return;
    e.preventDefault();
    var delta = -Math.sign(e.deltaY) * 0.18;
    var nextZoom = Math.max(1, Math.min(4, zoom + delta));
    if (nextZoom === zoom) return;
    zoom = nextZoom;
    if (zoom === 1) resetZoom();
    else {
      stage.classList.add('is-zoomed');
      applyTransform();
    }
  }, { passive: false });

  var touchStartX = null;
  lb.addEventListener('touchstart', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (zoom !== 1) return;
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchStartX == null) return;
    var dx = (e.changedTouches[0].clientX) - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 60) return;
    if (dx < 0) next(); else prev();
  });

  function buildLightbox() {
    var el = document.createElement('div');
    el.className = 'lightbox';
    el.id = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('aria-label', 'Visor ampliado');
    el.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Cerrar visor">' +
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<div class="lightbox__stage">' +
        '<img class="lightbox__img" alt="" decoding="async">' +
      '</div>' +
      '<div class="lightbox__bar">' +
        '<div class="lightbox__caption"></div>' +
        '<div class="lightbox__nav">' +
          '<button class="lightbox__prev" type="button" aria-label="Anterior">' +
            '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
          '<span class="lightbox__count" aria-live="polite">01 / 01</span>' +
          '<button class="lightbox__next" type="button" aria-label="Siguiente">' +
            '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    return el;
  }
})();
