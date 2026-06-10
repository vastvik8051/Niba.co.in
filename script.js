document.addEventListener('DOMContentLoaded', () => {

  // ---- LOGOBAR SCROLL ----
  const logobar = document.getElementById('logobar');
  window.addEventListener('scroll', () => {
    logobar.classList.toggle('scrolled', window.scrollY > 44);
  });

  // ---- HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ---- SLIDER ----
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('sliderPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('sliderNext').addEventListener('click', () => goTo(current + 1));
  resetTimer();

  // ---- STAT COUNTERS ----
  let countersStarted = false;
  const statItems = document.querySelectorAll('.stat-item');

  function animateCounters() {
    statItems.forEach(item => {
      const target = parseInt(item.dataset.target);
      const suffix = item.dataset.suffix || '+';
      const numEl = item.querySelector('.stat-num');
      let current = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        numEl.textContent = current + suffix;
        if (current >= target) clearInterval(interval);
      }, 20);
    });
  }

  const statsBanner = document.querySelector('.stats-banner');
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  }, { threshold: 0.4 });
  if (statsBanner) statsObserver.observe(statsBanner);

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.project-card, .service-item, .quicklink');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });

});