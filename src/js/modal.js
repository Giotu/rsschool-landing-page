import products from "./data/products.json";

const list = document.querySelector(".card__list");
const overlay = document.querySelector(".overlay");
const sizeButtons = overlay.querySelectorAll(".product__size .button-product");
let currentProduct;
const selectedOptions = {
  selectedSize: "s",
  selectedAdditives: [],
};

const additivesButtons = overlay.querySelectorAll(
  ".product__additives .button-product",
);
const keySize = ["s", "m", "l"];

list.addEventListener("click", (event) => {
  const card = event.target.closest(".card__item");
  if (!card) return;
  const indexCard = Number(card.dataset.productIndex);
  const product = products[indexCard];
  openModal(product);
});

overlay.addEventListener("click", (event) => {
  if (
    event.target.closest(".button-close-modal") ||
    !event.target.closest(".modal")
  ) {
    closeModal();
    return;
  }

  const button = event.target.closest(".button-product");
  if (!button) return;

  if (button.closest(".product__size")) {
    const index = [...sizeButtons].indexOf(button);
    selectedOptions.selectedSize = keySize[index];
    setActiveSize();
  }

  if (button.closest(".product__additives")) {
    const index = [...additivesButtons].indexOf(button);

    if (selectedOptions.selectedAdditives.includes(index)) {
      selectedOptions.selectedAdditives.splice(
        selectedOptions.selectedAdditives.indexOf(index),
        1,
      );
    } else {
      selectedOptions.selectedAdditives.push(index);
    }
    setActiveAdditives();
  }

  updatePrice();
});

function openModal(product) {
  const image = overlay.querySelector(".product__image");
  const title = overlay.querySelector(".product__title");
  const description = overlay.querySelector(".product__description");

  currentProduct = product;
  resetSelectedOptions();

  image.src = `${import.meta.env.BASE_URL}images/menu/${product.image}`;
  title.textContent = product.name;
  description.textContent = product.description;

  sizeButtons.forEach((button, index) => {
    const buttonText = button.querySelector(".size-text");
    buttonText.textContent = product.sizes[keySize[index]].size;
  });

  additivesButtons.forEach((button, index) => {
    const buttonText = button.querySelector(".additives-text");
    buttonText.textContent = product.additives[index].name;
  });

  setActiveSize();
  setActiveAdditives();
  updatePrice();
  overlay.classList.remove("overlay--hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  overlay.classList.add("overlay--hidden");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !overlay.classList.contains("overlay--hidden")
  ) {
    closeModal();
  }
});

function setActiveSize() {
  const activeIndex = keySize.indexOf(selectedOptions.selectedSize);

  sizeButtons.forEach((button, index) => {
    if (index === activeIndex) button.classList.add("button-product--active");
    else button.classList.remove("button-product--active");
  });
}

function setActiveAdditives() {
  additivesButtons.forEach((button, index) => {
    if (selectedOptions.selectedAdditives.includes(index))
      button.classList.add("button-product--active");
    else button.classList.remove("button-product--active");
  });
}

function resetSelectedOptions() {
  selectedOptions.selectedSize = "s";
  selectedOptions.selectedAdditives = [];
}

function calculatePrice() {
  return (
    Number(currentProduct.price) +
    Number(currentProduct.sizes[selectedOptions.selectedSize]["add-price"]) +
    currentProduct.additives.reduce((acc, curr, index) => {
      if (selectedOptions.selectedAdditives.includes(index)) {
        return acc + Number(curr["add-price"]);
      }
      return acc;
    }, 0)
  );
}

function updatePrice() {
  const price = overlay.querySelector(".product__price span:nth-child(2)");

  price.textContent = `$${calculatePrice().toFixed(2)}`;
}
