const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

	if (req.url === "/" || req.url === "/index.html") {
		const file = fs.readFileSync("./views/index.html");
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.write(file);
		return res.end();
	}

	const file = fs.readFileSync("./views/404.html");
	res.setHeader("Content-Type", "text/html");
	res.writeHead(404);
	res.write(file);
	return res.end();
});

const PORT = 5001;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
