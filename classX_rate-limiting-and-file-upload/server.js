const express = require('express');
const {rateLimit} = require('express-rate-limit');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express();


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})


// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/files', upload.single('file'), function (req, res, next) {
	return res.json({
		success: true,
		data: req.file
	})
  })
  

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
