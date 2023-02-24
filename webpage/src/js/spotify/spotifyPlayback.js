import { callApi, refreshAccessToken } from "./spotifyAuthorization.js";
import autoScroll from "../autoScrollPlayer.js";

var defaultPlayer = true;
var isPlaying = false;
var playlist_id = "37i9dQZF1DX2vsux22VuNL";
var playbackOffsetMS = 0;
var currentPlaylist = "";

const playerArtistTag = document.querySelector("#info-artist");
const playerImageTag = document.querySelector("#player__image");
const playerInfo = document.querySelector(".player__info");
const playerMusicNameTag = document.querySelector("#info-music");
const playerPlayPauseTag = document.querySelector("#player-play-pause");

const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";

export async function togglePlayPause() {
	if (isPlaying) {
		pause();
	} else {
		play();
	}
}

export async function togglePlayPauseOnLoad() {
	if (checkDefaultPlaylist()) {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	} else {
		if (isPlaying) {
			pause();
		} else {
			playDefaultPlaylist();
		}
	}
}

export function toggleIconPlayPause(playing) {
	if (playing) {
		playerPlayPauseTag.classList.toggle("play", false);
		playerPlayPauseTag.classList.toggle("pause", true);
	} else {
		playerPlayPauseTag.classList.toggle("pause", false);
		playerPlayPauseTag.classList.toggle("play", true);
	}
	isPlaying = playing;
}

export function next() {
	callApi("POST", NEXT, null, handleApiPlaybackResponse);
}

function pause() {
	callApi("PUT", PAUSE, null, handleApiPlaybackResponse);
}
function play() {
	callApi("PUT", PLAY, null, handleApiPlaybackResponse);
}

export function previous() {
	callApi("POST", PREVIOUS, null, handleApiPlaybackResponse);
}

function playDefaultPlaylist() {
	let body = {};
	body.context_uri = "spotify:playlist:" + playlist_id;

	body.offset = {};
	body.offset.position = 0;
	body.offset.position_ms = 0;

	callApi("PUT", PLAY, JSON.stringify(body), handleApiPlaybackResponse);
}

function handleApiPlaybackResponse() {
	if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

export function currentlyPlaying() {
	callApi("GET", CURRENTLYPLAYING, null, handleCurrentlyPlayingResponse);
}

function handleCurrentlyPlayingResponse() {
	if (this.status == 200) {
		let data = JSON.parse(this.responseText);
		if (data.item != null) {
			console.log(data.item);
			playerImageTag.src = data.item.album.images[2].url;
			playerArtistTag.textContent = data.item.artists[0].name;
			playerMusicNameTag.textContent = data.item.name;
			playbackOffsetMS = data.progress_ms;
			toggleIconPlayPause(data.is_playing);
			autoScroll(playerArtistTag, playerInfo);
			autoScroll(playerMusicNameTag, playerInfo);
		}
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

function checkDefaultPlaylist() {
	let formatedID = "spotify:playlist:" + playlist_id;
	if (currentPlaylist === formatedID) {
		return true;
	} else {
		return false;
	}
}
