function renderClockAndCalendar() {
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
	const clock = document.getElementById("clock");
	const fullDate = document.getElementById("date");

	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	clock.textContent = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
	fullDate.textContent = `${day < 10 ? "0" + day : day} de ${months[month]} de ${year}`;
}

export default renderClockAndCalendar;
