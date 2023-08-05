const http = require("http");

const reqListener = (req, res) => {
	res.writeHead(200);
	res.write("Hello there!");
	res.end();
};

const server = http.createServer(reqListener);
server.listen(8080, "localhost", () =>
	console.log("Server is listening on port 8080")
);
