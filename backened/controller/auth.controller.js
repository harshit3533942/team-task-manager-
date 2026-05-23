import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler} from "../utils/error.js";

export const signup = async (req, res,next) => {
  const { username, email, password, profileImageUrl, adminJoincode } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const isAlreadyExist = await User.findOne({ email });

  if (isAlreadyExist) {
    return next(errorHandler(400, "User already exists"));
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
    next(error.message);
  }
};