const express = require("express");
const connectDB = require("./config/dbConfig");
const Transaction = require("./models/Transaction");
const Wallet = require("./models/Wallet");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Paystack Integ - By Farhan");
});

app.post("/init-payment", async (req, res) => {
	if (!req.body.email || !req.body.amount) {
		return res.status(400).json({
			success: false,
			message: "Input both email and amount"
		});
	}

	try {
		let foundWallet = await Wallet.findOne({ email: req.body.email });
		if (!foundWallet) {
			foundWallet = await Wallet.create({
				email: req.body.email
			});
		}

		const transaction = await Transaction.create({
			email: req.body.email,
			amount: req.body.amount,
			type: "credit",
			wallet_id: foundWallet._id
		});

		const data = {
			amount: req.body.amount * 100,
			email: req.body.email,
			reference: transaction._id
		};

		console.log(data);
		
      const headers = {
         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
       };


		const response = await axios.post("https://api.paystack.co/transaction/initialize", data, {
			headers
		});

		return res.status(200).json({
			success: true,
			data: response.data
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error
		});
	}
});

app.listen(4500, () => {
	connectDB();
	console.log("Server on PORT 4500...");
});
