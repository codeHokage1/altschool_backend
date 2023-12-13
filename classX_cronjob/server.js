const express = require('express');
const app = express();
require("dotenv").config();
const cron = require('node-cron');

const connectDB = require("./config/dbConfig");
const User = require("./models/User");
const emailSender = require("./utils/email");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// check DB every day at 7:00 AM
// dev: send email every 30secs
cron.schedule('*/30 * * * * *', async () => {
  console.log('running a task every 30 secs');

//   const emailResponse = await emailSender("Happy Birthday", "<h1>Happy Birthday</h1>", "farhan@gmail.com");
//   console.log(emailResponse);
});

app.post("/birthdays", async (req, res) => {
   try {
      const newUser = await User.create({...req.body});
      return res.status(201).json({
         success: true,
         data: newUser
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      })
   }

})


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
}

connectDBAndStartServer();
