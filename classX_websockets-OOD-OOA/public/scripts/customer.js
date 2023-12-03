const username = window.location.search.split("=")[1];
console.log(username);
const alertsBox = document.querySelector(".alerts");
const ordersBox = document.querySelector(".orders");
const requestForm = document.querySelector("#requestRide");
const processBox = document.querySelector(".order-process");

const socket = io({
	query: {
		username,
		userType: "customer",
		userId: localStorage.getItem("customerId")
	}
});

socket.on("connect", () => {
	console.log("Connected to server");
});

socket.on("customerCreated", (data) => {
	console.log("Customer created");
	localStorage.setItem("customerId", data.id);
});

socket.on("joinSession", (data) => {
	const alert = document.createElement("p");
	alert.classList.add("alert");
	alert.textContent = `${data.from}: ${data.message}`;
	alertsBox.appendChild(alert);
});

requestForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const currentLocation = requestForm.elements.currentLocation.value;
	const destination = requestForm.elements.destination.value;
	const price = requestForm.elements.price.value;
	socket.emit("requestRide", {
		customerId: localStorage.getItem("customerId"),
		currentLocation,
		destination,
		price
	});
	console.log("Order requested");
	requestForm.reset();
});

socket.on("orderRequested", (order) => {
   const processElement = document.createElement("div");
   processElement.classList.add("process");
   processElement.innerHTML = `
      <p>Your order is in process.</p>
      <p>Order id: ${order.id}</p>
      <p>From: ${order.currentLocation}</p>
      <p>To: ${order.destination}</p>
      <p>Price: ${order.price}</p>
      <p>Waiting for a driver.........</p>
   `;
   processBox.appendChild(processElement);
})

socket.on("orderAccepted", (order) => {
   processBox.innerHTML = "";
	const orderElement = document.createElement("div");
	orderElement.classList.add("order");
	orderElement.innerHTML = `
      <p>Your order is accepted.</p>
      <p>Order id: ${order.id}</p>
      <p>Driver: ${order.driver.name}</p>`;
   ordersBox.appendChild(orderElement);
});

socket.on("overtime", order => {
   // console.log("Your order " + order.id + " is not accepted in time");
   processBox.innerHTML = `
      <p>Apologies. We couldn't get a driver for you at this moment. Kindly try again in a few minutes</p>
   `;

   setTimeout(() => {
      processBox.innerHTML = "";
   }, 5000);
}) 
