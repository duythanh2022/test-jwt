const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const bodyparser = require('body-parser');

const app = express()
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//router
const PORT = process.env.PORT || 5000;

app.use("/v1/auth",authRouter)
app.use("/user",userRouter)
dotenv.config()
const url = `mongodb+srv://duythanh:duythien@cluster0.zxvg6zu.mongodb.net/?retryWrites=true&w=majority`
mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})