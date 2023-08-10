const http = require("http");
const fs = require("fs");

// import all items from items.json
const items = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));

// function that helps get data in the body of request
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

// function that handles the responses to be sent
const handleResponse = (req, res, statusCode, info) => {
	res.setHeader("Content-Type", "application/json");
	res.writeHead(statusCode);
	res.write(JSON.stringify(info));
	return res.end();
};

// function that handles request
const handleRequest = (req, res) => {
	if (req.url === "/") {
		return handleResponse(req, res, 200, "Welcome to my API!");
	}

	// Get all items
	if (req.url === "/v1/items" && req.method === "GET") {
		return handleResponse(req, res, 200, { message: "success", data: items });
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
				return handleResponse(req, res, 500, {
					message: err.message,
					data: null,
				});
			}

			console.log("New item added to the database");
		});
		return handleResponse(req, res, 201, { message: "Item Added", data: item });
	}

	// Get one item
	if (req.url.startsWith("/v1/items") && req.method === "GET") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			return handleResponse(req, res, 404, {
				message: "Item not found",
				data: null,
			});
		}

		return handleResponse(req, res, 200, {
			message: "Items founded",
			data: foundItem,
		});
	}

	// Update an item
	if (req.url.startsWith("/v1/items") && req.method === "PUT") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			return handleResponse(req, res, 404, {
				message: "Item not found",
				data: null,
			});
		}

		items.map((item) => {
			if (item.id === id) {
				Object.entries(req.body).map((info) => (item[info[0]] = info[1]));
			}
		});
		fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				return handleResponse(req, res, 500, {
					message: err.message,
					data: null,
				});
			}

			console.log("Item updated in the database");
		});

		return handleResponse(req, res, 201, {
			message: "Items Updated",
			data: foundItem,
		});
	}

	// Delete an item
	if (req.url.startsWith("/v1/items") && req.method === "DELETE") {
		const id = Number(req.url.split("/")[3]);
		const foundItem = items.find((item) => item.id === Number(id));

		if (!foundItem) {
			return handleResponse(req, res, 404, {
				message: "Item not found",
				data: null,
			});
		}

		items.splice(
			items.findIndex((item) => item.id === id),
			1
		);
		fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				return handleResponse(req, res, 500, {
					message: err.message,
					data: null,
				});
			}

			console.log("Item deleted from database");
		});

		return handleResponse(req, res, 201, {
			message: "Item Deleted",
			data: null,
		});
	}
};

const server = http.createServer((req, res) =>
	bodyParser(req, res, handleRequest)
);

const PORT = 5003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
