
  const exploreBox = document.querySelector('.explore__box');
  const originalImages = Array.from(exploreBox.children);
  const gap = 33;

  for (let i = 0; i < 2; i++) {
    originalImages.forEach(img => exploreBox.appendChild(img.cloneNode(true)));
  }
  exploreBox.style.gap = gap + 'px';

  const slideWidth = originalImages[0].offsetWidth;
  const slideAmount = originalImages.length;
  const slideAmountWidth = (slideWidth * slideAmount) + (gap * (slideAmount - 1));

  let position = 0;

  function animate() {
    position -= 1.5;
    if (Math.abs(position) >= slideAmountWidth) {
      position += slideAmountWidth;
    }

    exploreBox.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
