const container = document.querySelector(".player__wrapper");
const music = document.querySelector("#info-music");
const artist = document.querySelector("#info-artist");

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
