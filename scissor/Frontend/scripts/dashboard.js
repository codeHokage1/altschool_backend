const apiURL = "http://localhost:3000";

const token = localStorage.getItem("token");
console.log(token);

if (!token) {
	window.location.href = "index.html";
}

let scissorModal = document.getElementById("scissor-modal");
let closeScissor = document.getElementById("close-scissor");
let scissorForm = document.getElementById("scissor-form");
let scissorErr = document.getElementById("scissor-error");
let scissorBtn = document.getElementById("create-link");

const linksContainter = document.getElementById("link-list");

scissorBtn.onclick = function () {
	scissorModal.style.display = "block";
};

closeScissor.onclick = function () {
	scissorModal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == scissorModal) {
		scissorModal.style.display = "none";
	}
};

scissorForm.onsubmit = async function (e) {
	e.preventDefault();
	let formData = new FormData(scissorForm);
	let data = {};
	for (let [key, value] of formData.entries()) {
		data[key] = value;
	}

	try {
		let response = await fetch(`${apiURL}/links`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});
		let responseData = await response.json();
		console.log(responseData);
		if (response.ok) {
			// console.log(responseData.status);
			if (responseData.status && responseData.status === 400) {
				scissorErr.style.display = "block";
				scissorErr.innerHTML = responseData.message;
			} else {
				scissorModal.style.display = "none";
				linksContainter.innerHTML = "";
				scissorForm.reset();
				scissorErr.style.display = "none";
				getLinks();
			}
		} else {
			console.error("Error:", response.statusText);
			scissorErr.style.display = "block";
			scissorErr.innerHTML = responseData.message;
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

const getLinks = async () => {
	try {
		let response = await fetch(`${apiURL}/links`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		let data = await response.json();
		console.log(data);
		console.log(response);
		if (response.ok) {
			console.log("success");
			let links = data.data;
			if (links.length === 0) {
				linksContainter.innerHTML = `<p>No links available. Scissor a link to get started.</p>`;
			} else {
				links = links.reverse();
				links.forEach((link, index) => {
					linksContainter.innerHTML += `
						<div class="link-card">
							<div class="link-details">
								<h3>${link.description}</h3>
								<a id="link-to-copy-${index}" href="${link.scissorURL}" target="_blank">${link.scissorURL}</a>
								<p class="original-link">${link.originalURL}</p>
								<div class="link-analysis">
									<p>${link.analytics.engagements} ${link.analytics.engagements === 1 ? "Click" : "Clicks"}</p>
									<p>📅 ${new Date(link.createdAt).toDateString()}</p>
								</div>
							</div>
							<div class="link-actions">
								<div class="link-action copy-to-clipboard">
									<img src="https://img.icons8.com/dusk/64/copy.png" alt="copy"/>
									<p>Copy</p>
								</div>
								<div class="link-action delete-link">
									<img src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash"/>
									<p>Delete</p>
								</div>
							</div>							
						</div>
						`;
				});
			}
		} else {
			console.error("Error:", response.statusText);
			if (response.status === 401) {
				localStorage.removeItem("token");
				window.location.href = "index.html";
			}
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

getLinks();

const copyToClipboardButtons = document.querySelectorAll(".copy-to-clipboard");
console.log(copyToClipboardButtons.length);

copyToClipboardButtons.forEach((button) => {
	console.log(button);

	button.addEventListener("click", function () {
		console.log("clicked");
		const copyText = button.parentElement.parentElement.querySelector("a");
		console.log(copyText);
		console.log(copyText.innerHTML);
		const el = document.createElement("textarea");
		el.style.display = "none";
		el.value = copyText.innerHTML;
		document.body.appendChild(el);
		el.select();

		// copyText.select();
		el.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(copyText.innerHTML);
	});
});

// for (let i = 0; i < copyToClipboard.length; i++) {
// 	console.log(copyToClipboard[i]);
// 	copyToClipboard[i].addEventListener("click", function () {
// 		console.log("clicked");
// 		const copyText = document.getElementById(`link-to-copy-${i}`);
// 		console.log(copyText);
// 		console.log(copyText.innerHTML);
// 		const el = document.createElement("textarea");
// 		el.style.display = "none";
// 		el.value = copyText.innerHTML;
// 		document.body.appendChild(el);
// 		el.select();

// 		// copyText.select();
// 		el.setSelectionRange(0, 99999);
// 		navigator.clipboard.writeText(copyText.innerHTML);
// 	});
// }
