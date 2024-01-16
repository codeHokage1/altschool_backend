import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI);
		mongoose.connection.on("connected", () => {
			console.log("MongoDB is connected!");
		});
		mongoose.connection.on("error", (error) => {
			console.log("MongoDB is not connected!");
			return error;
		});
	} catch (error) {
        console.log(error);
    }
};

export default connectDB;
