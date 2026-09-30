import products from "./data/products.json";

let currentCategory = document.querySelector(".button-switch--active").dataset
  .category;
let isExpanded = false;
const list = document.querySelector(".card__list");
const switcher = document.querySelector(".menu__switch");
const loadMoreButton = document.querySelector(".load-more");
const mediaQuery = window.matchMedia("(width <= 768px)");

function createCard(product) {
  const card = document.createElement("li");
  card.className = "card__item";
  card.dataset.productIndex = products.indexOf(product);

  card.innerHTML = `<div class="card-image__wrapper">
    <img
      class="card__image"
      src="${import.meta.env.BASE_URL}/images/menu/${product.image}"
      alt="${product.name}"
      />
    </div>
    <div class="card__description">
      <h3 class="card__title">${product.name}</h3>
      <p class="card__text">
        ${product.description}
      </p>
      <p class="card__price">$${product.price}</p>
    </div>`;

  return card;
}

renderCategory(currentCategory);

switcher.addEventListener("click", (event) => {
  const button = event.target.closest(".button-switch");

  if (!button) return;

  const category = button.dataset.category;

  if (category === currentCategory) return;

  currentCategory = category;
  isExpanded = false;

  removeActiveClass();
  setActiveCategory(button);
  animateCategoryChange(currentCategory);
});

function renderCategory(category) {
  const productsByCategory = getCategoryProducts(category);

  const cards = getVisibleCards(productsByCategory);

  list.replaceChildren(...cards);

  updateLoadMoreButton(productsByCategory.length);
}

function animateCategoryChange(category) {
  list.classList.add("card__list--changing");

  list.addEventListener(
    "transitionend",
    () => {
      renderCategory(category);
      list.classList.remove("card__list--changing");
    },
    { once: true },
  );
}

function removeActiveClass() {
  const buttons = switcher.querySelectorAll(".button-switch");
  buttons.forEach((button) => button.classList.remove("button-switch--active"));
}

function setActiveCategory(button) {
  button.classList.add("button-switch--active");
}

function updateLoadMoreButton(productsCount) {
  if (mediaQuery.matches && productsCount > 4 && !isExpanded) {
    loadMoreButton.classList.remove("load-more--hidden");
  } else loadMoreButton.classList.add("load-more--hidden");
}

function getCategoryProducts(category) {
  return products.filter((product) => product.category === category);
}

loadMoreButton.addEventListener("click", () => {
  isExpanded = true;
  renderCategory(currentCategory);
});

function getVisibleCards(productsByCategory) {
  const visibleProducts =
    mediaQuery.matches && !isExpanded
      ? productsByCategory.slice(0, 4)
      : productsByCategory;

  return visibleProducts.map(createCard);
}

mediaQuery.addEventListener("change", () => {
  renderCategory(currentCategory);
});
