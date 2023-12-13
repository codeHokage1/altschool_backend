const express = require("express");
const app = express();
require("dotenv").config();
const cron = require("node-cron");

const connectDB = require("./config/dbConfig");
const User = require("./models/User");
const emailSender = require("./utils/email");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// check DB every day at 7:00 AM
// every 30 secs first
cron.schedule("*/30 * * * * *", async () => {
	console.log("Running a task every 30 seconds");
   const birthdayTemplate = `
      <img src="https://media.giphy.com/media/Qvns6NmhC1MBLKGbL1/giphy.gif" alt="Happy Birthday" />
      <h1>Hey Champ!</h1>
      <p>Some years back on this day, you were a new person in a new land. Look at you now, a super star! 🎉🎉🎉</p>
      <p>Have fun today!</p>

   `;
	const today = new Date();
	try {
		const allUsers = await User.find({});
		const birthdayUsers = allUsers.filter(
			(user) =>
				user.date_of_birth.getDate() == today.getDate() &&
				user.date_of_birth.getMonth() === today.getMonth()
		);

		if (birthdayUsers.length > 0) {
			birthdayUsers.forEach(async (user) => {
				await emailSender("A Champion was born today!", birthdayTemplate, user.email);
			});
		}
	} catch (error) {
		console.log(error);
	}
});

app.post("/birthdays", async (req, res) => {
	try {
		const newUser = await User.create({ ...req.body });
		return res.status(201).json({
			success: true,
			data: newUser
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
});

const PORT = process.env.PORT || 3000;
const connectDBAndStartServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

connectDBAndStartServer();
