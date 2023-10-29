const app = require("../app");
const User = require("../models/User");
const { connect } = require("./tempoDatabase");

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

	it("POST /auth/signup - should return sucessful with correct parameters", async () => {
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

	// it("GET /unknown - should return route not found", async () => {
	// 	const expected = {
	// 		message: "Route not found"
	// 	};

	// 	const response = await request(app).get("/unknown");

	// 	expect(response.statusCode).toEqual(404);
	// 	expect(response.body).toEqual(expected);
	// });
});
