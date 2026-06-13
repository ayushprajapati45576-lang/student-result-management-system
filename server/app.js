const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const web = require("./routes/web");
const connectDB = require("./db/connectDB");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://srm-t1x9.vercel.app",
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api", web);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});