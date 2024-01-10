const Bull = require("bull");

exports.WorkQueue = () => {
   const redisHosst = "127.0.0.1";
   const redisPort = "6379";

   const workerQueue = new Bull('backgroundWorker', {
      redis: {
         host: redisHosst,
         port: redisPort
      }
   })

   const addToQueue = (data) => {
      workerQueue.add(data);
      console.log("Adding job to queue....")
   }

   return {addToQueue}
}