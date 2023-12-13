const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter a first_name"]
	},
   email: {
      type: String,
      required: [true, "Please enter an email"]
   },
	date_of_birth: {
      type: Date,
      required: [true, "Please enter a date of birth"]
   }
});

module.exports = mongoose.model("User", userSchema);
