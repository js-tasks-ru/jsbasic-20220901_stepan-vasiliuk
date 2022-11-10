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
    this.#productsTemplate(this.products);
  }

  #initElements() {
    this.innerGrid = this.elem.querySelector(".products-grid__inner");
  }

  #mainTemplate() {
    return `
    <div class="products-grid">
       <div class="products-grid__inner">
       </div>
    </div>`;
  }

  #productsTemplate(products) {
    this.innerGrid.innerHTML = '';
    products.forEach((product) => {
      let productCard = new ProductCard(product);
      this.innerGrid.append(productCard.elem);
    });
  }

  updateFilter(filters) {
    this.#initFilters();

    for (const [key, value] of Object.entries(filters)) {
      this.filters[key] = value;
    }

    let filteredProducts = this.products;

    for (const [key, value] of Object.entries(this.filters)) {
      if (key === "vegeterianOnly" && value === true) {
        filteredProducts = this.#filterByVegeterian(filteredProducts);
      }
      if (key === "category" && value !== "") {
        filteredProducts = this.#filterByCategory(filteredProducts, value);
      }
      if (key === "noNuts" && value === true) {
        filteredProducts = this.#filterByNuts(filteredProducts);
      }
      if (key === "maxSpiciness") {
        filteredProducts = this.#filterBySpices(filteredProducts, value);
      }
    }
    console.log(filteredProducts);
    this.#productsTemplate(filteredProducts);
  }

  #filterByCategory(listToBeFiltered, value) {
    return listToBeFiltered.filter(
      ({ category }) => category === value);
  }

  #filterByNuts(listToBeFiltered) {
    return listToBeFiltered.filter(({ nuts }) => !nuts);
  }

  #filterBySpices(listToBeFiltered, value) {
    return listToBeFiltered.filter(
      ({ spiciness }) => spiciness <= value
    );
  }

  #filterByVegeterian(listToBeFiltered) {
    return listToBeFiltered.filter(({ vegeterian }) => vegeterian);
  }

  #initFilters() {
    if (Object.keys(this.filters).length === 0) {
      this.filters = {
        noNuts: false,
        vegeterianOnly: false,
        maxSpiciness: 4,
        category: "",
      };
    } else {
      return;
    }
  }
}
