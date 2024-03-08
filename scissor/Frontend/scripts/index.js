let regModal = document.getElementById("reg-modal");
let loginModal = document.getElementById("login-modal");

let regBtn = document.getElementById("reg-btn");
let loginBtn = document.getElementById("login-btn");

// Get the <span> element that closes the modal
let closeReg = document.getElementById("close-reg");
let closeLogin = document.getElementById("close-login");

let regForm = document.getElementById("reg-form");
let loginForm = document.getElementById("login-form");

let regError = document.getElementById("reg-error");
let loginError = document.getElementById("login-error");

window.onclick = function (event) {
	console.log(event.target);
};

const apiURL = "https://d68f-105-113-33-165.ngrok-free.app";

// When the user clicks on the button, open the modal
regBtn.onclick = function () {
	regModal.style.display = "block";
};

loginBtn.onclick = function () {
	loginModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeReg.onclick = function () {
	regModal.style.display = "none";
};
closeLogin.onclick = function () {
	loginModal.style.display = "none";
	console.log("close login");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == regModal) {
		regModal.style.display = "none";
	} else if (event.target == loginModal) {
		loginModal.style.display = "none";
	}
};

regForm.onsubmit = async function (e) {
	e.preventDefault();
	if (regForm.password.value !== regForm.confirmPassword.value) {
		regError.style.display = "block";
		regError.innerHTML = "Passwords do not match. Kindly re-enter the passwords.";
		regForm.password.value = "";
		regForm.confirmPassword.value = "";
		return;
	}
	let formData = new FormData(regForm);
	let data = {};
	for (let [key, value] of formData.entries()) {
		if (key !== "confirmPassword") {
			data[key] = value;
		}
	}

	try {
		const response = await fetch(`${apiURL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		if (response.ok) {
			console.log("Form data sent successfully!");
			// Handle successful response here
		} else {
			console.error("Error:", response.statusText);
			regError.style.display = "block";
			regError.innerHTML = json.message;
			// Handle error response here
		}

		// const json = await response.json();
		// console.log(json);
		// console.log(response);
	} catch (error) {
		console.error("Error:", error);
		// Handle network errors here
	}
};

loginForm.onsubmit = async function (e) {
	e.preventDefault();
	let formData = new FormData(loginForm);
	let data = {};
	for (let [key, value] of formData.entries()) {
		data[key] = value;
	}

	try {
		const response = await fetch(`${apiURL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		if (response.ok) {
			console.log("Form data sent successfully!");
			console.log(json);
			localStorage.setItem("token", json.data.token);
			window.location.href = `dashboard.html`;
			// Handle successful response here
		} else {
			console.error("Error:", response.statusText);
			loginError.style.display = "block";
			loginError.innerHTML = json.message;
			// Handle error response here
		}

		// const json = await response.json();
		// console.log(json);
		// console.log(response);
	} catch (error) {
		console.error("Error:", error);
		// Handle network errors here
	}
};
