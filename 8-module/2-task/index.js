import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#mainTemplate());
    this.#initElements();
    this.#productsTemplate();
  }

  #initElements() {
    this.containerRoot = document.querySelector('#container');
    this.innerGrid = this.elem.querySelector(".products-grid__inner");
  }

  #mainTemplate() {
    return `
    <div class="products-grid">
       <div class="products-grid__inner">
       </div>
    </div>`;
  }

  #productsTemplate() {
    this.products.forEach((product) => {
      let productCard = new ProductCard(product);
      this.innerGrid.append(productCard.elem);
    });
  }

  updateFilter(filters) {
    this.#initFilters();
    this.elem.remove();
    //this.elem = null;

    let filteredProducts = this.products;

    for (const [key, value] of Object.entries(filters)) {
      this.filters[key] = value;
    }

    for (const [key, value] of Object.entries(this.filters)) {
      if (key === "vegeterianOnly" && value === true) {
        filteredProducts = this.#filterByVegeterian(filteredProducts);
      }
      if (key === "category" && value === 'soups') {
        filteredProducts = this.#filterBySoups(filteredProducts);
      }
      if (key === "noNuts" && value === true) {
        filteredProducts = this.#filterByNuts(filteredProducts);
      }
        filteredProducts = this.#filterBySpices(filteredProducts);
    }

    this.#filteredRender(filteredProducts);

  }

  #filteredRender(filteredProducts) {
    this.elem = createElement(this.#mainTemplate());
    this.#initElements();
    filteredProducts.forEach((product) => {
      let productCard = new ProductCard(product);
      this.innerGrid.append(productCard.elem);
    });
    this.containerRoot.append(this.elem);
  }

  #filterBySoups(listToBeFiltered) {
    return listToBeFiltered.filter(({category}) => category === 'soups');
  }

  #filterByNuts(listToBeFiltered) {
    return listToBeFiltered.filter(({nuts}) => !nuts);
  }

  #filterBySpices(listToBeFiltered) {
    return listToBeFiltered.filter(({spiciness}) => spiciness <= this.filters.maxSpiciness);
  }

  #filterByVegeterian(listToBeFiltered) {
    let filtered = listToBeFiltered.filter(({vegeterian}) =>
      vegeterian);
    return filtered;
  }

  #initFilters() {
    if (Object.keys(this.filters).length === 0) {
      this.filters = {
        noNuts: false,
        vegeterianOnly: false,
        maxSpiciness: 4,
        category: '',
      };
      console.log('Filter initialized');
    } else {
      console.log('Filters already exists');
    }
  }
}
