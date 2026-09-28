const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

const sunIcon = document.querySelector(".theme-toggle__icon--sun");
const moonIcon = document.querySelector(".theme-toggle__icon--moon");

updateThemeIcons(root.dataset.theme);

themeToggle.addEventListener("click", () => {
  const currentTheme = root.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);

  updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
  sunIcon.classList.toggle("theme-toggle__icon--active", theme === "light");

  moonIcon.classList.toggle("theme-toggle__icon--active", theme === "dark");
}
