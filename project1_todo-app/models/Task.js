const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter a title"],
		unique: true
	},
	state: {
		type: String,
		enum: ["pending", "completed", "deleted"],
		default: "pending"
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Task", taskSchema);
