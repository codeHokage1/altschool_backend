const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	if (req.url === "/" || req.url === "/index.html") {
		const webPage = fs.readFileSync("./views/index.html");
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.write(webPage);
		return res.end();
	}

	const webPage = fs.readFileSync("./views/404.html");
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.write(webPage);
	return res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
