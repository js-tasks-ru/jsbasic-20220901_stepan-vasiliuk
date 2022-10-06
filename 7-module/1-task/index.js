import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;
  constructor(categories) {
    this.categories = categories;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#elementTemplate());
    this.#initElements();
    this.ribbonInner.firstElementChild.classList.add("ribbon__item_active");
    this.#onRibbonScroll();
    this.#addlisteners();
  }

  #initElements() {
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    this.ribbonItems = this.elem.querySelectorAll(".ribbon__item");
  }

  #addlisteners() {
    this.ribbonInner.addEventListener("scroll", this.#onRibbonScroll);
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_left")) {
        this.#onLeftArrowButtonClick();
      }
      if (event.target.closest(".ribbon__arrow_right")) {
        this.#onRightButtonClick();
      }
    });
    this.ribbonItems.forEach((item) => {
      item.addEventListener("click", this.#onRibbonItemClick);
    });
  }

  #onLeftArrowButtonClick() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  #onRightButtonClick() {
    this.ribbonInner.scrollBy(350, 0);
  }

  #onRibbonItemClick = (eventObject) => {
    eventObject.preventDefault();
    this.#itemCheckStyles(eventObject);
    const newEvent = new CustomEvent("ribbon-select", {
      bubbles: true,
      detail: eventObject.target.closest(".ribbon__item").dataset.id,
    });
    this.elem.dispatchEvent(newEvent);
  };

  #itemCheckStyles(eventObject) {
    this.ribbonItems.forEach((item) =>{
      if(item.classList.contains('ribbon__item_active')){
        item.classList.remove('ribbon__item_active');
      }
    });
    eventObject.target.closest('.ribbon__item').classList.add('ribbon__item_active');
  }

  #onRibbonScroll = () => {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollRight =
      this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;
    console.log("Scrollleft: " + scrollLeft);
    console.log("Scrollright: " + scrollRight);
    if (scrollLeft < 1) {
      if (this.arrowLeft.classList.contains("ribbon__arrow_visible")) {
        this.arrowLeft.classList.remove("ribbon__arrow_visible");
      }
      if (!this.arrowRight.classList.contains("ribbon__arrow_visible")) {
        this.arrowRight.classList.add("ribbon__arrow_visible");
      }
    } else if (scrollRight < 1) {
      if (this.arrowRight.classList.contains("ribbon__arrow_visible")) {
        this.arrowRight.classList.remove("ribbon__arrow_visible");
      }
      if (!this.arrowLeft.classList.contains("ribbon__arrow_visible")) {
        this.arrowLeft.classList.add("ribbon__arrow_visible");
      }
    } else {
      if (!this.arrowLeft.classList.contains("ribbon__arrow_visible")) {
        this.arrowLeft.classList.add("ribbon__arrow_visible");
      }
      if (!this.arrowRight.classList.contains("ribbon__arrow_visible")) {
        this.arrowRight.classList.add("ribbon__arrow_visible");
      }
    }
  };

  #elementTemplate() {
    return `
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">${this.#categoriesTemplate()}
    </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`;
  }

  #categoriesTemplate() {
    let stringToReturn = "";
    this.categories.forEach(({ id, name }) => {
      stringToReturn += `
      <a href="#" class="ribbon__item" data-id="${id}">${name}</a>`;
    });
    return stringToReturn;
  }
}
