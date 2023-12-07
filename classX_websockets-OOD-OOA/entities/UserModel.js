const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	// assigned_id: {
	// 	type: String,
	// 	required: [true, "Please enter an assigned_id"],
	// 	unique: true
	// },
	user_name: {
		type: String,
		required: [true, "Please enter a first_name"]
	},
   user_type: {
      type: String,
      enum: ["customer", "driver"]
   },
	orders: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model("User", userSchema);
