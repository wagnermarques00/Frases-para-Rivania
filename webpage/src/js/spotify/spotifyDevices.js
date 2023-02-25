import { callApi, refreshAccessToken } from "./spotifyAuthorization.js";
import autoScroll from "../autoScrollPlayer.js";

var activeDevices = false;
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const playerTags = {
	artist: document.querySelector("#info-artist"),
	info: document.querySelector(".player__info"),
	musicName: document.querySelector("#info-music"),
};

function handleDevicesResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		if (data.devices.length > 0) {
			let active = data.devices.find((device) => device.is_active);
			if (active !== undefined) {
				activeDevices = true;
				return active.id;
			}
		}
	} else if (this.status == 401) {
		refreshAccessToken();
	} else if (this.status == 404) {
		activeDevices = false;
	} else {
		activeDevices = false;
	}
}

export function refreshDevices() {
	callApi("GET", DEVICES, null, handleDevicesResponse);
}

export function handleNoDevice() {
	if (!activeDevices) {
		playerTags.artist.textContent = "Sem dispositivos ativos conectados";
		playerTags.musicName.textContent = "Abra o aplicativo do Spotify em algum lugar para este player funcionar";
	}

	autoScroll(playerTags.artist, playerTags.info);
	autoScroll(playerTags.musicName, playerTags.info);
}
