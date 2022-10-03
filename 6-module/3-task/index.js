import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  constructor(slides) {
    this.slides = slides;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#carouselTemplate());
    this.#initCarousel();
    this.#checkCounter();
    this.#addListeners();
  }

  #carouselTemplate() {
    return `
    <div class="carousel">
       <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </div>
       <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
       <div class="carousel__inner">${this.#slidesTemplate(this.slides)}</div>
    </div>`
  }

  #slidesTemplate(slides) {
    let carouselString = '';
    slides.forEach(({ name, price, image, id }) => {
      carouselString +=
        `
    <div class="carousel__slide" data-id="${id}">
       <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
       <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
             <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
       </div>
    </div>
    `;

    });
    return carouselString;
  }

  #initCarousel() {
    this.rightButton = this.elem.querySelector('.carousel__arrow_right');
    this.leftButton = this.elem.querySelector('.carousel__arrow_left');
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.carouselSlide = this.elem.querySelectorAll('.carousel__slide');
    this.carouselButtons = this.elem.querySelectorAll('.carousel__button');
    this.clickCounter = 0;
    this.carouselTransform = 0;
  }

  #addListeners() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__arrow_right')) {
        this.#nextSlide();
      }
      if (event.target.closest('.carousel__arrow_left')) {
        this.#previousSlide();
      }
    }
    )
    this.carouselButtons.forEach((button) => {
      button.addEventListener('click', this.#onCarouselButtonClick);
    })
  }

  #nextSlide = () => {
    this.carouselTransform -= this.#getOffSetSize(this.carouselInner);
    this.carouselInner.style.transform = `translateX(${this.carouselTransform}px)`;
    this.clickCounter += 1;
    this.#checkCounter();
  }


  #previousSlide = () => {
    this.carouselTransform += this.#getOffSetSize(this.carouselInner);
    this.carouselInner.style.transform = `translateX(${this.carouselTransform}px)`;
    this.clickCounter -= 1;
    this.#checkCounter();
  }


  #checkCounter() {
    if (this.clickCounter >= this.carouselSlide.length - 1) {
      this.rightButton.style.display = 'none';
    }
    else if (this.clickCounter == 0) {
      this.leftButton.style.display = 'none';
    }
    else {
      this.leftButton.style.display = '';
      this.rightButton.style.display = '';
    }
  }

  #getOffSetSize(elem) { return elem.offsetWidth };

  #onCarouselButtonClick = (eOb) => {
    const eventObject = new CustomEvent('product-add', {
      bubbles: true,
      detail: eOb.target.closest('.carousel__slide').dataset.id,
    });
    this.elem.dispatchEvent(eventObject);
  }
}