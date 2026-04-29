import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.log("Connection error:", err));