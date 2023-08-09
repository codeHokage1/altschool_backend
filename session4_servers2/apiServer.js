const http = require("http");

const students = [];

const bodyParser = (req, res, callback) => {
	let requestBody = "";

	try {
		req.on("data", (chunk) => {
			requestBody += chunk.toString();
		});
		req.on("end", () => {
			if (requestBody.length) {
				req.body = JSON.parse(requestBody);
			}

			callback(req, res);
		});
	} catch (error) {
		console.log(error.message);
		return error;
	}
};

const handleRequest = (req, res) => {
	if (req.url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.writeHead(200);
		res.write("Welcome to my API!");
		return res.end();
	}

	if (req.url === "/v1/students" && req.method === "POST") {
		const newStudent = {
			id: Math.floor(Math.random() * 700),
			...req.body,
		};
		students.push(newStudent);
		res.setHeader("Content-Type", "application/json");
		res.writeHead(201);
		res.write(JSON.stringify({ message: "Student Added", data: req.body }));
		return res.end();
	}

	if (req.url === "/v1/students" && req.method === "GET") {
		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		if (students.length) {
			res.write(JSON.stringify({ message: "Students Found", data: students }));
		} else {
			res.write(JSON.stringify({ message: "No Students", data: students }));
		}
		return res.end();
	}

	if (req.url.startsWith("/v1/students") && req.method === "GET") {
		const id = Number(req.url.split('/')[3]);
		const foundStudent = students.find(student => student.id === id);

		res.setHeader("Content-Type", "application/json");
		res.writeHead(200);
		if (foundStudent) {
			res.write(JSON.stringify({ message: "Student Found", data: foundStudent }));
		} else {
			res.write(JSON.stringify({ message: `Student with id ${id} not found`, data: null }));
		}
		return res.end();
	}

};

const server = http.createServer((req, res) =>
	bodyParser(req, res, handleRequest)
);

const PORT = 5002;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
