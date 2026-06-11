document.addEventListener('DOMContentLoaded', function () {

  /* ── HERO SLIDER ── */
  // const slides = document.querySelectorAll('.pd-hero-slide');
  // const dotsContainer = document.getElementById('pdDots');
  // let current = 0;
  // let timer;

  // if (slides.length && dotsContainer) {
  //   slides.forEach((_, i) => {
  //     const dot = document.createElement('button');
  //     dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  //     dot.addEventListener('click', () => goTo(i));
  //     dotsContainer.appendChild(dot);
  //   });

  //   function goTo(n) {
  //     slides[current].classList.remove('active');
  //     dotsContainer.children[current].classList.remove('active');
  //     current = (n + slides.length) % slides.length;
  //     slides[current].classList.add('active');
  //     dotsContainer.children[current].classList.add('active');
  //     resetTimer();
  //   }

  //   function resetTimer() {
  //     clearInterval(timer);
  //     timer = setInterval(() => goTo(current + 1), 5000);
  //   }

  //   document.getElementById('pdPrev')?.addEventListener('click', () => goTo(current - 1));
  //   document.getElementById('pdNext')?.addEventListener('click', () => goTo(current + 1));

  //   resetTimer();
  // }

  /* ── FLOOR PLAN TABS ── */
  const tabs = document.querySelectorAll('.pd-fp-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pd-fp-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('plan-' + tab.dataset.plan);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── GALLERY VIEWER ── */
  const galleryItems = document.querySelectorAll('.pd-gallery-item');
  const viewer = document.getElementById('galleryViewer');
  const viewerImg = document.getElementById('galleryViewerImg');
  const viewerClose = document.getElementById('galleryViewerClose');
  const viewerPrev = document.getElementById('galleryViewerPrev');
  const viewerNext = document.getElementById('galleryViewerNext');

  if (!viewer) return;

  const galleryImgs = Array.from(galleryItems).map(item => item.querySelector('img').src);
  let activeIdx = 0;

  function openViewer(idx) {
    activeIdx = idx;
    viewerImg.src = galleryImgs[activeIdx];
    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    viewer.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prevImg() {
    activeIdx = (activeIdx - 1 + galleryImgs.length) % galleryImgs.length;
    viewerImg.src = galleryImgs[activeIdx];
  }

  function nextImg() {
    activeIdx = (activeIdx + 1) % galleryImgs.length;
    viewerImg.src = galleryImgs[activeIdx];
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openViewer(i)));
  viewerClose?.addEventListener('click', closeViewer);
  viewerPrev?.addEventListener('click', prevImg);
  viewerNext?.addEventListener('click', nextImg);
  viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });

  document.addEventListener('keydown', e => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });

});