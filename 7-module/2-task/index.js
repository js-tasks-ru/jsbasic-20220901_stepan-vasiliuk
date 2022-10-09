import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#initElements();
    this.#addListeners();
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(element) {
    while (this.modalBody.firstChild) {
      this.modalBody.removeChild(this.modalBody.firstChild);
    }
    this.modalBody.insertAdjacentElement("afterbegin", element);
  }

  open() {
    document.body.prepend(this.elem);
    document.body.classList.toggle("is-modal-open");
  }

  #initElements() {
    this.modalTitle = this.elem.querySelector(".modal__title");
    this.modalBody = this.elem.querySelector(".modal__body");
    this.container = document.body.querySelector(".container");
    this.closeButton = this.elem.querySelector(".modal__close");
  }

  close() {
    this.elem.remove();
    document.body.classList.toggle("is-modal-open");
    document.body.removeEventListener("keydown", this.#onEscPressing);
  }

  #addListeners() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".modal__close")) {
        this.close();
      }
    });
    document.body.addEventListener("keydown", this.#onEscPressing);
  }

  #onEscPressing = (keyDownEvent) => {
    if (keyDownEvent.code === "Escape") {
      this.close();
    }
  };

  #template() {
    return `
  <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">

        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>
  </div>`;
  }
}
