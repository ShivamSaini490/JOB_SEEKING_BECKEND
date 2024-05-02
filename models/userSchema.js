// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your Name!"],
//     minLength: [3, "Name must contain at least 3 Characters!"],
//     maxLength: [30, "Name cannot exceed 30 Characters!"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your Email!"],
//     validate: [validator.isEmail, "Please provide a valid Email!"],
//   },
//   phone: {
//     type: Number,
//     required: [true, "Please enter your Phone Number!"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a Password!"],
//     minLength: [8, "Password must contain at least 8 characters!"],
//     maxLength: [32, "Password cannot exceed 32 characters!"],
//     select: false,
//   },
//   role: {
//     type: String,
//     required: [true, "Please select a role"],
//     enum: ["Job Seeker", "Employer"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });


// //ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// export const User = mongoose.model("User", userSchema);

// Before using any environment variables, make sure to load them from your .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Import required modules and configurations
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare entered password with saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // Set token expiration
  });
};

// Create User model
const User = mongoose.model("User", userSchema);

export { User };
