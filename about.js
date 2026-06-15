document.addEventListener('DOMContentLoaded', function () {

  /* ── STAT COUNTERS ── */
  const statNums = document.querySelectorAll('.about-stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const tick = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(tick);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  statNums.forEach(el => observer.observe(el));

});