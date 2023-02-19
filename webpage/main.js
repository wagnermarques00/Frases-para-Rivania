import autoScroll from "./src/js/autoScrollPlayer.js";
import clockUpdate from "./src/js/clock.js";
import renderPhoto from "./src/js/photosRender.js";
import renderPhrase from "./src/js/phrasesRender.js";

const backgroundToggle = document.getElementById("dn");
const authorTag = document.querySelector(".card__author");
const artist = document.querySelector("#info-artist");
const body = document.querySelector("body");
const card = document.getElementById("card");
const cardImage = document.getElementById("card__image");
const clock = document.getElementById("clock-wrapper");
const container = document.querySelector(".player__wrapper");
const header = document.getElementById("header");
const headerTitle = document.getElementById("header-title");
const music = document.querySelector("#info-music");
const photoTag = document.querySelector(".card__image");
const player = document.getElementById("player");
const playerImage = document.getElementById("player__image");
const quoteTag = document.querySelector(".card__phrase");

setInterval(clockUpdate, 1000);
renderPhoto(photoTag);
renderPhrase(authorTag, quoteTag);
autoScroll(music, artist, container);
