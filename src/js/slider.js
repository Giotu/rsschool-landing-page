const track = document.querySelector(".favorites__list");
const btnPrev = document.querySelector(".favorites__button--prev");
const btnNext = document.querySelector(".favorites__button--next");
const firstIndex = 0;
const lastIndex = track.children.length - 1;
const indicators = document.querySelector(".favorites__pagination").children;

let coordX = null;
let coordY = null;

let currentIndex = firstIndex;

btnNext.addEventListener("click", nextSlide);

btnPrev.addEventListener("click", prevSlide);

function updateSlider(prevIndex) {
  const translateX = currentIndex * -100;
  track.style.transform = `translateX(${translateX}%)`;

  indicators[prevIndex].classList.remove("favorites__indicator--active");
  indicators[currentIndex].classList.add("favorites__indicator--active");
}

function goToSlide(newIndex) {
  const prevIndex = currentIndex;

  currentIndex = newIndex;
  updateSlider(prevIndex);
}

function handleTouchStart(event) {
  coordX = event.touches[0].clientX;
  coordY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  const diffX = event.changedTouches[0].clientX - coordX;
  const diffY = event.changedTouches[0].clientY - coordY;
  const distance = 35;

  if (Math.abs(diffY) > Math.abs(diffX)) return;
  if (diffX >= distance) {
    prevSlide();
  } else if (diffX <= -distance) {
    nextSlide();
  }
}

function nextSlide() {
  if (currentIndex === lastIndex) {
    goToSlide(firstIndex);
  } else {
    goToSlide(currentIndex + 1);
  }
}

function prevSlide() {
  if (currentIndex === firstIndex) {
    goToSlide(lastIndex);
  } else {
    goToSlide(currentIndex - 1);
  }
}

track.addEventListener("touchstart", handleTouchStart);
track.addEventListener("touchend", handleTouchEnd);
