document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hero__button-tobottom');
  const footer = document.querySelector('.footer');

  if (btn && footer) {
    btn.addEventListener('click', () => {
      footer.scrollIntoView({ behavior: 'smooth' });
    });
  } else {
    console.warn('Кнопка або футер не знайдені в DOM');
  }
});
