import {
	accessToken,
	refreshToken,
	handleNoToken,
	handleRedirect,
	requestAuthorization,
} from "./spotifyAuthorization.js";
import { handleNoDevice, refreshDevices } from "./spotifyDevices.js";
import {
	currentlyPlaying,
	nextMusic,
	previousMusic,
	togglePlayPauseMusic,
	togglePlayPauseMusicOnLoad,
} from "./spotifyPlayback.js";

let buttonPlayClicked = false;
const playerTags = {
	next: document.querySelector("#player-next"),
	playPause: document.querySelector("#player-play-pause"),
	previous: document.querySelector("#player-previous"),
	spotify: document.querySelector("#spotify"),
};

window.addEventListener("load", () => {
	onPageLoad();
});

playerTags.next.addEventListener("click", () => {
	nextMusic();
});

playerTags.playPause.addEventListener("click", () => {
	if (buttonPlayClicked) {
		togglePlayPauseMusic();
	} else {
		buttonPlayClicked = true;
		togglePlayPauseMusicOnLoad();
	}
});

playerTags.previous.addEventListener("click", () => {
	previousMusic();
});

playerTags.spotify.addEventListener("click", () => {
	requestAuthorization();
});

async function onPageLoad() {
	if (window.location.search.length > 0) {
		handleRedirect();
	}
	setInterval(frequentChecks, 1000);
}

function frequentChecks() {
	if (accessToken || refreshToken) {
		currentlyPlaying();
		refreshDevices();
		handleNoDevice();
	} else {
		handleNoToken();
	}
}
