import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
  try {

    const users = await User.find({
      role: "user",
    }).select("-password");

    const userWithTaskCount = await Promise.all(

      users.map(async (user) => {

        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });

        const inProgress = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress",
        });

        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgress,
          completedTasks,
        };
      })

    );

    res.status(200).json(userWithTaskCount);

  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
try {
  const userId = await User.findById(req.params.id).select("-password");
  if (!userId) {
    return next(errorHandler(404, "User not found"));
}
  res.status(200).json(userId);
} catch (error) {
  next(error);
}
};