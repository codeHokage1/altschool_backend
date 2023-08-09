const http = require("http");
const fs = require("fs");

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

	if (req.url === "/v1/items" && req.method === "GET") {
		const items = fs.readFile("./data/items.json", (err, data) => {
			if (err) {
				console.log(err.message);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(500);
				res.write(JSON.stringify({ message: err.message, data: null }));
				return res.end();
			}

            try {
                const items = JSON.parse(data);
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.write(JSON.stringify({ message: "success", data: items }));
                return res.end();
            } catch (error) {
                console.log(error.message);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(500);
				res.write(JSON.stringify({ message: err.message, data: null }));
				return res.end();
            }
		});
	}
};

const server = http.createServer((req, res) =>
	bodyParser(req, res, handleRequest)
);

const PORT = 5003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
