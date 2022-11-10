import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {

  }

  async render() {
    this.#initElements();
    this.#appendElements();

    this.products = null;
    try {
      const response = await fetch('products.json');
      this.products = await response.json();
      console.log(this.products);
    } catch (error) {
      console.log('Unable to get products list from server');
    }

    this.productsGrid = new ProductsGrid(this.products);
    while (this.dataProductsHolder.firstChild) {
      this.dataProductsHolder.removeChild(this.dataProductsHolder.firstChild);
    }
    this.dataProductsHolder.append(this.productsGrid.elem);

    this.#initFilters();
    this.#addEventListeners();

  }

  #initElements() {
    this.carouselHolder = document.querySelector('[data-carousel-holder]');
    this.dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    this.dataSliderHolder = document.querySelector('[data-slider-holder]');
    this.cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    this.dataProductsHolder = document.querySelector('[data-products-grid-holder]');
  }

  #appendElements() {
    this.carousel = new Carousel(slides);
    this.carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    this.dataRibbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.dataSliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    this.cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
  }

  #initFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.getActiveCategory(),
    });
  }

  #addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      this.cart.addProduct(this.#addProduct(event));
    });

    this.dataSliderHolder.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter(
        {
          maxSpiciness: event.detail,
        })
    });

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter(
        {
          category: event.detail,
        }
      )
    });

    document.body.addEventListener('change', this.#onChange);
  }

  #onChange = (event) => {
    if(event.target.closest('#nuts-checkbox')){
      this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      })
    }
    if(event.target.closest('#vegeterian-checkbox')){
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      })
    }
  }

  #addProduct = (event) => {
    let finded = this.products.find(product => product.id === event.detail);
    return finded;
  }

}
