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

   const listenToQueue = (jobs) => {
      workerQueue.process(function (job, done) {
  
      switch(job.data.jobName) {
          case 'SendEmail':
              console.log('processing send email job')
            //   jobs[job.data.jobName](job.data);
              done(null);
              break;
          case 'SendSMS':
              console.log('processing send sms job')
            //   jobs[job.data.jobName](job.data);
              done(null);
              break;
          default:
              console.log('No job found')
      }
   
      });
    
      workerQueue.on('completed', function (job, result) {
        const jobData = job.data;
        console.log(`job ${jobData.jobId} completed with result: ${JSON.stringify(result)}`)
      })
    
      workerQueue.isReady().then(() => {
          console.log('Ready to accept jobs')
      })
    }

   return {listenToQueue}
}