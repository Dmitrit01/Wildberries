import { swipeSlide } from "./modules/swipeSlide.js";

const sliderContainer = document.querySelector(".slider__container");
const sliderLeftBtn = document.querySelector(".slider__left-button");
const sliderRightBtn = document.querySelector(".slider__right-button");
const sliderDots = document.querySelector(".slider__dots");

let currentSlide = 0;
let autoInterval;
const elementsArray = [
  sliderContainer,
  sliderLeftBtn,
  sliderRightBtn,
  sliderDots,
];

sliderRightBtn.addEventListener("click", () => {
  currentSlide += 1;
  if (currentSlide > sliderContainer.childElementCount - 1) {
    currentSlide = 0;
  }
  swipeSlide(currentSlide);
});

sliderLeftBtn.addEventListener("click", () => {
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = sliderContainer.childElementCount - 1;
  }
  swipeSlide(currentSlide);
});

sliderDots.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("slider__dot")) return;
  currentSlide = target.dataset.dotnum - 1;
  swipeSlide(currentSlide);
});

sliderContainer.addEventListener("mouseout", () => {
  autoSlider();
});

sliderContainer.addEventListener("mouseover", () => {
  clearInterval(autoInterval);
});

sliderAddElementsStop(elementsArray);

function sliderAddElementsStop(elements) {
  for (const element of elements) {
    element.addEventListener("mouseover", () => {
      clearInterval(autoInterval);
    });
  }
}

function autoSlider() {
  autoInterval = setInterval(() => {
    currentSlide === 4 ? (currentSlide = 0) : currentSlide++;
    swipeSlide(currentSlide);
  }, 3000);
}

autoSlider();
