const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    email: { type: String, unique: true, lowercase: true,trim: true,required: true },
    password: { type: String, require: true, minlength: 6 },
    dob: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function save(next) {
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model("user", UserSchema);
