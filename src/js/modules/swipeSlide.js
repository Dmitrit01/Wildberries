import { slideDotCheck } from "./slideDotCheck.js";

export function swipeSlide(slide) {
  const sliderContainer = document.querySelector(".slider__container");
  sliderContainer.style.transform = `translateX(-${slide * 100}%)`;
  slideDotCheck(slide);
}
