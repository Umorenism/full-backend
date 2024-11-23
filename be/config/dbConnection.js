const mongoose = require('mongoose') //note this must be install using npm i mongoose


const connectDb =async()=>{
    try {
      const connect= await mongoose.connect(process.env.MONGODB_URL);
      console.log("DATABASE CONNECTED",connect.connection.host)  

    } catch (err) {
       console.log(err) 
       process.exist(1)
    }
}
module.exports = connectDb