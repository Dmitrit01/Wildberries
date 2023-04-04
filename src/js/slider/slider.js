import { swipeSlide } from "./modules/swipeSlide.js";
export function slider() {
  const sliderContainer = document.querySelector(".slider__container");
  const sliderSlides = sliderContainer.querySelectorAll(".slider__item");
  const sliderLeftBtn = document.querySelector(".slider__left-button");
  const sliderRightBtn = document.querySelector(".slider__right-button");
  const sliderDots = document.querySelector(".slider__dots");
  const clidesCount = sliderSlides.length;
  const slideDelay = 400;

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
    currentSlide + 1 === clidesCount ? (currentSlide = 0) : currentSlide++;
    swipeSlide(currentSlide, sliderSlides, slideDelay, "right");
    setTimeout(() => {
      sliderRightBtn.addEventListener("click", swipeRight);
    }, slideDelay);
  }

  sliderLeftBtn.addEventListener("click", swipeLeft);

  function swipeLeft() {
    sliderLeftBtn.removeEventListener("click", swipeLeft);
    currentSlide - 1 < 0 ? (currentSlide = clidesCount - 1) : currentSlide--;
    swipeSlide(currentSlide, sliderSlides, slideDelay, "left");
    setTimeout(() => {
      sliderLeftBtn.addEventListener("click", swipeLeft);
    }, slideDelay);
  }

  sliderDots.addEventListener("click", (event) => {
    let side;
    const target = event.target;
    if (!target.classList.contains("slider__dot")) return;
    side = currentSlide < target.dataset.dotnum ? "right" : "left";
    currentSlide = target.dataset.dotnum - 1;
    swipeSlide(currentSlide, sliderSlides, slideDelay, side);
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
      currentSlide + 1 === clidesCount ? (currentSlide = 0) : currentSlide++;
      swipeSlide(currentSlide, sliderSlides, slideDelay, "right");
    }, 3000);
  }

    autoSlider();
}
