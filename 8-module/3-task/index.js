export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

