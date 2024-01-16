const mongoose = require("mongoose");
const { ytid } = require("ytid");

const TansactionSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: ytid()
	},
	email: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date()
	},
	type: {
		type: String,
		enum: ["credit", "debit"]
	},
	wallet_id: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		enum: ["pending", "success", "failed"],
		default: "pending"
	}
});

module.exports = mongoose.model("Transaction", TansactionSchema);
