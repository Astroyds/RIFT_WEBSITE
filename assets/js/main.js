(() => {
  const root = document.documentElement;
  const THEME_KEY = 'rift-theme';

  const applyTheme = (theme) => {
    const finalTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', finalTheme);
    localStorage.setItem(THEME_KEY, finalTheme);
  };

  const initTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return applyTheme(stored);
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const initThemeToggle = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    });
  };

  const initReveal = () => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  };

  const initSmooth = () => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const initActiveNav = () => {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.getAttribute('href') === current) a.classList.add('nav-active');
    });
  };

  const initCopyButtons = () => {
    document.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const code = document.querySelector(btn.getAttribute('data-copy'));
        if (!code) return;
        await navigator.clipboard.writeText(code.textContent.trim());
        const old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = old, 1400);
      });
    });
  };

  const typeInto = (el, text, speed = 20) => {
    if (!el) return;
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i);
      i += 1;
      if (i <= text.length) setTimeout(tick, speed);
    };
    tick();
  };

  const initInstallTyping = () => {
    const host = document.querySelector('[data-install-typing]');
    if (!host || !window.RIFT_DATA) return;
    typeInto(host, window.RIFT_DATA.install.installCmd, 16);
  };

  const initParallax = () => {
    const targets = [...document.querySelectorAll('[data-parallax]')];
    if (!targets.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      targets.forEach((el) => {
        const speed = Number(el.getAttribute('data-parallax')) || 0.08;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    }, { passive: true });
  };

  const computeMetrics = (snippet) => {
    const lines = snippet.trim().split('\n').length;
    const chars = snippet.length;
    return { lines, chars };
  };

  const updateHash = (task, language) => {
    const h = new URLSearchParams({ task, language });
    location.hash = h.toString();
  };

  const parseHash = () => {
    const raw = location.hash.replace('#', '');
    const p = new URLSearchParams(raw);
    return { task: p.get('task'), language: p.get('language') };
  };

  const initCompare = () => {
    const wrap = document.querySelector('[data-compare-app]');
    if (!wrap || !window.RIFT_DATA) return;
    const data = window.RIFT_DATA.compare;
    const taskSel = wrap.querySelector('#taskSelect');
    const langSel = wrap.querySelector('#languageSelect');
    const left = wrap.querySelector('#riftCode');
    const right = wrap.querySelector('#otherCode');
    const table = wrap.querySelector('#metricRows');

    data.tasks.forEach((t) => taskSel.insertAdjacentHTML('beforeend', `<option value="${t.id}">${t.name}</option>`));
    data.languages.filter((l) => l !== 'RIFT').forEach((l) => langSel.insertAdjacentHTML('beforeend', `<option value="${l}">${l}</option>`));

    const draw = () => {
      const task = taskSel.value;
      const language = langSel.value;
      const riftSnippet = data.snippets[task].RIFT;
      const otherSnippet = data.snippets[task][language];
      left.textContent = riftSnippet;
      right.textContent = otherSnippet;
      const r = computeMetrics(riftSnippet);
      const o = computeMetrics(otherSnippet);
      const lineDelta = o.lines - r.lines;
      const charDelta = o.chars - r.chars;
      table.innerHTML = `
        <tr><td>Line count</td><td>${r.lines}</td><td>${o.lines}</td><td>${lineDelta > 0 ? '-' : '+'}${Math.abs(lineDelta)}</td></tr>
        <tr><td>Character count</td><td>${r.chars}</td><td>${o.chars}</td><td>${charDelta > 0 ? '-' : '+'}${Math.abs(charDelta)}</td></tr>
        <tr><td>Boilerplate delta</td><td colspan="3">RIFT uses ${lineDelta > 0 ? lineDelta : 0} fewer lines in this sample.</td></tr>
      `;
      updateHash(task, language);
    };

    const initial = parseHash();
    taskSel.value = data.tasks.some((t) => t.id === initial.task) ? initial.task : data.tasks[0].id;
    langSel.value = data.languages.includes(initial.language) && initial.language !== 'RIFT' ? initial.language : 'Python';

    taskSel.addEventListener('change', draw);
    langSel.addEventListener('change', draw);
    draw();
  };

  const initLineReducer = () => {
    const host = document.querySelector('[data-line-reducer]');
    if (!host || !window.RIFT_DATA) return;
    const langs = ['Python', 'JavaScript', 'Go', 'Rust', 'Java'];
    let idx = 0;
    setInterval(() => {
      const lang = langs[idx % langs.length];
      const task = 'sum';
      const o = window.RIFT_DATA.compare.snippets[task][lang];
      const r = window.RIFT_DATA.compare.snippets[task].RIFT;
      host.querySelector('.source-lang').textContent = lang;
      host.querySelector('.source-lines').textContent = o.trim().split('\n').length;
      host.querySelector('.target-lines').textContent = r.trim().split('\n').length;
      idx += 1;
    }, 1800);
  };

  initTheme();
  initThemeToggle();
  initReveal();
  initSmooth();
  initActiveNav();
  initCopyButtons();
  initInstallTyping();
  initParallax();
  initCompare();
  initLineReducer();
})();
