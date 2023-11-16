const express = require("express");
const { rateLimit } = require("express-rate-limit");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const cloud = require("./integration/cloudinary");

const app = express();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.post("/files", upload.single("file"), async function (req, res, next) {
	try {
		const cloudUpload = await cloud.uploader.upload(req.file.path);

		const deleteFile = await fs.unlinkSync(req.file.path);

		return res.json({
			success: true,
			file_link: cloudUpload.secure_url
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			error
		});
	}
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
