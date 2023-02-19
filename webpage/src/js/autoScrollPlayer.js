function autoScroll(music, artist, container) {
	if (artist.offsetWidth <= container.offsetWidth) {
		artist.style.animation = "none";
	} else {
		artist.style.animation = "15s linear infinite scroll";
	}

	if (music.offsetWidth <= container.offsetWidth) {
		music.style.animation = "none";
	} else {
		music.style.animation = "15s linear infinite scroll";
	}
}

export default autoScroll;
