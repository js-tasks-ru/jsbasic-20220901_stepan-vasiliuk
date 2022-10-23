import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  #tempValue = 0;
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
    this.sliderRoot = this.elem.querySelector(".slider");
  }

  #addListeners() {
    this.elem.addEventListener("click", this.#onSliderClick);
    //drag-and-drop listener
    this.thumb.addEventListener("pointerdown", this.#onPointerDown);
  }

  //Click Listener:
  #onSliderClick = (event) => {
    this.#tempValue = this.value;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    this.value = Math.round(leftRelative * (this.steps - 1));
    if (this.#isValueChanged()) {
      this.#onSliderChange();
    }
    
    let perCentValue = (this.value / (this.steps - 1)) * 100;
    this.sliderValue.innerText = `${this.value}`;
    this.#classChange();
    this.#thumbAndColorChange(perCentValue);
  };

  #thumbAndColorChange(perCentValue) {
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

  // Drag-and-drop:
  #onPointerDown = () => {
    this.#tempValue = this.value;
    this.thumb.ondragstart = () => false;
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, { once: true });
  };

  #onPointerMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let perCentValue = leftRelative * 100;

    this.value = Math.round(leftRelative * (this.steps - 1));
    this.sliderValue.innerText = `${this.value}`;
    this.#classChange();
    this.#thumbAndColorChange(perCentValue);
  };

  #onPointerUp = () => {
    document.removeEventListener("pointermove", this.#onPointerMove);
    this.elem.classList.remove("slider_dragging");
    let perCentValue = (this.value / (this.steps - 1)) * 100;
    this.#thumbAndColorChange(perCentValue);
    if (this.#isValueChanged()) {
      this.#onSliderChange();
    }
  };

  #isValueChanged() {
    return this.#tempValue !== this.value ? true : false;
  }

  //Templates:

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
