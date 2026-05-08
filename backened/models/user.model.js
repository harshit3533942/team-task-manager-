import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    default: "data:image/png;base64,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"
  },
  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
},
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;
