import autoScroll from "../autoScrollPlayer.js";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const NETLIFY_PATH = "/.netlify/functions/fetch-spotify";
const REDIRECT_URI = "http://localhost:8888/index.html";
const TOKEN = "https://accounts.spotify.com/api/token";

let client_id = "";
let client_secret = "";

const playerArtistTag = document.querySelector("#info-artist");
const playerInfo = document.querySelector(".player__info");
const playerMusicNameTag = document.querySelector("#info-music");

let access_token = localStorage.getItem("access_token");
let refresh_token = localStorage.getItem("refresh_token");

async function initAuthorization() {
	const response = await fetch(NETLIFY_PATH);
	const data = await response.json();
	client_id = data.id;
	client_secret = data.secret;
}

initAuthorization();

export function requestAuthorization() {
	let scope =
		"&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

	let url = AUTHORIZE;
	url += "?client_id=" + client_id;
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
	body += "&client_id=" + client_id;
	body += "&client_secret=" + client_secret;

	callAuthorizationApi(body);
}

export function refreshAccessToken() {
	refresh_token = localStorage.getItem("refresh_token");
	let body = "grant_type=refresh_token";
	body += "&refresh_token=" + refresh_token;
	body += "&client_id=" + client_id;

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
	} else {
		console.log(this.responseText);
	}
}

export function callApi(method, url, body, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer " + access_token);
	xhr.send(body);

	xhr.onload = callback;
}

export function handleNoToken() {
	if (!access_token) {
		playerArtistTag.textContent = "Autenticação necessária";
		playerMusicNameTag.textContent = "Clique no ícone do Spotify para se autenticar";

		autoScroll(playerArtistTag, playerInfo);
		autoScroll(playerMusicNameTag, playerInfo);
	}
}
