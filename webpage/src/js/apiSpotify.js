import { CLIENT_ID, CLIENT_SECRET } from "../constants/spotifyAuth.js";

var redirect_uri = "http://127.0.0.1:5500/index.html";

var client_id = "";
var client_secret = "";
var access_token = "";
var refresh_token = "";

const playerPlayPauseTag = document.querySelector("#play-pause");
const playerImageTag = document.querySelector("#player__image");
const playerArtistTag = document.querySelector("#info-artist");
const playerMusicNameTag = document.querySelector("#info-music");

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAYER = "https://api.spotify.com/v1/me/player";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const TOKEN = "https://accounts.spotify.com/api/token";

window.addEventListener("load", () => {
	onPageLoad();
});

playerPlayPauseTag.addEventListener("click", () => {
	requestAuthorization();
});

playerImageTag.addEventListener("click", () => {
	refreshDevices();
});

function onPageLoad() {
	client_id = localStorage.getItem("client_id");
	client_secret = localStorage.getItem("client_secret");

	if (window.location.search.length > 0) {
		handleRedirect();
	} else {
		access_token = localStorage.getItem("access_token");
		// if (access_token == null) {
		// 	document.getElementById("tokenSection").style.display = "block";
		// } else {
		// 	document.getElementById("deviceSection").style.display = "block";
		refreshDevices();
		currentlyPlaying();
		// }
	}
}

function checkLocalStorage() {
	let id = localStorage.getItem("client_id");
	let secret = localStorage.getItem("client_secret");
	let access = localStorage.getItem("access_token");
	let refresh = localStorage.getItem("refresh_token");

	if (id) {
		console.log("client_id saved to local storage: " + id);
	} else {
		console.log("client_id not saved to local storage");
	}

	if (secret) {
		console.log("client_secret saved to local storage: " + secret);
	} else {
		console.log("client_secret not saved to local storage");
	}

	if (access) {
		console.log("access_token saved to local storage: " + access);
	} else {
		console.log("access_token not saved to local storage");
	}

	if (refresh) {
		console.log("refresh_token saved to local storage: " + refresh);
	} else {
		console.log("refresh_token not saved to local storage");
	}
}

function requestAuthorization() {
	client_id = CLIENT_ID;
	client_secret = CLIENT_SECRET;
	localStorage.setItem("client_id", client_id);
	localStorage.setItem("client_secret", client_secret);

	let url = AUTHORIZE;
	url += "?client_id=" + client_id;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&show_dialog=true";
	url +=
		"&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
	window.location.href = url;
}

function handleRedirect() {
	let code = getCode();
	fetchAccessToken(code);
	window.history.pushState("", "", redirect_uri);
}

function getCode() {
	let code = null;
	const queryString = window.location.search;
	if (queryString.length > 0) {
		const urlParams = new URLSearchParams(queryString);
		code = urlParams.get("code");
	}
	return code;
}

function fetchAccessToken(code) {
	let body = "grant_type=authorization_code";
	body += "&code=" + code;
	body += "&redirect_uri=" + encodeURI(redirect_uri);
	body += "&client_id=" + client_id;
	body += "&client_secret=" + client_secret;
	callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", TOKEN, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
	xhr.send(body);
	xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		console.log(data);
		var data = JSON.parse(this.responseText);
		if (data.access_token != undefined) {
			access_token = data.access_token;
			localStorage.setItem("access_token", access_token);
		}
		if (data.refresh_token != undefined) {
			refresh_token = data.refresh_token;
			localStorage.setItem("refresh_token", refresh_token);
		}
		onPageLoad();
	} else {
		console.log(this.responseText);
		alert(this.responseText);
	}
}

function callApi(method, url, body, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer " + access_token);
	xhr.send(body);
	xhr.onload = callback;
}

function refreshAccessToken() {
	refresh_token = localStorage.getItem("refresh_token");
	let body = "grant_type=refresh_token";
	body += "&refresh_token=" + refresh_token;
	body += "&client_id=" + client_id;
	callAuthorizationApi(body);
}

function handleApiResponse() {
	if (this.status == 200) {
		console.log(this.responseText);
		setTimeout(currentlyPlaying, 2000);
	} else if (this.status == 204) {
		setTimeout(currentlyPlaying, 2000);
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
		alert(this.responseText);
	}
}

function refreshDevices() {
	callApi("GET", DEVICES, null, handleDevicesResponse);
}

function play() {
	let playlist_id = document.getElementById("playlists").value;
	let trackindex = document.getElementById("tracks").value;
	let album = document.getElementById("album").value;
	let body = {};
	if (album.length > 0) {
		body.context_uri = album;
	} else {
		body.context_uri = "spotify:playlist:" + playlist_id;
	}
	body.offset = {};
	body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
	body.offset.position_ms = 0;
	callApi("PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse);
}

function pause() {
	callApi("PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse);
}

function currentlyPlaying() {
	callApi("GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
}

function handleCurrentlyPlayingResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		console.log(data);
		if (data.item != null) {
			playerImageTag.src = data.item.album.images[0].url;
			playerArtistTag.textContent = data.item.artists[0].name;
			playerMusicNameTag.textContent = data.item.name;
		}

		// if (data.device != null) {
		// 	currentDevice = data.device.id;
		// 	document.getElementById("devices").value = currentDevice;
		// }

		// if (data.context != null) {
		// 	currentPlaylist = data.context.uri;
		// 	currentPlaylist = currentPlaylist.substring(currentPlaylist.lastIndexOf(":") + 1, currentPlaylist.length);
		// 	document.getElementById("playlists").value = currentPlaylist;
		// }
	} else if (this.status == 204) {
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
		alert(this.responseText);
	}
}
