const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const transactionRoutes = require("./routes/transactions.js");
const users = require("./routes/user.js");
const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-peach-eight-63.vercel.app", // <--- Hardcoded to be 100% sure
  "https://expense-tracker-peach-eight-63.vercel.app/", // <--- Just in case browser adds a slash
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🚫 Blocked by CORS. Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("connection failed  ", error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/users", users);

// THE DEBUGGER ROUTE
app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
