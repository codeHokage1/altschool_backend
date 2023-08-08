const http = require("http");

const server = http.createServer((req, res) => {
	if (req.url === "/") {
		res.end("Welcome to our home page");
	}

	if (req.url === "/v1/students" && req.method === "POST") {
		// console.log(req.body);
		let requestBody = "";

		req.on("data", chunk => {
            requestBody += chunk.toString();
        });
        req.on("end", () => {
            console.log(requestBody);
            console.log(JSON.parse(requestBody));
            res.end("Data received");
        });
		// res.end("Data received");
	}
});

const PORT = 5002;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
