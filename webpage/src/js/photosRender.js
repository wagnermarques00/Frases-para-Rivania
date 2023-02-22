import { photos } from "../constants/photos.js";
const photoTag = document.querySelector(".card__image");

function renderPhoto() {
	const randomIndex = Math.floor(Math.random() * photos.length);
	const photo = `/src/assets/img/photos/${photos[randomIndex]}`;

	photoTag.src = photo;
}

export default renderPhoto;
