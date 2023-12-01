const username = window.location.search.split("=")[1];
console.log(username);
const alertsBox = document.querySelector(".alerts");


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

socket.on("customerCreated", data => {
   console.log("Customer created");
   localStorage.setItem("customerId", data.id);
})

socket.on("joinSession", data => {
   const alert = document.createElement("p");
   alert.classList.add("alert");
   alert.textContent = `${data.from}: ${data.message}`;
   alertsBox.appendChild(alert);
});