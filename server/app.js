const express = require("express");
const dotenv = require("dotenv");
const web = require("./routes/web");
const connectDB = require("./db/connectDB")
const cookieParser = require('cookie-parser')
const cors = require("cors")


dotenv.config(); // ✅ sabse upar

const app = express();
app.use(cookieParser())

// cors fix(cookies jwt k liye)
app.use(
  cors({
    origin:"http://localhost:5173",  //react url
    credentials:true  //allow cookies 
  })
);

// middleware 
app.use(express.json());

// database connect
connectDB();

// routes localhost 3000
app.use("/api", web);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server start localhost: ${PORT}`);
});
                                      