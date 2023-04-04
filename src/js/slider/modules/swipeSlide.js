import { slideDotCheck } from "./slideDotCheck.js";

export function swipeSlide(slide, slides, delay, side) {
  const sliderContainer = document.querySelector(".slider__container");
  let currentSlide;
  if (side === "right") {
    sliderContainer.append(slides[slide]);
    sliderContainer.style.transform = `translateX(-100%)`;
  } else {
    sliderContainer.style.transition = `0s`;
    sliderContainer.style.transform = `translateX(-100%)`;
    sliderContainer.prepend(slides[slide]);
  }
  sliderContainer.style.transition = `${delay / 1000}s ease`;
  setTimeout(() => {
    if (slides[slide].previousSibling) {
      slides[slide].previousSibling.remove();
    }
    if (slides[slide].nextElementSibling) {
      slides[slide].nextElementSibling.remove();
    }
    sliderContainer.style.transition = `0s`;
    sliderContainer.style.transform = `translateX(0%)`;
  }, delay);
  slideDotCheck(slide);
}
