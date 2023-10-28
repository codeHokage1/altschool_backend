const app = require('./app')
const connectDB = require("./config/dbConfig");


const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

// module.exports = app;
