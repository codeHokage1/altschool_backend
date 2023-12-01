const username = window.location.search.split("=")[1];
console.log(username);
const alertsBox = document.querySelector(".alerts");

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

socket.on("driverCreated", data => {
   console.log("Driver created");
   localStorage.setItem("driverId", data.driverId);
})

socket.on("joinSession", data => {
   const alert = document.createElement("p");
   alert.classList.add("alert");
   alert.textContent = `${data.from}: ${data.message}`;
   alertsBox.appendChild(alert);
});