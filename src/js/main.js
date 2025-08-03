const slides = document.getElementById("slides");
const buttons = document.querySelectorAll(".pagination button");
let currentSlide = 0;

function goToSlide(index) {
  const slideWidth = slides.querySelector(".slide").offsetWidth;
  slides.style.transition = "0.3s transform";
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
  buttons.forEach((btn) => btn.classList.remove("active"));
  buttons[index].classList.add("active");
  currentSlide = index;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.getAttribute("data-index"), 10);
    goToSlide(index);
  });
});

window.addEventListener("resize", () => {
  goToSlide(currentSlide);
});

goToSlide(0);