const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');
// const schedule = require('node-schedule');
 connectDB();

// Get all records older than 24 hours 
async function fetchData() {
    const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)} })
    // const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 3* 60 * 1000)} })
    if(files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            } catch(err) {
                console.log(`error while deleting file ${err} `);
            }
        }
    }
    console.log('Job done!');
    return;
}

 fetchData().then(process.exit);

// const job = schedule.scheduleJob('* * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
//   });
  module.exports = fetchData;