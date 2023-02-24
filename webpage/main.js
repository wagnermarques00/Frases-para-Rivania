import { checkTimeAndApplyTheme, toggleMode } from "./src/js/toggleTheme.js";
import photos from "./src/constants/photos.js";
import renderClockAndCalendar from "./src/js/clock.js";
import renderPhoto from "./src/js/photosRender.js";
import renderPhrase from "./src/js/phrasesRender.js";

const FIVE_MINUTES = 300000;

const authorTag = document.querySelector(".card__author");
const photoTag = document.querySelector(".card__image");
const quoteTag = document.querySelector(".card__phrase");
const stylizableElements = {
	backgroundToggle: document.querySelector("#dn"),
	body: document.querySelector("body"),
	card: document.querySelector("#card"),
	cardImage: document.querySelector("#card__image"),
	clock: document.querySelector("#clock-wrapper"),
	header: document.querySelector("#header"),
	headerTitle: document.querySelector("#header-title"),
	player: document.querySelector("#player"),
	playerImage: document.querySelector("#player__image"),
};

window.addEventListener("load", () => {
	checkTimeAndApplyTheme(stylizableElements);
});

stylizableElements.backgroundToggle.addEventListener("click", () => {
	toggleMode(stylizableElements);
});

renderClockAndCalendar();
renderPhoto(photos, photoTag);
renderPhrase(authorTag, quoteTag);

function updatableInFiveMinutes() {
	renderPhoto();
	renderPhrase(authorTag, quoteTag);
}

setInterval(renderClockAndCalendar, 1000);
setInterval(updatableInFiveMinutes, FIVE_MINUTES);
