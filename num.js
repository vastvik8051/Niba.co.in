document.querySelectorAll('.lb-card-img').forEach((cardImg, index) => {
  const label = document.createElement('span');
  label.className = 'img-number';
  label.textContent = index + 1;
  cardImg.appendChild(label);
});