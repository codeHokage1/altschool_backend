const app = require("../server");

const request = require("supertest");

describe("API Home", () => {
	it("GET / - should return a welcome message", async () => {
		const expected = "Welcome to my API!";

		const response = await request(app).get("/");

		expect(response.statusCode).toEqual(200);
		expect(response.text).toEqual(expected);
	});

	it("GET /unknown - should return route not found", async () => {
		const expected = {
			message: "This route does not exist.",
			data: null
		};

        const response = await request(app).get("/unknown");

        expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual(expected);
	});

    // process.exit(1);
});
