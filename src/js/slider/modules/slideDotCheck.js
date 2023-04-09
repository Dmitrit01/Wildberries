export function slideDotCheck(slide) {
  const sliderDots = document.querySelector(".slider__dots");
  const currSlideDot = sliderDots.children[slide];
  const dots = Array.from(sliderDots.children);
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
  });
  currSlideDot.classList.add("active-dot");
}
