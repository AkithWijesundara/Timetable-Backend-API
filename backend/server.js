const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


//Setting up rounting
app.use('/user',require("./routes/User.js"));
app.use('/faculty',require("./routes/Faculty.js"));
app.use('/course',require("./routes/Course.js"));
app.use('/location',require("./routes/Location.js"));
app.use('/session',require("./routes/Session.js"));
app.use('/timeTable',require("./routes/TimeTable.js"));
app.use('/resource',require("./routes/Resource.js"));
app.use('/room',require("./routes/Room.js"));
app.use('/booking',require("./routes/Booking.js"));
app.use('/specialization',require("./routes/Specialization.js"));
app.use('/enroll',require("./routes/Enroll.js"));

//Setting up database
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Mongo DB connected successfully");
}
)
.catch(()=>{
    console.log("Mongo DB connection failed");
}
)



//Setting up server
app.listen(port,()=>{
    console.log("Server listing on port 3000")
})