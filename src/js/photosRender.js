function renderPhoto(photos, photoTag) {
	const randomIndex = Math.floor(Math.random() * photos.length);
	const photo = `/src/assets/img/photos/${photos[randomIndex]}`;

	photoTag.src = photo;
}

export default renderPhoto;
