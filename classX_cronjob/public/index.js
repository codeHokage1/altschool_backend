const form = document.querySelector("#form");
const actionSection = document.querySelector(".action-section");

const host = window.location.host;

form.addEventListener("submit", async (e) => {
	e.preventDefault();

   // change the action section to a loading spinner
   actionSection.innerHTML = `
      <div class="d-flex justify-content-center">
         <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
         </div>
      </div>
   `;

   // send request to server
	const data = {
		username: form.username.value,
		email: form.email.value,
		date_of_birth: form.dob.value
	};

	try {
		const response = await fetch(`http://${host}/birthdays`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});


      // change the action section to a success message
      if(response.status === 201) {
         actionSection.innerHTML = `
            <h3 class="text-center text-success">User created successfully</h3>
         `;
      }
	} catch (error) {
		console.log(error);

      // change the action section to an error message
      actionSection.innerHTML = `
         <h3 class="text-center text-danger">An error occured</h3>
      `;
	}

	console.log(data);
});
