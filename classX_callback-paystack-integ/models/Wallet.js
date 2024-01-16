const mongoose = require("mongoose");
const { ytid } = require("ytid");

const Wallet = new mongoose.Schema({
	_id: {
		type: String,
		default: ytid()
	},
	email: {
		type: String,
		required: true
	},
	balance: {
		type: Number,
		required: true,
      default: 0
	},
	createdAt: {
		type: Date,
		default: Date()
	}
});

module.exports = mongoose.model("Wallet", Wallet);
