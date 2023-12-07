const server = require("./server");
const connectDB = require("./configs/dbConfig");

const connectAndListen = async () => {
   try {
      await connectDB();
      server.listen(process.env.PORT || 2023, () => {
         console.log(`Listening on port ${process.env.PORT}`);
      });
   } catch (error) {
      console.log(error)
   }
}

connectAndListen();
