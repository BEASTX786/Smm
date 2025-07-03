let coll = document.getElementsByClassName("panel__btn")
let i
let slideIndex = 0
const MAX_SLIDES_COUNT = 2

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("panel__btn_active")
    let content = this.nextElementSibling
    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
}

const mobileMenuButton = document.querySelector('.mobile-menu__toggle')
const mobileMenuList = document.querySelector('.mobile-menu__dropdown')

const paginatonButtons = document.querySelectorAll('.carousel-paginator__item')
const carousel = document.querySelector('.carousel__slides');
const slideWidth = document.querySelector('.carousel__slide').offsetWidth;

const nextButton = document.querySelector('.carousel__mobile-paginator-next')
const prevButton = document.querySelector('.carousel__mobile-paginator-prev')

prevButton.classList.add('btn-disabled')

if (paginatonButtons.length) {
  paginatonButtons[0].classList.add('carousel-paginator__item_active');
}

function showGallerySlide(index) {
  carousel.style.transform = `translateX(-${index * slideWidth}px)`;
  paginatonButtons.forEach((button) => button.classList.remove('carousel-paginator__item_active'));
  paginatonButtons[index].classList.add('carousel-paginator__item_active');
}

const paginatonBenefitsButtons = document.querySelectorAll('.benefit-paginator__item');

if (paginatonBenefitsButtons.length) {
  paginatonBenefitsButtons[0].classList.add('benefit-paginator__item_active');
}

function switchSlide(direction) {
  slideIndex = direction === 'next' ? Math.min(2, slideIndex += 1) : Math.max(0, slideIndex -= 1)
  carousel.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

  const paginatonButtons = document.querySelectorAll('.mobile-slide-btn');
  paginatonButtons.forEach((button) => button.classList.remove('btn-disabled'));

  if (slideIndex === 0) {
    prevButton.classList.add('btn-disabled');
  } else if (slideIndex === MAX_SLIDES_COUNT) {
    nextButton.classList.add('btn-disabled');
  }

  const mobilePageIndicators = document.querySelectorAll('.carousel__page-indicator-item');

  if (mobilePageIndicators.length) {
    mobilePageIndicators.forEach((indicator) => indicator.classList.remove('carousel__page-indicator-item_active'));
    mobilePageIndicators[slideIndex].classList.add('carousel__page-indicator-item_active');
  }
}

function showBenefitSlide(index) {
  const carousel = document.querySelector('.benefits__info-carousel');
  const slideWidth = document.querySelector('.benefits__info-slide').offsetWidth;

  carousel.style.transform = `translateX(-${index * slideWidth}px)`;
  paginatonBenefitsButtons.forEach((button) => button.classList.remove('benefit-paginator__item_active'));
  paginatonBenefitsButtons[index].classList.add('benefit-paginator__item_active');
}

function toggleMenu () {
  const mobileMenu = document.querySelector('.mobile-menu__dropdown')
  mobileMenu.classList.toggle('mobile-menu__dropdown_visible')
}

window.addEventListener("load", function() {
  const bg = document.querySelector('.header');
  bg.classList.add('header_visible'); // Add the class to trigger opacity change
});

document.addEventListener('click', (event) => {
  console.log(event.target)
  if (!mobileMenuList.contains(event.target) && event.target !== mobileMenuButton) {
    mobileMenuList.classList.remove('mobile-menu__dropdown_visible')
  }
});

document.addEventListener("DOMContentLoaded", () => {
  AOS.init()
});
