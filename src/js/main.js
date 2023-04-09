import { swipeSlide } from "./modules/swipeSlide.js";

const sliderContainer = document.querySelector(".slider__container");
const sliderLeftBtn = document.querySelector(".slider__left-button");
const sliderRightBtn = document.querySelector(".slider__right-button");
const sliderDots = document.querySelector(".slider__dots");

const openPopUp = document.querySelector('#open_pop_up');
const closePopUp = document.querySelector('.pop_up_close');
const popUp = document.querySelector('.pop_up');

const products = document.querySelectorAll('.product');
const addList = document.querySelector('.pop_up_list');

const btnClear = document.querySelector('.btn_clear');

let listArr = [];

btnClear.addEventListener('click', () => {

  Array.from(addList.childNodes).forEach(item => {

    item.remove();
  });
  listArr = [];
  localStorage.clear('list')
  totalCheck();

})



if (localStorage.getItem('list')) {
  listArr = JSON.parse(localStorage.getItem('list'));

  listArr.forEach((el) => {
    const { title, price } = el;
    const newProduct = document.createElement('div');
    const productPrice = document.createElement('span');
    const productTitle = document.createElement('p');
    newProduct.classList.add('pop_up_list_item');
    productPrice.classList.add('price-new');
    productTitle.classList.add('product-title');
    productPrice.textContent = price;


    productTitle.textContent = title;

    newProduct.append(productTitle, productPrice);
    addList.append(newProduct);
  })
}

products.forEach((el, idx) => {
  const btn = el.childNodes[7]
  btn.addEventListener('click', () => {
    const card = el.closest('.product')
    const cardTitle = card.querySelector('.product-title').cloneNode(true)
    const cardPrice = card.querySelector('.price-new').cloneNode(true)
    const title = cardTitle.textContent;
    const price = cardPrice.textContent;

    const itemObj = { title, price };
    listArr.push(itemObj);
    localStorage.setItem('list', JSON.stringify(listArr));

    let element = document.createElement('div')
    element.classList.add('pop_up_list_item')

    element.append(cardTitle, cardPrice)

    addList.append(element)
    totalCheck();
  })
})

function totalCheck() {
  const poPupList = document.querySelector('.pop_up_list');
  const prices = poPupList.querySelectorAll('.price-new');
  const total = document.querySelector('.total-price');
  let sum = 0;
  prices.forEach((item) => {

    sum += +item.textContent.replace(' ', '').replace('$', '');

  })
  total.textContent = `Итого: ${sum.toLocaleString('en-EU')}$`;
}
totalCheck();

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



// корзина 

openPopUp.addEventListener('click', function(e) {
  e.preventDefault();
  popUp.classList.add('active');
});

closePopUp.addEventListener('click', () => {
  popUp.classList.remove('active');
});