import { CLIENT_ID, CLIENT_SECRET } from "../constants/spotifyAuth.js";
import autoScroll from "./autoScrollPlayer.js";

var access_token = "";
var activeDevices = false;
var client_id = "";
var client_secret = "";
var defaultPlayer = true;
var isPlaying = false;
var playbackOffsetMS = 0;
var playlist_id = "37i9dQZF1DX2vsux22VuNL";
var redirect_uri = "http://127.0.0.1:5500/index.html";
var refresh_token = "";

const playerArtistTag = document.querySelector("#info-artist");
const playerImageTag = document.querySelector("#player__image");
const playerInfo = document.querySelector(".player__info");
const playerMusicNameTag = document.querySelector("#info-music");
const playerNextTag = document.querySelector("#player-next");
const playerPlayPauseTag = document.querySelector("#player-play-pause");
const playerPreviousTag = document.querySelector("#player-previous");
const playerSpotifyTag = document.querySelector("#spotify");

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PLAYLISTS = "https://api.spotify.com/v1/playlists";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const TOKEN = "https://accounts.spotify.com/api/token";

window.addEventListener("load", () => {
	onPageLoad();
});

playerNextTag.addEventListener("click", () => {
	next();
});

playerPlayPauseTag.addEventListener("click", () => {
	togglePlayPause();
});

playerPreviousTag.addEventListener("click", () => {
	previous();
});

playerSpotifyTag.addEventListener("click", () => {
	requestAuthorization();
});

setInterval(currentlyPlaying, 1000);

async function onPageLoad() {
	client_id = localStorage.getItem("client_id");
	client_secret = localStorage.getItem("client_secret");

	if (window.location.search.length > 0) {
		handleRedirect();
	} else {
		access_token = localStorage.getItem("access_token");
		refreshDevices();
		currentlyPlaying();
		toggleIconPlayPause(isPlaying);
		handleNoPlayback();
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
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let code = null;
	if (queryString.length > 0) {
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
		setTimeout(currentlyPlaying, 1000);
	} else if (this.status == 204) {
		setTimeout(currentlyPlaying, 1000);
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

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
		console.log(this.responseText);
	}
}

function refreshDevices() {
	callApi("GET", DEVICES, null, handleDevicesResponse);
}

async function togglePlayPause() {
	if (isPlaying) {
		pause();
		playerPlayPauseTag.classList.toggle("pause", false);
		playerPlayPauseTag.classList.toggle("play", true);
	} else {
		play();
		playerPlayPauseTag.classList.toggle("play", false);
		playerPlayPauseTag.classList.toggle("pause", true);
	}
	isPlaying = !isPlaying;
}

function toggleIconPlayPause(isPlaying) {
	if (isPlaying) {
		playerPlayPauseTag.classList.toggle("pause", false);
		playerPlayPauseTag.classList.toggle("play", true);
	} else {
		playerPlayPauseTag.classList.toggle("play", false);
		playerPlayPauseTag.classList.toggle("pause", true);
	}
	isPlaying = !isPlaying;
}

function getPlaylist() {
	let playlist = `${PLAYLISTS}/${playlist_id}`;
	callApi("GET", playlist, null, handlePlaylistsResponse);
}

function handlePlaylistsResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

function play() {
	if (!defaultPlayer) {
		callApi("PUT", PLAY, null, handleApiResponse);
	} else {
		playOnLoad();
	}
}

function playOnLoad() {
	defaultPlayer = false;
	let body = {};
	body.context_uri = "spotify:playlist:" + playlist_id;
	body.offset = {};
	body.offset.position = 0;
	body.offset.position_ms = playbackOffsetMS;
	callApi("PUT", PLAY, JSON.stringify(body), handleApiResponse);
}

function pause() {
	callApi("PUT", PAUSE, null, handleApiResponse);
}

function next() {
	callApi("POST", NEXT, null, handleApiResponse);
}

function previous() {
	callApi("POST", PREVIOUS, null, handleApiResponse);
}

function currentlyPlaying() {
	callApi("GET", CURRENTLYPLAYING, null, handleCurrentlyPlayingResponse);
	getPlaylist();
	refreshDevices();
	handleNoPlayback();
}

function handleCurrentlyPlayingResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		if (data.item != null) {
			playerImageTag.src = data.item.album.images[0].url;
			playerArtistTag.textContent = data.item.artists[0].name;
			playerMusicNameTag.textContent = data.item.name;
			playbackOffsetMS = data.progress_ms;
			toggleIconPlayPause(!data.is_playing);
			autoScroll(playerArtistTag, playerInfo);
			autoScroll(playerMusicNameTag, playerInfo);
		}
	} else if (this.status == 204) {
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

function handleNoPlayback() {
	if (!access_token) {
		playerArtistTag.textContent = "Autenticação necessária";
		playerMusicNameTag.textContent = "Clique no ícone do Spotify para se autenticar";
	}
	if (!activeDevices) {
		playerArtistTag.textContent = "Sem dispositivos ativos conectados";
		playerMusicNameTag.textContent = "Abra o aplicativo do Spotify em algum lugar para este player funcionar";
	}
	autoScroll(playerArtistTag, playerInfo);
	autoScroll(playerMusicNameTag, playerInfo);
}
