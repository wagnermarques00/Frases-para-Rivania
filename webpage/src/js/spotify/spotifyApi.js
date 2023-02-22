import { handleNoToken, handleRedirect, requestAuthorization } from "./spotifyAuthorization.js";
import { handleNoDevice, refreshDevices } from "./spotifyDevices.js";
import { next, previous, togglePlayPause, togglePlayPauseOnLoad, currentlyPlaying } from "./spotifyPlayback.js";

const playerNextTag = document.querySelector("#player-next");
const playerPlayPauseTag = document.querySelector("#player-play-pause");
const playerPreviousTag = document.querySelector("#player-previous");
const playerSpotifyTag = document.querySelector("#spotify");
let playClicked = false;

window.addEventListener("load", () => {
	onPageLoad();
});

playerNextTag.addEventListener("click", () => {
	next();
});

playerPlayPauseTag.addEventListener("click", () => {
	if (playClicked) {
		togglePlayPause();
	} else {
		playClicked = true;
		togglePlayPauseOnLoad();
	}
});

playerPreviousTag.addEventListener("click", () => {
	previous();
});

playerSpotifyTag.addEventListener("click", () => {
	requestAuthorization();
});

async function onPageLoad() {
	if (window.location.search.length > 0) {
		handleRedirect();
	}
	setInterval(constantChecks, 1000);
}

function constantChecks() {
	currentlyPlaying();
	refreshDevices();
	handleNoDevice();
	handleNoToken();
}
