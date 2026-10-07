const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const web = require("./routes/web");
const connectDB = require("./db/connectDB");

dotenv.config();

const app = express();

// ✅ IMPORTANT ORDER
app.use(cors({
  origin: ["https://srm-t1x9.vercel.app", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Vercel / proxy fix
app.set("trust proxy", 1);

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api", web);

// For local development
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;