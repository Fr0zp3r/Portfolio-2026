(() => {
  const SUPPORTED_LANGS = ['es', 'en'];
  const FALLBACK_LANG = 'es';
  const FADE_MS = 120;
  const dictionaryCache = {};

  let currentLang = FALLBACK_LANG;
  let hasAppliedLang = false;

  const readStoredLang = () => {
    try {
      return localStorage.getItem('lang');
    } catch (error) {
      return null;
    }
  };

  const storedLang = readStoredLang();
  const browserLang = navigator.language || '';
  const initialLang = storedLang || (browserLang.startsWith('en') ? 'en' : 'es');

  const normalizeLang = (lang) => (
    SUPPORTED_LANGS.includes(lang) ? lang : FALLBACK_LANG
  );

  const wait = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));

  const fetchDictionary = async (lang) => {
    if (dictionaryCache[lang]) return dictionaryCache[lang];

    const scriptUrl = document.currentScript ? document.currentScript.src : window.location.href;
    const paths = [new URL(`../content/${lang}.json`, scriptUrl).href];
    let lastError;

    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        dictionaryCache[lang] = await response.json();
        return dictionaryCache[lang];
      } catch (error) {
        lastError = error;
      }
    }

    console.error(`Could not load i18n dictionary for "${lang}".`, lastError);
    dictionaryCache[lang] = {};
    return dictionaryCache[lang];
  };

  const dictionariesReady = Promise.all(
    SUPPORTED_LANGS.map(lang => fetchDictionary(lang))
  );

  const getTranslation = (key, lang = currentLang) => {
    const dictionary = dictionaryCache[lang] || {};
    const fallback = dictionaryCache[FALLBACK_LANG] || {};
    return dictionary[key] ?? fallback[key] ?? null;
  };

  const setAttributeTranslations = (lang) => {
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const pairs = element.dataset.i18nAttr.split(',');

      pairs.forEach(pair => {
        const [attribute, key] = pair.split(':').map(part => part.trim());
        if (!attribute || !key) return;

        const value = getTranslation(key, lang);
        if (value !== null) {
          element.setAttribute(attribute, value);
        }
      });
    });
  };

  const setTextTranslations = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = getTranslation(element.dataset.i18n, lang);
      if (value !== null) {
        element.innerHTML = value;
      }
    });
  };

  const setMeta = (selector, key, lang) => {
    const element = document.querySelector(selector);
    const value = getTranslation(key, lang);
    if (element && value !== null) {
      element.setAttribute('content', value);
    }
  };

  const setMetaTranslations = (lang) => {
    setMeta('meta[name="description"]', 'meta.description', lang);
    setMeta('meta[property="og:description"]', 'meta.ogDescription', lang);
    setMeta('meta[property="og:title"]', 'meta.ogTitle', lang);
    setMeta('meta[property="og:locale"]', 'meta.ogLocale', lang);
  };

  const setLangToggleState = (lang) => {
    document.querySelectorAll('.nav__lang [data-lang]').forEach(option => {
      const isActive = option.dataset.lang === lang;
      option.classList.toggle('on', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    });
  };

  const setDynamicLabels = (lang) => {
    const burger = document.querySelector('.nav__burger');
    if (!burger) return;

    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    const key = isOpen ? 'nav.burger.close' : 'nav.burger.open';
    const label = getTranslation(key, lang);

    if (label !== null) {
      burger.setAttribute('aria-label', label);
    }
  };

  const applyTranslations = (lang) => {
    document.documentElement.lang = lang;
    setTextTranslations(lang);
    setAttributeTranslations(lang);
    setMetaTranslations(lang);
    setLangToggleState(lang);
    setDynamicLabels(lang);
  };

  const persistLang = (lang) => {
    try {
      localStorage.setItem('lang', lang);
    } catch (error) {
      // Browsers can block storage in strict privacy modes.
    }
  };

  const shouldFadeMain = (nextLang) => {
    const main = document.querySelector('main');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return Boolean(main && hasAppliedLang && currentLang !== nextLang && !prefersReducedMotion && !window.PORTFOLIO_CAPTURE_MODE);
  };

  const setLang = async (lang) => {
    const nextLang = normalizeLang(lang);

    await dictionariesReady;

    if (hasAppliedLang && currentLang === nextLang) {
      setLangToggleState(nextLang);
      setDynamicLabels(nextLang);
      return nextLang;
    }

    const main = document.querySelector('main');
    const fadeMain = shouldFadeMain(nextLang);

    if (fadeMain) {
      main.classList.add('is-lang-fading');
      await wait(FADE_MS);
    }

    currentLang = nextLang;
    applyTranslations(nextLang);
    persistLang(nextLang);
    hasAppliedLang = true;

    if (fadeMain) {
      requestAnimationFrame(() => main.classList.remove('is-lang-fading'));
      await wait(FADE_MS);
    }

    window.dispatchEvent(new CustomEvent('langchange', {
      detail: { lang: nextLang }
    }));

    return nextLang;
  };

  const bindLanguageToggle = () => {
    document.querySelectorAll('.nav__lang [data-lang]').forEach(option => {
      const activate = () => window.setLang(option.dataset.lang);

      option.addEventListener('click', activate);

      if (option.tagName !== 'BUTTON') {
        option.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate();
          }
        });
      }
    });
  };

  window.setLang = setLang;
  window.i18n = {
    ready: dictionariesReady.then(() => setLang(initialLang)),
    setLang,
    t: getTranslation,
    get lang() {
      return currentLang;
    }
  };

  bindLanguageToggle();
  window.addEventListener('drawerchange', () => setDynamicLabels(currentLang));
})();
