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
				return this.assignSocketToUser(socket, foundDriver);
			} else {
				this.createUser(username, userType, socket);
			}

			this.sendEvent(socket, { from: "Admin", message: "Welcome to Car Order App" }, "joinSession");
		}
	}
}

module.exports = OrderingApp;