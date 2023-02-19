import { PHRASES } from "../constants/phrases.js";

const phrases = PHRASES.phrases;
const randomIndex = Math.floor(Math.random() * phrases.length);

const authorTag = document.querySelector(".card__author");
const quoteTag = document.querySelector(".card__phrase");

authorTag.textContent = phrases[randomIndex].author;
quoteTag.textContent = phrases[randomIndex].quote;
