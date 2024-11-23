const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = ('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000

app.use(express.json())
app.use(errorHandler)
app.use('/api/contacts',require("./routes/contact.routes"))
app.use('/api/users',require("./routes/userRoutes"))

app.listen(port,()=>{
    console.log(`sever running on ${port}`)
})