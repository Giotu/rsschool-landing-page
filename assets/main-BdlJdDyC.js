//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/js/main.js
var root = document.documentElement;
var themeToggle = document.querySelector(".theme-toggle");
var sunIcon = document.querySelector(".theme-toggle__icon--sun");
var moonIcon = document.querySelector(".theme-toggle__icon--moon");
updateThemeIcons(root.dataset.theme);
themeToggle.addEventListener("click", () => {
	const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
	root.dataset.theme = newTheme;
	localStorage.setItem("theme", newTheme);
	updateThemeIcons(newTheme);
});
function updateThemeIcons(theme) {
	sunIcon.classList.toggle("theme-toggle__icon--active", theme === "light");
	moonIcon.classList.toggle("theme-toggle__icon--active", theme === "dark");
}
//#endregion

//# sourceMappingURL=main-BdlJdDyC.js.map