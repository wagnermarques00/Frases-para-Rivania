let actualMinute = "";
let actualDay = "";

function renderClockAndCalendar() {
	const date = new Date();
	const clock = document.getElementById("clock");
	const fullDate = document.getElementById("date");

	renderClock(date, clock);
	renderDate(date, fullDate);
}

function renderClock(date, clock) {
	const hours = date.getHours();
	const minutes = date.getMinutes();

	if (actualMinute != minutes) {
		actualMinute = minutes;
		clock.textContent = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
	}
}

function renderDate(date, fullDate) {
	const months = [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro",
	];

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	if (actualDay != day) {
		actualDay = day;
		fullDate.textContent = `${day < 10 ? "0" + day : day} de ${months[month]} de ${year}`;
	}
}

export default renderClockAndCalendar;
