const backgroundToggle = document.getElementById("dn");
const header = document.getElementById("header");
const headerTitle = document.getElementById("header-title");
const body = document.querySelector("body");

backgroundToggle.addEventListener("click", () => {
	body.classList.toggle("night");
	header.classList.toggle("header-night");
	headerTitle.classList.toggle("header__title-night");
});

headerTitle;
