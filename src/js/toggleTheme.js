export function checkTimeAndApplyTheme(elements) {
	const date = new Date();
	const hours = date.getHours();

	if (hours >= 18 || hours < 5) {
		setNightMode(elements);
	} else {
		setDayMode(elements);
	}
}

export function toggleMode(elements) {
	if (elements.backgroundToggle.checked) {
		setNightMode(elements);
	} else {
		setDayMode(elements);
	}
}

function setNightMode(elements) {
	elements.body.classList.add("night");
	elements.card.classList.add("card-night");
	elements.cardImage.classList.add("card__image-night");
	elements.clock.classList.add("clock-night");
	elements.header.classList.add("header-night");
	elements.headerTitle.classList.add("header__title-night");
	elements.player.classList.add("player-night");
	elements.playerImage.classList.add("player__image-night");

	elements.backgroundToggle.checked = true;
}

function setDayMode(elements) {
	elements.body.classList.remove("night");
	elements.card.classList.remove("card-night");
	elements.cardImage.classList.remove("card__image-night");
	elements.clock.classList.remove("clock-night");
	elements.header.classList.remove("header-night");
	elements.headerTitle.classList.remove("header__title-night");
	elements.player.classList.remove("player-night");
	elements.playerImage.classList.remove("player__image-night");

	elements.backgroundToggle.checked = false;
}
