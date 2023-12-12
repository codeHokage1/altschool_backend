const serverUrl = `https://picklyft.onrender.com`;
const form = document.querySelector("#login-form");

console.log(serverUrl);

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = event.target.elements.username.value;
	const userType = event.target.elements["user-type"].value;

	if (userType === "customer") {
		window.location.href = `${serverUrl}/customer?username=${username}`;
	} else if (userType === "driver") {
		window.location.href = `${serverUrl}/driver?username=${username}`;
	}
});
