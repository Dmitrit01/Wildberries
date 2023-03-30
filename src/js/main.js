const sliderContainer = document.querySelector(".slider__container");
const sliderLeftBtn = document.querySelector(".slider__left-button");
const sliderRightBtn = document.querySelector(".slider__right-button");
const sliderDots = document.querySelector(".slider__dots");

let currentSlide = 0;

sliderRightBtn.addEventListener("click", () => {
  currentSlide += 1;
  if (currentSlide > sliderContainer.childElementCount - 1) {
    currentSlide = 0;
  }
  swipeSlide(`${currentSlide}`);
  slideDotCheck(currentSlide);
});

sliderLeftBtn.addEventListener("click", () => {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = sliderContainer.childElementCount - 1;
  }
  swipeSlide(`${currentSlide}`);
  slideDotCheck(currentSlide);
});

sliderDots.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("slider__dot")) return;
  const targetedDot = target.dataset.dotnum - 1;
  swipeSlide(targetedDot);
  slideDotCheck(targetedDot);
  currentSlide = targetedDot;
});

function swipeSlide(quantity) {
  sliderContainer.style.transform = `translateX(-${quantity * 100}%)`;
}

function slideDotCheck(slide) {
  const currSlideDot = sliderDots.children[slide];
  const dots = Array.from(sliderDots.children);
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
  });
  currSlideDot.classList.add("active-dot");
}
