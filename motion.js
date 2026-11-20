/* 001 · Progressive café motion. Static HTML remains the failure fallback. */
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = matchMedia('(min-width: 761px)');
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const ritual = document.querySelector('.benefits');
  const targets = [...document.querySelectorAll('[data-arrival]')];
  document.querySelectorAll('.hero-copy > *').forEach((element, index) => element.style.setProperty('--entrance-order', index));
  for (const group of document.querySelectorAll('.menu-grid,.review-grid,.benefits,.gallery > div:last-child')) {
    [...group.children].forEach((element, index) => element.style.setProperty('--arrival-delay', `${Math.min(index, 3) * 90}ms`));
  }
  const pending = new Set();
  let observer;
  let frame = 0;
  const clamp = n => Math.min(1, Math.max(0, n));
  const enabled = () => !preference.matches;
  const show = element => { element.classList.remove('awaiting'); pending.delete(element); observer?.unobserve(element); };

  function stop() {
    root.classList.remove('motion-enabled');
    observer?.disconnect();
    targets.forEach(show);
    for (const animation of document.getAnimations()) animation.cancel();
    document.querySelectorAll('.menu-grid article').forEach(resetTilt);
  }

  function start() {
    if (!enabled() || !('IntersectionObserver' in window)) return;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
      }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
      // Only content below the initial viewport is staged; above-the-fold content is immediate.
      targets.forEach(element => {
        if (element.getBoundingClientRect().top < innerHeight * .92) return;
        element.classList.add('awaiting');
        pending.add(element);
        observer.observe(element);
      });
      root.classList.add('motion-enabled');
      schedule();
    } catch { stop(); }
  }

  function update() {
    frame = 0;
    if (document.hidden) return;
    try {
      const scrollable = root.scrollHeight - innerHeight;
      root.style.setProperty('--brew-progress', scrollable > 0 ? clamp(scrollY / scrollable) : 0);
      header.classList.toggle('is-scrolled', scrollY > 8);
      if (!enabled()) return;
      for (const element of pending) {
        if (element.getBoundingClientRect().top < 0) show(element);
      }
      const box = hero.getBoundingClientRect();
      if (box.bottom > 0 && box.top < innerHeight && desktop.matches) {
        const progress = clamp(-box.top / box.height);
        hero.style.setProperty('--hero-drift', `${progress * 45}px`);
        hero.style.setProperty('--copy-drift', `${progress * -15}px`);
      }
      const care = ritual.getBoundingClientRect();
      if (care.top < innerHeight && care.bottom > 0) {
        const progress = clamp((innerHeight * .85 - care.top) / (care.height + innerHeight * .25));
        ritual.style.setProperty('--ritual-flow', progress);
        [...ritual.children].forEach((item, index) => item.classList.toggle('is-warm', progress >= (index + .25) / 3));
      }
    } catch { stop(); }
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(update); }
  addEventListener('scroll', schedule, { passive:true });
  addEventListener('resize', schedule, { passive:true });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('motion-background', document.hidden);
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  });
  document.addEventListener('focusin', event => {
    let element = event.target;
    while (element && element !== root) {
      if (pending.has(element)) { element.classList.add('instant-arrival'); show(element); }
      element = element.parentElement;
    }
  });
  // Hash jumps reveal their destination before the browser moves focus or starts scrolling.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.hash.slice(1));
    if (target) targets.filter(element => target.contains(element)).forEach(show);
  });

  function resetTilt(card) { card.style.removeProperty('--cup-tilt-x'); card.style.removeProperty('--cup-tilt-y'); }
  document.querySelectorAll('.menu-grid article').forEach(card => {
    let tiltFrame = 0;
    card.addEventListener('pointermove', event => {
      if (!enabled() || !pointer.matches || tiltFrame) return;
      const x = event.clientX, y = event.clientY;
      tiltFrame = requestAnimationFrame(() => {
        tiltFrame = 0;
        if (!enabled()) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--cup-tilt-x', `${(.5 - (y - rect.top) / rect.height) * 3}deg`);
        card.style.setProperty('--cup-tilt-y', `${((x - rect.left) / rect.width - .5) * 3}deg`);
      });
    });
    card.addEventListener('pointerleave', () => { cancelAnimationFrame(tiltFrame); tiltFrame = 0; resetTilt(card); });
  });

  // Current-location navigation is a reading aid, not a timed slideshow.
  if ('IntersectionObserver' in window) {
    const links = [...header.querySelectorAll('a[href^="#"]')].filter(link => !link.classList.contains('brand'));
    const sections = ['menu','story','visit'].map(id => document.getElementById(id));
    const current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin:'-10% 0px -55% 0px', threshold:0 });
    sections.forEach(section => current.observe(section));
  }
  preference.addEventListener('change', () => {
    stop();
    if (enabled()) start();
    schedule();
  });
  // No unbounded animation loop; scroll effects run on demand, entrances play once.
  start();
  schedule();
})();
