import { slideDotCheck } from "./slideDotCheck.js";

export function swipeSlide(slide, slides, delay, side) {
  const sliderContainer = document.querySelector(".slider__container");
  if (side === "right") {
    sliderContainer.append(slides[slide]);
    sliderContainer.style = `transform: translateX(-100%);`;
  } else {
    sliderContainer.style =
      "position: relative; left: -100%; transform: translateX(100%);";
    sliderContainer.prepend(slides[slide]);
  }
  
  sliderContainer.style.transition = `${delay / 1000}s ease`;

  setTimeout(() => {
    slides.forEach((element) => {
      element !== slides[slide] ? element.remove() : element;
    });
    sliderContainer.style =
      "transition: 0s; position: relative; left: 100; transform: translateX(0%);";
  }, delay);

  slideDotCheck(slide);
}
