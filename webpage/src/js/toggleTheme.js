const backgroundToggle = document.getElementById("dn");
const header = document.getElementById("header");
const headerTitle = document.getElementById("header-title");
const body = document.querySelector("body");

function setNightMode() {
	body.classList.add("night");
	header.classList.add("header-night");
	headerTitle.classList.add("header__title-night");
	backgroundToggle.checked = true;
}

function setDayMode() {
	body.classList.remove("night");
	header.classList.remove("header-night");
	headerTitle.classList.remove("header__title-night");
	backgroundToggle.checked = false;
}

function toggleMode() {
	if (backgroundToggle.checked) {
		setNightMode();
	} else {
		setDayMode();
	}
}

window.addEventListener("load", () => {
	if (backgroundToggle.checked) {
		setNightMode();
	} else {
		setDayMode();
	}
});

backgroundToggle.addEventListener("click", toggleMode);
