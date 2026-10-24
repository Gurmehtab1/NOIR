/* NOIR interactive polish: scroll progress, reveal-on-scroll and back-to-top. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reading progress indicator.
  const progress = document.createElement('div');
  progress.className = 'noir-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.transform = `scaleX(${Math.min(100, Math.max(0, percent)) / 100})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Reveal content as it enters the viewport, without blocking content if unsupported.
  const revealTargets = document.querySelectorAll(
    'main > section, .model-card, .gallery-card, .about-card, .faq-item, .news-shell, .contact-form'
  );
  if (!reducedMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((element) => element.classList.add('noir-reveal'));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('noir-revealed');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  }

  // Back-to-top control, created only on pages long enough to need one.
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'noir-back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
  backToTop.hidden = true;
  document.body.appendChild(backToTop);

  const updateBackToTop = () => {
    const visible = window.scrollY > 500;
    backToTop.hidden = !visible;
    backToTop.classList.toggle('is-visible', visible);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
})();
