let slides;
let currentIndex = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function startSlide(i) {
  slides = document.querySelectorAll(`.slide-${i}`);
    intervalId = setInterval(nextSlide, 900);
}

function stopSlide() {
  clearInterval(intervalId);
}
