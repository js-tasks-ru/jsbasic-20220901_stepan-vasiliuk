import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.product == product);
    if (itemIndex < 0) {
      this.cartItems.push({
        product: product,
        count: 1,
      });
    } else {
      this.cartItems[itemIndex].count += 1;
    }
    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  updateProductCount(productId, amount) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.product.id == productId);
    this.cartItems[itemIndex].count += amount;
    if (this.cartItems[itemIndex].count <= 0) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  isEmpty() {
    return !this.cartItems.length ? true : false;
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.count);
    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.product.price * item.count);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modalWindow = new Modal();
    modalWindow.setTitle('Вот такое вот:');
    modalWindow.setBody(this.cartInnerTemplate());
    document.body.addEventListener('click', this.onCountButtonClick)

    modalWindow.open();
  }

  cartInnerTemplate() {
    let cartInner = createElement('<div></div>');

    this.cartItems.forEach((item) => {
      cartInner.append(this.renderProduct(item.product, item.count))
    })
    console.log(cartInner);
    return cartInner;
  }

  onCountButtonClick = (event) => {
    console.log(event);
    if (event.target.closest('.cart-counter__button_minus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
    }
    if (event.target.closest('.cart-counter__button_plus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
    }
  }

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

