const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter a title"],
		unique: true
	},
	description: {
		type: String,
		required: [true, "Please enter a description"]
	},
	tags: {
		type: [String],
		default: []
	},
	author:{
		type: String,
		required: [true, "Please enter a author"]
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	state: {
		type: String,
		enum: ["draft", "published"],
		default: "draft"
	},
	read_count:{
		type: Number,
		default: 0
	},
	reading_time:{
		type: Number
	},
	body:{
		type: String,
		required: [true, "Please enter the blog body"]
	},
	author_id: {
		required: [true, "Please enter author_id"],
		type: mongoose.Schema.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("Article", articleSchema);
