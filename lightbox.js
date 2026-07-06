document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('projLightbox');
  const backdrop = document.getElementById('projLightboxBackdrop');
  const title = document.getElementById('projLightboxTitle');
  const closeBtn = document.getElementById('projLightboxClose');

  const groups = {
    residential: document.getElementById('residentialProjects'),
    commercial: document.getElementById('commercialProjects'),
    industrial: document.getElementById('industrialProjects'),
    interior: document.getElementById('interiorProjects'),
    solar: document.getElementById('solarProjects')
  };

  const titles = {
    residential: 'Residential Projects',
    commercial: 'Commercial Projects',
    industrial: 'Industrial Projects',
    interior: 'Interior Projects',
    solar: 'Solar Projects'
  };

  function openLightbox(category) {

    Object.values(groups).forEach(group => {
      group.classList.remove('active');
    });

    groups[category].classList.add('active');

    title.textContent = titles[category];

    lightbox.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      openLightbox(card.dataset.category);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

});