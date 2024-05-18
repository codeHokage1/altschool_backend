const serverUrl = `https://picklyft.onrender.com`;
const form = document.querySelector("#login-form");
const cta = document.querySelector(".cta");

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

// focus on the username input field when cta is clicked
cta.addEventListener("click", () => {
	document.querySelector("#username").focus();
});
