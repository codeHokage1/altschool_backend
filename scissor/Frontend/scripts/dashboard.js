const apiURL = "https://scissor-yc9p.onrender.com";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

if (!token) {
	window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", getLinks);

let loggedinUser = document.getElementById("loggedin-user");
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

async function getLinks() {
	loggedinUser.innerHTML = username;
	await fetch(`${apiURL}/links`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if (data.status === 401) {
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				window.location.href = "index.html";
			} else {
				let links = data.data;
				if (links.length === 0) {
					linksContainter.innerHTML = `<p>No links available. Scissor a link to get started.</p>`;
				} else {
					links = links.reverse();
					links.forEach((link, index) => {
						linksContainter.innerHTML += `
						<div class="link-card" data-id="${link._id}">
							<div class="link-details">
								<h3 class="link-description">${link.description}</h3>
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
								<div class="link-action delete-link" data-id="${link._id}">
									<img src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash"/>
									<p>Delete</p>
								</div>
							</div>
						</div>

						<div class="link-details-modal modal" data-id="${link._id}" id="${link._id}-modal">
							<div class="modal-content link-modal-content">
								<div class="modal-header link-modal-header">
									<p>Your link details</p>
									<span class="close-modal link-modal-close close" data-id="${link._id}">&times;</span>
								</div>
	
								<div class="modal-body link-modal-body">
									<section class="brief">
										<h3>${link.description}</h3>
										<a id="link-to-copy-${index}" href="${link.scissorURL}" target="_blank">${link.scissorURL}</a>
										<p class="original-link">${link.originalURL}</p>
										<div class="link-analysis">
											<p>📅 ${new Date(link.createdAt).toDateString()}</p>
										</div>
									</section>

									<section class="qr-and-engagements">
										<div class="qr-code">
											<h4>QRCode</h4>
											<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link.scissorURL}" alt="qr-code"/>
										</div>
										<div class="engagements">
											<h4>Engagements</h4>
											<p>${link.analytics.engagements} ${link.analytics.engagements === 1 ? "Click" : "Clicks"}</p>
										</div>
									</section>

									<section class="location">
										<p>Lorem Ipsum.</p>
									</section>

									<section class="engagement-chart">
										<p>Lorem Ipsum.</p>
									</section>
								</div>
							</div>
						</div>
						`;
					});

					const linkModalOpen = document.querySelectorAll(".link-description");
					linkModalOpen.forEach((link) => {
						link.addEventListener("click", function () {
							const modalId = link.parentElement.parentElement.getAttribute("data-id");
							const modal = document.getElementById(`${modalId}-modal`);
							modal.style.display = "block";
						});
					});

					const closeLinkDetailsModal = document.querySelectorAll(".close-modal");
					closeLinkDetailsModal.forEach((button) => {
						button.addEventListener("click", function () {
							const modalId = button.getAttribute("data-id");
							console.log(modalId);
							const modal = document.getElementById(`${modalId}-modal`);
							modal.style.display = "none";
						});

						window.onclick = function (event) {
							const modalId = button.getAttribute("data-id");
							const modal = document.getElementById(`${modalId}-modal`);
							if (event.target == modal) {
								modal.style.display = "none";
							}
						};
					});

					const copyToClipboardButtons = document.querySelectorAll(".copy-to-clipboard");
					const deleteLinkButtons = document.querySelectorAll(".delete-link");
					console.log(copyToClipboardButtons.length);
					console.log(deleteLinkButtons.length);

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

					deleteLinkButtons.forEach((button) => {
						button.addEventListener("click", function () {
							const linkId = button.getAttribute("data-id");
							console.log(linkId);
							deleteLink(linkId);
						});
					});
				}
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

async function deleteLink(linkId) {
	await fetch(`${apiURL}/links/${linkId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if (data.status === 401) {
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				window.location.href = "index.html";
			} else {
				linksContainter.innerHTML = "";
				getLinks();
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
