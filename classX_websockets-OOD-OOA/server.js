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
   const {username, userType, userId} = socket.handshake.query;
   // console.log({username, userType, userId});

   orderingApp.joinSession(socket);
})

app.get("/customer", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "customer.html"));
});

app.get("/driver", (req, res) => {
   res.sendFile(path.join(__dirname, "public", "driver.html"));
});

server.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
})
