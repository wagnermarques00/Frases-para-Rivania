function autoScroll(text, container) {
	var texWidth = measureElementWidth(text);

	if (texWidth <= container.offsetWidth) {
		text.style.animation = "none";
	} else {
		text.style.animation = "15s linear infinite scroll";
	}
}

function measureElementWidth(text) {
	var tmp = document.createElement("span");

	tmp.style.fontSize = "1.5rem";
	tmp.style.visibility = "hidden";
	tmp.innerText = text.innerText;

	document.body.appendChild(tmp);
	var texWidth = tmp.offsetWidth;
	document.body.removeChild(tmp);

	return texWidth;
}

export default autoScroll;
