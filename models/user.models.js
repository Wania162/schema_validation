import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"],
    max: [50, "Age cannot exceed 50"],
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;