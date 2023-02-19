import { PHRASES } from "../constants/phrases.js";

function renderPhrase(authorTag, quoteTag) {
	const phrases = PHRASES.phrases;
	const randomIndex = Math.floor(Math.random() * phrases.length);

	authorTag.textContent = phrases[randomIndex].author;
	quoteTag.textContent = phrases[randomIndex].quote;
}

export default renderPhrase;
