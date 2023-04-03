import { swipeSlide } from "./modules/swipeSlide.js";

const sliderContainer = document.querySelector(".slider__container");
const sliderSlides = sliderContainer.querySelectorAll(".slider__item");
const sliderLeftBtn = document.querySelector(".slider__left-button");
const sliderRightBtn = document.querySelector(".slider__right-button");
const sliderDots = document.querySelector(".slider__dots");
const clidesCount = sliderSlides.length;
const slideDelay = 400

let currentSlide = 0;
let autoInterval;
const elementsArray = [
  sliderContainer,
  sliderLeftBtn,
  sliderRightBtn,
  sliderDots,
];

for (const slide of sliderSlides) {
  slide.remove();
}

sliderContainer.append(sliderSlides[0]);

sliderRightBtn.addEventListener("click", swipeRight);

function swipeRight() {
  sliderRightBtn.removeEventListener("click", swipeRight);
  currentSlide += 1;
  if (currentSlide === clidesCount) {
    currentSlide = 0;
  }
  swipeSlide(currentSlide, sliderSlides, "right", slideDelay);
  setTimeout(() => {
    sliderRightBtn.addEventListener("click", swipeRight);
  }, slideDelay);
}

sliderLeftBtn.addEventListener("click", swipeLeft);

function swipeLeft() {
  sliderLeftBtn.removeEventListener("click", swipeLeft);
  currentSlide -= 1;
  if (currentSlide < 0) {
    currentSlide = clidesCount - 1;
  }
  swipeSlide(currentSlide, sliderSlides, "left", slideDelay);
  setTimeout(() => {
    sliderLeftBtn.addEventListener("click", swipeLeft);
  }, slideDelay);
}

sliderDots.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("slider__dot")) return;
  currentSlide = target.dataset.dotnum - 1;
  swipeSlide(currentSlide);
});

// sliderContainer.addEventListener("mouseout", () => {
//   autoSlider();
// });

// sliderContainer.addEventListener("mouseover", () => {
//   clearInterval(autoInterval);
// });

// sliderAddElementsStop(elementsArray);

// function sliderAddElementsStop(elements) {
//   for (const element of elements) {
//     element.addEventListener("mouseover", () => {
//       clearInterval(autoInterval);
//     });
//   }
// }

// function autoSlider() {
//   autoInterval = setInterval(() => {
//     currentSlide === 5 ? (currentSlide = 0) : currentSlide++;
//     swipeSlide(currentSlide);
//   }, 3000);
// }

// autoSlider();
