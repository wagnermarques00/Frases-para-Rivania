import photos from "./src/constants/photos.js";
import renderClockAndCalendar from "./src/js/clock.js";
import renderPhoto from "./src/js/photosRender.js";
import renderPhrase from "./src/js/phrasesRender.js";

const authorTag = document.querySelector(".card__author");
const photoTag = document.querySelector(".card__image");
const quoteTag = document.querySelector(".card__phrase");

const FIVE_MINUTES = 300000;

renderClockAndCalendar();
renderPhoto(photos, photoTag);
renderPhrase(authorTag, quoteTag);

function updatableInFiveMinutes() {
	renderPhoto();
	renderPhrase(authorTag, quoteTag);
}

setInterval(renderClockAndCalendar, 1000);
setInterval(updatableInFiveMinutes, FIVE_MINUTES);
