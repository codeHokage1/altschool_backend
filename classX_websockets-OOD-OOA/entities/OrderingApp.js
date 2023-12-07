const Customer = require("./Customer");
const Driver = require("./Driver");
const Order = require("./Order");
const Users = require("./UserModel");

class OrderingApp {
	constructor() {
		this.drivers = [];
		this.customers = [];
		this.orders = [];
		this.socketUserMap = new Map();
	}

	async displayOrders(socket) {
		const { username, userType, userId } = socket.handshake.query;

		const allStoredUsers = await Users.find({});
		console.log("All users and their orders: ", allStoredUsers);
		if (userType === "driver") {
			this.sendEvent(
				socket,
				this.orders.filter((order) => order.driver.id == userId),
				"displayOrders"
			);
		}

		if (userType === "customer") {
			this.sendEvent(
				socket,
				this.orders.filter((order) => order.customer.id == userId),
				"displayOrders"
			);
		}
	}

	sendEvent(socket, data, eventName) {
		socket.emit(eventName, data);
	}

	assignSocketToUser(socket, user) {
		console.log("Assigning socket to ", user.name);
		this.socketUserMap.set(user.id, socket);
	}

	async createUser(username, userType, socket) {
		switch (userType) {
			case "customer":
				const dbCustomer = await Users.create({
					user_name: username,
					user_type: "customer"
				});
				const customer = new Customer(username, dbCustomer._id);

				this.customers.push(customer);
				this.assignSocketToUser(socket, customer);
				this.sendEvent(socket, customer, "customerCreated");
				console.log("Customer created");
				return customer;
			case "driver":
				const dbDriver = await Users.create({
					user_name: username,
					user_type: "driver"
				});
				const driver = new Driver(username,  dbDriver._id);
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

	async requestOrder(order) {
		console.log("Requesting ride...");
		const { customerId, destination, currentLocation, price } = order;
		const foundCustomer = this.customers.find((customer) => customer.id == customerId);
		const newOrder = new Order(foundCustomer, destination, currentLocation, price);
		this.orders.push(newOrder);

		foundCustomer.requestRide(newOrder);

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

		// 		this.orders = this.orders.filter((order) => order.id != newOrder.id); // remove the order from the orders array
		// 	}
		// }, 10000); // if the order is not accepted in 1 minute, emit this
		console.log("Order at BE before returning for drivers: ", newOrder);
		return newOrder;
	}

	async acceptOrder({ order, driverId }) {
		const foundDriver = this.drivers.find((driver) => driver.id == driverId);
		const foundOrder = this.orders.find((orderInArr) => orderInArr.id == order.id);
		const driverSocket = this.socketUserMap.get(foundDriver.id);
		foundOrder.assignDriver(foundDriver);

		const dbCustomer = await Users.findOne({ _id: foundOrder.customer.id });
		dbCustomer.orders.push(foundOrder);
		await dbCustomer.save(); // save the order to the database for the customer

		const dbDriver = await Users.findOne({ _id: foundDriver.id });
		dbDriver.orders.push(foundOrder);
		await dbDriver.save(); // save the order to the database for the rider

		console.log("This is the order you just accepted: ", foundOrder);
		this.sendEvent(this.socketUserMap.get(foundOrder.customer.id), foundOrder, "orderAccepted");
		this.sendEvent(this.socketUserMap.get(foundDriver.id), foundOrder, "orderAccepted");
		driverSocket.leave("drivers"); // remove the driver from the drivers room
		return foundOrder;
	}

	async rejectOrder({ order, driverId }) {
		const foundDriver = this.drivers.find((driver) => driver.id == driverId);
		foundDriver.rejectRide(order);

		const dbDriver = await Users.findOne({ _id: foundDriver.id });
		dbDriver.orders = dbDriver.orders.filter((orderInArr) => orderInArr.id != order.id);
		await dbDriver.save(); // remove the order from the database for the driver

		this.sendEvent(this.socketUserMap.get(foundDriver.id), order, "orderRejected");
	}

	async finishOrder({ order, driverId }) {
		const foundDriver = this.drivers.find((driver) => driver.id == driverId);
		const foundOrder = this.orders.find((orderInArr) => orderInArr.id == order.id);
		const driverSocket = this.socketUserMap.get(foundDriver.id);
		driverSocket.join("drivers"); // add the driver back to the drivers room so they can receive orders

		foundOrder.status = "completed";

		const dbCustomer = await Users.findOne({ _id: foundOrder.customer.id });
		let dbOrderCustomer = dbCustomer.orders.find((orderInArr) => orderInArr.id == order.id);
		dbOrderCustomer.status = "completed";
		await dbCustomer.save(); // update the order to the database for the customer

		const dbDriver = await Users.findOne({ _id: foundDriver.id });
		let dbOrderDriver = dbDriver.orders.find((orderInArr) => orderInArr.id == order.id);
		dbOrderDriver.status = "completed";
		await dbDriver.save(); // update the order to the database for the rider

		this.sendEvent(this.socketUserMap.get(foundOrder.customer.id), foundOrder, "orderCompleted");
		return foundOrder;
	}
}

module.exports = OrderingApp;
