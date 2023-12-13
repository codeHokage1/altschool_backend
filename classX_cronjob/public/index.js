const form = document.querySelector("#form");
const actionSection = document.querySelector(".action-section");

const host = window.location.host;
const protocol = window.location.protocol;

console.log(host, protocol);
form.addEventListener("submit", async (e) => {
	e.preventDefault();

	// change the action section to a loading spinner
   actionSection.classList.add("loading");
	actionSection.innerHTML = `
      <img src="https://media.giphy.com/media/nCSD6GQcXlQI0/giphy.gif" alt="loading" />
      <h2>We are adding your details up!</h2>
      <p>Happy Birthday in advance! This makes us the first to wish you 😉🎉</p>
   `;

	// send request to server
	const data = {
		username: form.username.value,
		email: form.email.value,
		date_of_birth: form.dob.value
	};

	try {
		const response = await fetch(`${protocol}://${host}/birthdays`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		// change the action section to a success message
		if (response.status === 201) {
         actionSection.classList.remove("loading");
         actionSection.classList.add("success");
			actionSection.innerHTML = `
            <img src="https://media.giphy.com/media/LzwcNOrbA3aYvXK6r7/giphy.gif" alt="Birthday" />
            <h2>We have got your details!</h2>
            <p>As you can see, we are already preapring! 😎 See you on your amazing day. 🚀</p>
         `;
		}
	} catch (error) {
		console.log(error);
      actionSection.classList.remove("loading");
      actionSection.classList.add("error");

		// change the action section to an error message
		actionSection.innerHTML = `
         <img src="https://media.giphy.com/media/mvyvXwL26FfAtRCLPk/giphy.gif" alt="Oops" />
         <h3>Oops! An error occured. Please try again in a short while.</h3>
      `;
	}
});
