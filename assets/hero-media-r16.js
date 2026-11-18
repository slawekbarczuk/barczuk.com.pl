/* Decorative, locally hosted city film. Contact-form logic is independent. */
(() => {
  'use strict';
  const media = document.querySelector('[data-hero-media]');
  if (!media) return;
  const video = media.querySelector('video');
  const button = media.querySelector('[data-media-toggle]');
  if (!video || !button) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let userPaused = false;
  let inView = true;
  let failed = false;

  function available() {
    return !failed && !reducedMotion.matches && !connection?.saveData;
  }
  function update() {
    const playing = !video.paused && !video.ended && !failed;
    // A user pause retains the current city frame; failures use the still.
    media.classList.toggle('is-playing', !failed && video.readyState >= 2 && available());
    media.classList.toggle('is-paused', !playing);
    button.hidden = !available();
    button.textContent = playing ? 'Zatrzymaj film' : 'Odtwórz film';
  }
  async function sync() {
    if (!available() || userPaused || !inView || document.hidden) {
      video.pause();
      update();
      return;
    }
    video.muted = true;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    try {
      await video.play();
      if (userPaused || !inView || document.hidden || !available()) video.pause();
    } catch (_) {
      // Autoplay may be declined. Keep the still and a working manual play.
    }
    update();
  }
  button.addEventListener('click', () => {
    userPaused = !video.paused;
    sync();
  });
  video.addEventListener('playing', update);
  video.addEventListener('pause', update);
  video.addEventListener('loadeddata', update);
  video.addEventListener('error', () => { failed = true; video.pause(); update(); });
  reducedMotion.addEventListener('change', sync);
  connection?.addEventListener?.('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      sync();
    }, { threshold: 0.1 }).observe(media);
  }
  update();
  sync();
})();
