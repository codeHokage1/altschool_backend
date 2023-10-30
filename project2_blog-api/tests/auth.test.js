const app = require("../app");
const User = require("../models/User");
const { connect } = require("./tempoDatabase");
const bcrypt = require("bcrypt");

const request = require("supertest");

describe("Signup and Signin", () => {
	let connection;
	// before hook
	beforeAll(async () => {
		connection = await connect();
	});

	afterEach(async () => {
		await connection.cleanup();
	});

	// after hook
	afterAll(async () => {
		await connection.disconnect();
	});

	it("POST /auth/signup - REGISTER: should return sucessful with correct parameters", async () => {
		const expected = {
			message: "User created successfully",
			data: expect.any(Object),
			token: expect.any(String)
		};

		const response = await request(app)
			.post("/auth/signup")
			.send({ first_name: "Ayo", last_name: "Sodiq", email: "ayo1@gmail.com", password: "123456" });

		// console.log(response.body);
		expect(response.statusCode).toEqual(201);
		expect(response.body).toMatchObject(expected);
	});

	it("POST /auth/signin - LOGIN: should return sucessful with correct parameters", async () => {
		const expected = {
			message: "User signed in successfully",
			data: expect.any(Object),
			token: expect.any(String)
		};

		await User.create({
			first_name: "Ayo",
			last_name: "Sodiq",
			email: "ayo1@gmail.com",
			password: await bcrypt.hash("abc123", 10)
		});

		const response = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		expect(response.statusCode).toEqual(201);
		expect(response.body).toMatchObject(expected);
	});
});
