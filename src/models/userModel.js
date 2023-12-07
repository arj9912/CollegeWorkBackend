import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },

  confirm_password: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Hashing the password before saving to the database
userSchema.pre("save", async function (next) {
  // Hash the password with cost of salt 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirm_password field
  this.confirm_password = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
