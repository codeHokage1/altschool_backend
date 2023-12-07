const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server);
require("dotenv").config();

const OrderingApp = require("./entities/OrderingApp");

app.use(express.static(path.join(__dirname, "public")));

const orderingApp = new OrderingApp();

io.on("connection", (socket) => {
	console.log("A user connected");
	const { username, userType, userId } = socket.handshake.query;

	orderingApp.joinSession(socket);
	orderingApp.displayOrders(socket);

	socket.on("requestRide", async (orderData) => {
		const newOrder = await orderingApp.requestOrder(orderData);
		console.log("Order requested at the server level: ", newOrder)
      io.to("drivers").emit("orderRequested", newOrder);
	});

	socket.on("acceptOrder", async (data) => {
		const acceptedOrder = await orderingApp.acceptOrder(data);
      io.to("drivers").emit("orderAccepted", acceptedOrder);
	});

	socket.on("rejectOrder", async (data) => {
		await orderingApp.rejectOrder(data);
	});

	socket.on("finishOrder", async (data) => {
		await orderingApp.finishOrder(data);
	});
});

app.get("/customer", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "customer.html"));
});

app.get("/driver", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "driver.html"));
});

// server.listen(process.env.PORT, () => {
// 	console.log(`Listening on port ${process.env.PORT}`);
// });

module.exports = server;
