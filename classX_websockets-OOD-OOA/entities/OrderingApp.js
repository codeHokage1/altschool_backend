const Customer = require("./Customer");
const Driver = require("./Driver");
const Order = require("./Order");
class OrderingApp {
	constructor() {
		this.drivers = [];
		this.customers = [];
		this.orders = [];
		this.socketUserMap = new Map();
	}

	sendEvent(socket, data, eventName) {
		socket.emit(eventName, data);
	}

	assignSocketToUser(socket, user) {
		// console.log("Assigning socket to ", user);
		console.log("Assigning socket to ", user.name);
		this.socketUserMap.set(user.id, socket);
	}

	createUser(username, userType, socket) {
		switch (userType) {
			case "customer":
				const customer = new Customer(username);
				this.customers.push(customer);
				this.assignSocketToUser(socket, customer);
				this.sendEvent(socket, customer, "customerCreated");
				console.log("Customer created");
				return customer;
			case "driver":
				const driver = new Driver(username);
				this.drivers.push(driver);
				this.assignSocketToUser(socket, driver);
				this.sendEvent(socket, driver, "driverCreated");
				console.log("Driver created");
            socket.join("drivers");
				return driver;
			default:
				console.log("Invalid user type");
				break;
		}
	}

	joinSession(socket) {
		const { username, userType, userId } = socket.handshake.query;

		if (userType === "customer") {
			const foundCustomer = this.customers.find((customer) => customer.id == userId);

			if (foundCustomer) {
				return this.assignSocketToUser(socket, foundCustomer);
			} else {
				this.createUser(username, userType, socket);
			}

			this.sendEvent(socket, { from: "Admin", message: "Welcome to Car Order App" }, "joinSession");
		} else if (userType === "driver") {
			const foundDriver = this.drivers.find((driver) => driver.id == userId);
			if (foundDriver) {
            socket.join("drivers");
				return this.assignSocketToUser(socket, foundDriver);
			} else {
				this.createUser(username, userType, socket);
			}

			this.sendEvent(socket, { from: "Admin", message: "Welcome to Car Order App" }, "joinSession");
		}
	}

	requestOrder(order) {
		console.log("Requesting ride...");
		// console.log("These are the drivers in the system: ", this.drivers)
		// console.log("These are all the sockets in the system: ", this.socketUserMap)

		const { customerId, destination, currentLocation, price } = order;
		const foundCustomer = this.customers.find((customer) => customer.id == customerId);
		const newOrder = new Order(foundCustomer, destination, currentLocation, price);
		this.orders.push(newOrder);

		foundCustomer.requestRide(order);
		// for (let driver of this.drivers) {
		// 	if (!driver.isDriving) {
		// 		console.log("This driver is not driving and will receive order: ", driver);

		// 		this.sendEvent(this.socketUserMap.get(driver.id), newOrder, "orderRequested");
		// 	}
		// }

      // socket.to("drivers").emit("orderRequested", newOrder);
		this.sendEvent(this.socketUserMap.get(foundCustomer.id), newOrder, "orderRequested");
		console.log("Order requested");

		// setTimeout(() => {
		// 	if (newOrder.status == "pending") {
		// 		console.log("No drivers accepted the order");
		// 		console.log("Customer is: ", foundCustomer);
		// 		this.sendEvent(this.socketUserMap.get(foundCustomer.id), newOrder, "overtime");
		// 		for (let driver of this.drivers) {
		// 			if (!driver.isDriving) {
		// 				this.sendEvent(this.socketUserMap.get(driver.id), newOrder, "overtime");
		// 			}
		// 		}
		// 	}
		// }, 10000); // if the order is not accepted in 1 minute, emit this
		return newOrder;
	}

	acceptOrder({ order, driverId }) {
		const foundDriver = this.drivers.find((driver) => driver.id == driverId);
		const foundOrder = this.orders.find((orderInArr) => orderInArr.id == order.id);
		const driverSocket = this.socketUserMap.get(foundDriver.id);
      driverSocket.leave("drivers"); // remove the driver from the drivers room

		foundOrder.assignDriver(foundDriver);
		console.log("This is the order you just accepted: ", foundOrder);
		this.sendEvent(this.socketUserMap.get(foundOrder.customer.id), foundOrder, "orderAccepted");
		// this.sendEvent(this.socketUserMap.get(foundDriver.id), foundOrder, "orderAccepted");
      return foundOrder;
	}

	rejectOrder({ order, driverId }) {
		const foundDriver = this.drivers.find((driver) => driver.id == driverId);
		foundDriver.rejectRide(order);
		this.sendEvent(this.socketUserMap.get(foundDriver.id), order, "orderRejected");
	}
}

module.exports = OrderingApp;
