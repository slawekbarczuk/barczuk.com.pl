/* R16: four static artistic images, 1.6-second crossfade every 8 seconds. */
(() => {
  'use strict';
  const root = document.querySelector('[data-hero-slideshow]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const intervalMs = 8000;
  let active = 0;
  let timer = null;
  let inView = true;
  function canRotate() {
    return inView && !document.hidden && !reducedMotion.matches && !connection?.saveData;
  }
  function show(index) {
    slides.forEach((el, i) => el.classList.toggle('is-visible', i === index));
    active = index;
  }
  function schedule() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    if (canRotate()) timer = setTimeout(() => {
      timer = null;
      if (canRotate()) show((active + 1) % slides.length);
      schedule();
    }, intervalMs);
  }
  function sync() {
    if (reducedMotion.matches || connection?.saveData) show(0);
    schedule();
  }
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  connection?.addEventListener?.('change', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, { threshold: 0.05 }).observe(root);
  }
  show(0);
  schedule();
})();
