import autoScroll from "../autoScrollPlayer.js";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const NETLIFY_PATH = "/.netlify/functions/fetch-spotify";
const REDIRECT_URI = "https://frases-para-rivania.netlify.app/"; // change to use locally
const TOKEN = "https://accounts.spotify.com/api/token";
const playerTags = {
	artist: document.querySelector("#info-artist"),
	info: document.querySelector(".player__info"),
	musicName: document.querySelector("#info-music"),
};

let clientId = ""; // insert if testing locally without netlify
let clientSecret = ""; // insert if testing locally without netlify
export let accessToken = localStorage.getItem("access_token");
export let refreshToken = localStorage.getItem("refresh_token");

// comment this function if testing locally without netlify
async function initAuthorization() {
	const response = await fetch(NETLIFY_PATH);
	const data = await response.json();
	clientId = data.id;
	clientSecret = data.secret;
}

initAuthorization(); // comment this function if testing locally without netlify

export function requestAuthorization() {
	let scope =
		"&scope=user-modify-playback-state user-read-playback-position streaming user-read-playback-state user-read-recently-played";

	let url = AUTHORIZE;
	url += "?client_id=" + clientId;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(REDIRECT_URI);
	url += "&show_dialog=true";
	url += scope;

	window.location.href = url;
}

export function handleRedirect() {
	let code = getCode();
	fetchAccessToken(code);

	window.history.pushState("", "", REDIRECT_URI);
}

function getCode() {
	let code = null;
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);

	if (queryString.length > 0) {
		code = urlParams.get("code");
	}

	return code;
}

async function fetchAccessToken(code) {
	await initAuthorization();

	let body = "grant_type=authorization_code";
	body += "&code=" + code;
	body += "&redirect_uri=" + encodeURI(REDIRECT_URI);
	body += "&client_id=" + clientId;
	body += "&client_secret=" + clientSecret;

	callAuthorizationApi(body);
}

export function refreshAccessToken() {
	refreshToken = localStorage.getItem("refresh_token");
	let body = "grant_type=refresh_token";
	body += "&refresh_token=" + refreshToken;
	body += "&client_id=" + clientId;

	callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", TOKEN, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Authorization", "Basic " + btoa(clientId + ":" + clientSecret));
	xhr.send(body);

	xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		if (data.access_token != undefined) {
			accessToken = data.access_token;
			localStorage.setItem("access_token", accessToken);
		}
		if (data.refresh_token != undefined) {
			refreshToken = data.refresh_token;
			localStorage.setItem("refresh_token", refreshToken);
		}
	} else {
		console.log(this.responseText);
	}
}

export function callApi(method, url, body, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
	xhr.send(body);

	xhr.onload = callback;
}

export function handleNoToken() {
	if (!accessToken) {
		playerTags.artist.textContent = "Autenticação necessária";
		playerTags.musicName.textContent = "Clique no ícone do Spotify para se autenticar";

		autoScroll(playerTags.artist, playerTags.info);
		autoScroll(playerTags.musicName, playerTags.info);
	}
}
