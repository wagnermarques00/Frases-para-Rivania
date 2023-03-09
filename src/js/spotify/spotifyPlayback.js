import { callApi, refreshAccessToken } from "./spotifyAuthorization.js";
import autoScroll from "../autoScrollPlayer.js";

const PLAYLIST_ID = "37i9dQZF1DX2vsux22VuNL";

var isPlaying = false;
var playbackOffsetMS = 0;
var currentPlaylist = "";
var currentIdMusic = "";

const playerTags = {
	artist: document.querySelector("#info-artist"),
	image: document.querySelector("#player__image"),
	info: document.querySelector(".player__info"),
	musicName: document.querySelector("#info-music"),
	playPause: document.querySelector("#player-play-pause"),
};

const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";

export async function togglePlayPauseMusic() {
	if (isPlaying) {
		pauseMusic();
	} else {
		playMusic();
	}
}

export async function togglePlayPauseMusicOnLoad() {
	if (checkDefaultPlaylist()) {
		if (isPlaying) {
			pauseMusic();
		} else {
			playMusic();
		}
	} else {
		if (isPlaying) {
			pauseMusic();
		} else {
			playDefaultPlaylist();
		}
	}
}

export function toggleIconPlayPause(playing) {
	if (playing) {
		playerTags.playPause.classList.toggle("play", false);
		playerTags.playPause.classList.toggle("pause", true);
	} else {
		playerTags.playPause.classList.toggle("pause", false);
		playerTags.playPause.classList.toggle("play", true);
	}
	isPlaying = playing;
}

export function nextMusic() {
	callApi("POST", NEXT, null, handleApiPlaybackResponse);
}

function pauseMusic() {
	callApi("PUT", PAUSE, null, handleApiPlaybackResponse);
}
function playMusic() {
	callApi("PUT", PLAY, null, handleApiPlaybackResponse);
}

export function previousMusic() {
	callApi("POST", PREVIOUS, null, handleApiPlaybackResponse);
}

function playDefaultPlaylist() {
	let body = {
		context_uri: "spotify:playlist:" + PLAYLIST_ID,
		offset: {
			position: 0,
			position_ms: 0,
		},
	};

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
			if (data.item.id !== currentIdMusic) {
				let currentArtists = formatArtists(data.item.artists);
				let altCurrentMusic = `Tocando agora: ${data.item.name} de ${currentArtists}`;

				currentIdMusic = data.item.id;
				playerTags.artist.textContent = currentArtists;
				playerTags.image.alt = altCurrentMusic;
				playerTags.image.src = data.item.album.images[2].url;
				playerTags.musicName.textContent = data.item.name;
				playbackOffsetMS = data.progress_ms;

				toggleIconPlayPause(data.is_playing);
				autoScroll(playerTags.artist, playerTags.info);
				autoScroll(playerTags.musicName, playerTags.info);
			}
		}
	} else if (this.status == 401) {
		refreshAccessToken();
	} else {
		console.log(this.responseText);
	}
}

function checkDefaultPlaylist() {
	let formatedID = "spotify:playlist:" + PLAYLIST_ID;

	if (currentPlaylist === formatedID) {
		return true;
	} else {
		return false;
	}
}

function formatArtists(artists) {
	let artistNames = artists.map((artist) => artist.name);

	if (artistNames.length === 1) {
		return artistNames[0];
	} else if (artistNames.length === 2) {
		return `${artistNames[0]} e ${artistNames[1]}`;
	} else {
		let lastArtistName = artistNames.pop();
		let formattedArtists = artistNames.join(", ") + ` e ${lastArtistName}`;

		return formattedArtists;
	}
}
