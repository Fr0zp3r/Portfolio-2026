(() => {
  'use strict';

  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const navLinks = Array.from(document.querySelectorAll('.nav__menu a'));

  if (navLinks.length) {
    const linkTargets = navLinks
      .map(link => {
        const hash = link.getAttribute('href') || '';
        if (!hash.startsWith('#')) return null;
        const el = document.getElementById(hash.slice(1));
        return el ? { link, el } : null;
      })
      .filter(Boolean);

    const setActive = (link) => {
      navLinks.forEach(l => {
        const isActive = l === link;
        l.classList.toggle('active', isActive);
        if (isActive) {
          l.setAttribute('aria-current', 'true');
        } else {
          l.removeAttribute('aria-current');
        }
      });
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const anchor = window.scrollY + window.innerHeight * 0.28;
      let active = linkTargets[0];

      for (let i = 0; i < linkTargets.length; i++) {
        const rect = linkTargets[i].el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (top <= anchor) active = linkTargets[i];
      }

      if (active) setActive(active.link);
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
  }

  const burger = document.querySelector('.nav__burger');
  const drawer = document.getElementById('mobile-drawer');
  if (!burger || !drawer) return;

  const inertTargets = Array.from(document.querySelectorAll('[data-drawer-inert-target]'));
  const drawerLinks = Array.from(drawer.querySelectorAll('a'));
  const drawerCloseButtons = Array.from(drawer.querySelectorAll('[data-drawer-close]'));
  let lastFocused = null;

  const getDrawerFocusables = () => (
    Array.from(drawer.querySelectorAll(focusableSelector)).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== 'hidden';
    })
  );

  const setBackgroundInert = (open) => {
    inertTargets.forEach(target => {
      if (open) {
        target.setAttribute('inert', '');
      } else {
        target.removeAttribute('inert');
      }
    });
  };

  const focusTargetFromHash = (hash) => {
    if (!hash || hash === '#') return;

    const target = document.querySelector(hash);
    if (!target) return;

    const heading = target.querySelector('h1, h2, h3') || target;
    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1');
      heading.dataset.tempFocusTarget = 'true';
    }

    heading.focus({ preventScroll: true });

    if (heading.dataset.tempFocusTarget === 'true') {
      heading.addEventListener('blur', () => {
        heading.removeAttribute('tabindex');
        delete heading.dataset.tempFocusTarget;
      }, { once: true });
    }
  };

  const setDrawer = (open, options = {}) => {
    const { returnFocus = true, focusDrawer = true } = options;
    const isOpen = document.body.classList.contains('drawer-open');
    if (open === isOpen) return;

    if (open) {
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    document.body.classList.toggle('drawer-open', open);
    burger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    setBackgroundInert(open);

    if (open && focusDrawer) {
      window.requestAnimationFrame(() => {
        const first = getDrawerFocusables()[0];
        if (first) first.focus();
      });
    }

    if (!open && returnFocus) {
      const target = lastFocused && document.contains(lastFocused) ? lastFocused : burger;
      target.focus();
      lastFocused = null;
    }

    window.dispatchEvent(new CustomEvent('drawerchange', { detail: { open } }));
  };

  burger.addEventListener('click', () => {
    setDrawer(!document.body.classList.contains('drawer-open'));
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      const isLocalHash = href.startsWith('#');
      setDrawer(false, { returnFocus: false });
      if (isLocalHash) {
        window.requestAnimationFrame(() => focusTargetFromHash(href));
      }
    });
  });

  drawerCloseButtons.forEach(button => {
    button.addEventListener('click', () => setDrawer(false));
  });

  document.addEventListener('keydown', (event) => {
    if (!document.body.classList.contains('drawer-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setDrawer(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getDrawerFocusables();
    if (!focusables.length) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!drawer.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
