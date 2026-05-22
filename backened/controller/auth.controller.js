import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password, profileImageUrl, adminJoincode } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isAlreadyExist = await User.findOne({ email });

  if (isAlreadyExist) {
    return res
      .status(400)
      .json({ success: false, message: "user already exists" });
  }

  let role = "user";
  if (adminJoincode && adminJoincode === process.env.ADMIN_JOIN_CODE) {
    role = "admin";
  }

  // Use asynchronous hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profileImageUrl,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: "signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};