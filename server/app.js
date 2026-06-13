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

// ✅ CORS FIX (IMPORTANT for cookies in production)
app.use(
  cors({
    origin: "https://srm-t1x9.vercel.app", // frontend URL
    credentials: true,
  })
);

// ✅ OPTIONAL but recommended (helps proxies like Vercel/Render)
app.set("trust proxy", 1);

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api", web);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});