const app = require("../app");
const User = require("../models/User");
const Article = require("../models/Article");
const { connect } = require("./tempoDatabase");
const bcrypt = require("bcrypt");
const { calculateReadingTime } = require("../utils/helperFunctions");

const request = require("supertest");

describe("Dealing with Articles", () => {
	let connection;
	let newUser;
	// before hook
	beforeAll(async () => {
		connection = await connect();
	});

	beforeEach(async () => {
		newUser = await User.create({
			first_name: "Ayo",
			last_name: "Sodiq",
			email: "ayo1@gmail.com",
			password: await bcrypt.hash("abc123", 10)
		});
	});

	afterEach(async () => {
		await connection.cleanup();
	});

	// after hook
	afterAll(async () => {
		await connection.disconnect();
	});

	it("POST /articles - CREATE AN ARTICLE: should return sucessful IF logged in", async () => {
		const expected = {
			message: "Article created successfully",
			data: expect.any(Object)
		};

		//Log in newUser
		const loggedInUser = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		const response = await request(app)
			.post("/articles")
			.set("Cookie", [`jwt=${loggedInUser.body.token}`])
			.send({
				title: "Hello there",
				description: "Hello there desc",
				body: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
			});

		// console.log(response.body);
		expect(response.statusCode).toEqual(201);
		expect(response.body).toMatchObject(expected);
	});

	it("POST /articles - CREATE AN ARTICLE: should return erros IF NOT logged in", async () => {
		const expected = {
			message: "Kindly Login!",
			data: null
		};

		const response = await request(app).post("/articles").send({
			title: "Hello there",
			description: "Hello there desc",
			body: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
		});

		// console.log(response.body);
		expect(response.statusCode).toEqual(401);
		expect(response.body).toMatchObject(expected);
	});

	it("GET /articles - GET ALL ARTICLES: should return all PUBLISHED articles, logged-in or not", async () => {
		const expected = {
			message: "All Articles fetched successfully",
			data: {
				allArticles: expect.any(Array),
				page: expect.any(Number),
				limit: expect.any(Number),
				articlesCount: expect.any(Number)
			}
		};

		const response = await request(app).get("/articles");

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject(expected);
	});

	it("GET /articles/my-articles - GET ALL MY ARTICLES: should return all articles of Logged-in user", async () => {
		const expected = {
			message: expect.any(String),
			data: expect.any(Object)
		};

		// Log in newUser
		const loggedInUser = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		const response = await request(app)
			.get("/articles/my-articles")
			.set("Cookie", [`jwt=${loggedInUser.body.token}`])

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject(expected);
	});

	it("GET /articles/:id - GET ONE ARTICLE: should return one PUBLISHED article by id, logged-in or not", async () => {
		const expected = {
			message: "Article fetched successfully",
			data: expect.any(Object)
		};

		// Log in newUser
		const loggedInUser = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		// Create an article
		const newArticle = await request(app)
			.post("/articles")
			.set("Cookie", [`jwt=${loggedInUser.body.token}`])
			.send({
				title: "Hello there",
				description: "Hello there desc",
				body: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
			});
		const response = await request(app).get(`/articles/${newArticle.body.data._id}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject(expected);
	});

    it("PUT /articles/:id - UPDATE ONE ARTICLE: should update an article written by logged-in user", async () => {
		const expected = {
			message: "Article Updated successfully",
			data: expect.any(Object)
		};

		// Log in newUser
		const loggedInUser = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		// Create an article
		const newArticle = await request(app)
			.post("/articles")
			.set("Cookie", [`jwt=${loggedInUser.body.token}`])
			.send({
				title: "Hello there",
				description: "Hello there desc",
				body: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
			});

		const response = await request(app)
            .put(`/articles/${newArticle.body.data._id}`)
            .set("Cookie", [`jwt=${loggedInUser.body.token}`])
			.send({
				state: "published"
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toMatchObject(expected);
	});


    it("DELETE /articles/:id - DELETE ONE ARTICLE: should delete an article written by logged-in user", async () => {
		const expected = {
			message: "Article deleted successfully",
			data: expect.any(Object)
		};

		// Log in newUser
		const loggedInUser = await request(app)
			.post("/auth/signin")
			.set("content-type", "application/json")
			.send({ email: "ayo1@gmail.com", password: "abc123" });

		// Create an article
		const newArticle = await request(app)
			.post("/articles")
			.set("Cookie", [`jwt=${loggedInUser.body.token}`])
			.send({
				title: "Hello there",
				description: "Hello there desc",
				body: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
			});

		const response = await request(app)
            .delete(`/articles/${newArticle.body.data._id}`)
            .set("Cookie", [`jwt=${loggedInUser.body.token}`])
			

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject(expected);
	});
});
