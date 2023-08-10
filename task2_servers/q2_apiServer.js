const http = require("http");
const fs = require("fs");

const items = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));

const bodyParser = (req, res, cb) => {
	let reqBody = "";
	req.on("data", (chunk) => {
		reqBody += chunk.toString();
	});
	req.on("end", () => {
		req.body = JSON.parse(reqBody);

		cb(req, res);
	});
};

const handleRequest = (req, res) => {
	if (req.url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.write("Welcome to my API!");
		return res.end();
	}

	// Get all items
	if (req.url === "/v1/items" && req.method === "GET") {
		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		res.write(JSON.stringify({ message: "success", data: items }));
		return res.end();
	}

	// Create a new item
	if (req.url === "/v1/items" && req.method === "POST") {
		const item = {
			id: Math.floor(Math.random() * 100),
			...req.body,
		};
		items.push(item);
		fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				console.log(err.message);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(500);
				res.write(JSON.stringify({ message: err.message, data: null }));
				return res.end();
			}

			console.log("New item added to the database");
		});
		res.setHeader("Content-Type", "application/json");
		res.writeHead(201);
		res.write(JSON.stringify({ message: "Item Added", data: item }));
		return res.end();
	}

	// Get one item
	if (req.url.startsWith("/v1/items") && req.method === "GET") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			res.setHeader("Content-Type", "application/json");
			res.writeHead(404);
			res.write(JSON.stringify({ message: "Item not found", data: null }));
			return res.end();
		}

		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		res.write(JSON.stringify({ message: "Items founded", data: foundItem }));
		return res.end();
	}

	// Update an item
	if (req.url.startsWith("/v1/items") && req.method === "PUT") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			res.setHeader("Content-Type", "application/json");
			res.writeHead(404);
			res.write(JSON.stringify({ message: "Item not found", data: null }));
			return res.end();
		}

		items.map((item) => {
			if (item.id === id) {
				Object.entries(req.body).map((info) => (item[info[0]] = info[1]));
			}
		});
        fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				console.log(err.message);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(500);
				res.write(JSON.stringify({ message: err.message, data: null }));
				return res.end();
			}

			console.log("Item updated in the database");
		});

		res.setHeader("Content-Type", "application/json");
		res.writeHead(201);
		res.write(JSON.stringify({ message: "Item Updated", data: foundItem }));
		return res.end();
	}

    // Delete an item
	if (req.url.startsWith("/v1/items") && req.method === "DELETE") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			res.setHeader("Content-Type", "application/json");
			res.writeHead(404);
			res.write(JSON.stringify({ message: "Item not found", data: null }));
			return res.end();
		}

		items.splice(items.findIndex(item => item.id === id), 1);
        fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				console.log(err.message);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(500);
				res.write(JSON.stringify({ message: err.message, data: null }));
				return res.end();
			}

			console.log("Item deleted from database");
		});

		res.setHeader("Content-Type", "application/json");
		res.writeHead(201);
		res.write(JSON.stringify({ message: "Item Deleted", data: null }));
		return res.end();
	}
};

const server = http.createServer((req, res) =>
	bodyParser(req, res, handleRequest)
);

const PORT = 5003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
