import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 2 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#initElements();
    this.#addListeners();
  }

  #initElements() {
    this.sliderValue = this.elem.querySelector(".slider__value");
    this.sliderStepsRoot = this.elem.querySelector(".slider__steps");
    this.sliderSteps = this.sliderStepsRoot.childNodes;
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progressBar = this.elem.querySelector(".slider__progress");
  }

  #addListeners() {
    this.elem.addEventListener("click", this.#onSliderClick);
  }

  #onSliderClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let newValue = Math.round(leftRelative * (this.steps - 1));
    if (newValue !== this.value) {
      this.value = newValue;
      this.#onSliderChange();
      this.sliderValue.innerText = `${this.value}`;
      this.#classChange();
      this.#thumbAndColorChange();
    }
  };

  #thumbAndColorChange() {
    let perCentValue = (this.value / (this.steps - 1)) * 100;
    this.thumb.style.left = `${perCentValue}%`;
    this.progressBar.style.width = `${perCentValue}%`;
  }

  #classChange() {
    this.sliderSteps.forEach((step) => {
      if (step.classList.contains("slider__step-active")) {
        step.classList.remove("slider__step-active");
      }
    });
    this.sliderSteps[this.value].classList.add("slider__step-active");
  }

  #onSliderChange() {
    let custom = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(custom);
  }

  #template() {
    return `
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">${this.#stepstemplate()}</div>
  </div>`;
  }

  #stepstemplate() {
    let returnString = "";
    for (let i = 0; i < this.steps - 1; i++) {
      if (i === this.value) {
        returnString += `<span class="slider__step-active"></span>`;
      }
      returnString += `<span></span>`;
    }
    return returnString;
  }
}
