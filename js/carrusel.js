let slides;
let currentIndex = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
  console.log(3, index);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  console.log(2, currentIndex);
}

function startSlide(i) {
  slides = document.querySelectorAll(`.slide-${i}`);
  console.log(0, slides.length);

    intervalId = setInterval(nextSlide, 900);
}

function stopSlide() {
  clearInterval(intervalId);
}
