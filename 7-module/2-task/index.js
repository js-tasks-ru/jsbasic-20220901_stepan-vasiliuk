import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.#render();
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(element) {
    this.modalBody.insertAdjacentElement('afterbegin', element);
  }

  open() {
    this.container.append(this.elem);
    document.body.classList.toggle('is-modal-open');
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#initElements();
  }

  #initElements() {
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
    this.container = document.body.querySelector('.container');
  }

  #template() {
    return `
  <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
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
