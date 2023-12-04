const username = window.location.search.split("=")[1];
console.log(username);
const alertsBox = document.querySelector(".alerts");
const ordersBox = document.querySelector(".orders");

const socket = io({
	query: {
		username,
		userType: "driver",
		userId: localStorage.getItem("driverId")
	}
});

socket.on("connect", () => {
	console.log("Connected to server");
});

socket.on("driverCreated", (data) => {
	console.log("Driver created");
	localStorage.setItem("driverId", data.id);
});

socket.on("joinSession", (data) => {
	const alert = document.createElement("p");
	alert.classList.add("alert");
	alert.textContent = `${data.from}: ${data.message}`;
	alertsBox.appendChild(alert);
});

socket.on("orderRequested", (order) => {
   console.log(order)
	const orderElement = document.createElement("div");
   orderElement.id = `order-${order.id}`;
	orderElement.classList.add("order");
	orderElement.innerHTML = `
      <p>A new ride order is in.</p>
      <p>Order id: ${order.id}</p>
      <p>Customer: ${order.customer.name}</p>
      <p>From: ${order.currentLocation}</p>
      <p>To: ${order.destination}</p>
      <p>Price: ${order.price}</p>
      <button class="accept" id="accept-order-${order.id}">Accept</button>
      <button class="reject" id="reject-order-${order.id}">Reject</button>
   `;
	ordersBox.appendChild(orderElement);

	const acceptButton = document.querySelector(`#accept-order-${order.id}`);
	const rejectButton = document.querySelector(`#reject-order-${order.id}`);

	acceptButton.addEventListener("click", () => {
		const driverId = localStorage.getItem("driverId");
		socket.emit("acceptOrder", { order, driverId });
      acceptButton.innerHTML = "Order Accepted";
      acceptButton.disabled = true;
      rejectButton.remove();

	});

	rejectButton.addEventListener("click", () => {
		socket.emit("rejectOrder", { order, driverId });
	});
});

socket.on("orderAccepted", (order) => {
	const acceptButton = document.querySelector(`#accept-order-${order.id}`);
	const rejectButton = document.querySelector(`#reject-order-${order.id}`);

	if (acceptButton) {
		acceptButton.innerHTML = "Order Accepted";
      acceptButton.disabled = true;
	}
	if (rejectButton) {
		rejectButton.remove();
	}
});

socket.on("overtime", (order) => {
	const timedOutOrder = document.querySelector(`#order-${order.id}`);
   timedOutOrder.remove();
});

socket.on("orderRejected", (order) => {
	const acceptButton = document.querySelector(`#accept-order-${order.id}`);
	const rejectButton = document.querySelector(`#reject-order-${order.id}`);

	rejectButton.innerHTML = "Order Rejected";
	acceptButton.remove();
});
