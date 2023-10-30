const app = require("../app");

const request = require("supertest");

describe("API Home and Unfound route", () => {
    
	it("GET / - should return a welcome message", async () => {
		const expected = "<h1>Welcome to The blog API!</h1>";

		const response = await request(app).get("/");

		expect(response.statusCode).toEqual(200);
		expect(response.text).toContain(expected);
	});

	it("GET /unknown - should return route not found", async () => {
		const expected = {
			message: "Route not found"
		};

        const response = await request(app).get("/unknown");

        expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual(expected);
	});

});
