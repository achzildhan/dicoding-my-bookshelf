const slides = document.querySelectorAll('.header-slide');
let currentSlide = 0;

function showSlide() {
  slides.forEach((slide) => {
    slide.style.opacity = 0;
  });

  slides[currentSlide].style.opacity = 1;
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  setTimeout(showSlide, 3000); 
}

showSlide();