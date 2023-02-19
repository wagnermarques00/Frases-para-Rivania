const backgroundToggle = document.getElementById("dn");
const body = document.querySelector("body");
const card = document.getElementById("card");
const cardImage = document.getElementById("card__image");
const clock = document.getElementById("clock-wrapper");
const header = document.getElementById("header");
const headerTitle = document.getElementById("header-title");
const player = document.getElementById("player");
const playerImage = document.getElementById("player__image");

function setNightMode() {
	body.classList.add("night");
	card.classList.add("card-night");
	cardImage.classList.add("card__image-night");
	clock.classList.add("clock-night");
	header.classList.add("header-night");
	headerTitle.classList.add("header__title-night");
	player.classList.add("player-night");
	playerImage.classList.add("player__image-night");

	backgroundToggle.checked = true;
}

function setDayMode() {
	body.classList.remove("night");
	card.classList.remove("card-night");
	cardImage.classList.remove("card__image-night");
	clock.classList.remove("clock-night");
	header.classList.remove("header-night");
	headerTitle.classList.remove("header__title-night");
	player.classList.remove("player-night");
	playerImage.classList.remove("player__image-night");

	backgroundToggle.checked = false;
}

function toggleMode() {
	if (backgroundToggle.checked) {
		setNightMode();
	} else {
		setDayMode();
	}
}

function checkTime() {
	const date = new Date();
	const hours = date.getHours();

	if (hours >= 18 || hours < 5) {
		setNightMode();
	} else {
		setDayMode();
	}
}

window.addEventListener("load", () => {
	checkTime();
});

backgroundToggle.addEventListener("click", toggleMode);
