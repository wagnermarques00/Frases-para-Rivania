require("dotenv").config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

import autoScroll from "../autoScrollPlayer.js";

var access_token = localStorage.getItem("access_token");
var redirect_uri = "http://127.0.0.1:5500/index.html";
var refresh_token = localStorage.getItem("refresh_token");

const playerArtistTag = document.querySelector("#info-artist");
const playerInfo = document.querySelector(".player__info");
const playerMusicNameTag = document.querySelector("#info-music");

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

export function requestAuthorization() {
	let scope =
		"&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

	let url = AUTHORIZE;
	url += "?client_id=" + SPOTIFY_CLIENT_ID;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&show_dialog=true";
	url += scope;

	window.location.href = url;
}

export function handleRedirect() {
	let code = getCode();

	fetchAccessToken(code);
	window.history.pushState("", "", redirect_uri);
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

function fetchAccessToken(code) {
	let body = "grant_type=authorization_code";
	body += "&code=" + code;
	body += "&redirect_uri=" + encodeURI(redirect_uri);
	body += "&client_id=" + SPOTIFY_CLIENT_ID;
	body += "&client_secret=" + SPOTIFY_CLIENT_SECRET;

	callAuthorizationApi(body);
}

export function refreshAccessToken() {
	refresh_token = localStorage.getItem("refresh_token");
	let body = "grant_type=refresh_token";
	body += "&refresh_token=" + refresh_token;
	body += "&client_id=" + SPOTIFY_CLIENT_ID;

	callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", TOKEN, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Authorization", "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET));
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
