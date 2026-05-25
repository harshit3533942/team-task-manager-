import express from "express";
// ...existing code...
import { signin, signup, updateUserProfile, userProfile, uploadImage } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js"; // adjust path/name to your multer/export

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);

router.get("/user-profile", verifyToken, userProfile);
router.put("/update-profile", verifyToken, updateUserProfile);

router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
