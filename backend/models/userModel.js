import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  email: {
   type: String,
   required: true,
   unique: true,
  },
  password: { type: String, required: true },
  isAdmin: {
   type: Boolean,
   required: true,
   default: false,
  },
 },
 {
  timestamps: true,
 }
);

//compare password entered with password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};

//encrypt password before saving to database
userSchema.pre("save", async function (next) {
 //if password is not modified, move on
 if (!this.isModified("password")) {
  next();
 }

 //generate salt and hash password
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
