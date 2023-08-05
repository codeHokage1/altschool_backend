// Using the HTTP module
const http = require("http");

// Question 1: Create an http server
const requestListener = (req, res) => {
	res.writeHead(200);
	res.write("Hello world");
	res.end();
};

const server = http.createServer(requestListener);

// Question 2: Return “Hello world” from the response
const PORT = 5001;
const host = "localhost";

server.listen(PORT, host, () => {
	console.log(`Server listening on http://${host}:${PORT}`);
});
