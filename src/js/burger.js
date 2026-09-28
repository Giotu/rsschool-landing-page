const header = document.querySelector(".header");
const navigation = document.querySelector(".navigation");
const btnBurger = document.querySelector(".button-burger");
let isOpen = false;

const observer = new ResizeObserver(() => {
  const height = header.getBoundingClientRect().height;

  document.documentElement.style.setProperty("--header-height", `${height}px`);
});

observer.observe(header);

btnBurger.addEventListener("click", () => {
  if (isOpen) {
    closeMenu();
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    openMenu();
  }
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

function closeMenu() {
  isOpen = false;
  btnBurger.classList.remove("button-burger--open");
  navigation.classList.remove("navigation--open");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  isOpen = true;
  btnBurger.classList.add("button-burger--open");
  navigation.classList.add("navigation--open");
  document.body.classList.add("menu-open");
}

document.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
    if (!isOpen) return;
    else closeMenu();
  }
});

const mediaQuery = window.matchMedia("(width <= 768px)");

mediaQuery.addEventListener("change", (event) => {
  if (!event.matches && isOpen) {
    closeMenu();
  }
});
