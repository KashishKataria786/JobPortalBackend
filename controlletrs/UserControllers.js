import { UserModel } from "../models/UserModel.js";
import { JobModel } from "../models/JobModel.js";
import { sendVerificationMail } from "../utils/VerificationEmail.js";
import JWT from "jsonwebtoken";

export const GETUserProfileController = async (req, res) => {
  const { id } = req.params;

  try {
    const userData = await UserModel.findById(id);

    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User data retrieved successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
};

export const POSTUserVerificationController = async (req, res) => {
  const token = req.headers.authorization;
  const emailTo = req.user.email;
  const userId = req.user.userId;
  console.log("USerId:", userId);

  await sendVerificationMail(emailTo, token);
  try {
    // const sendVerificationMail = await sendVerificationMail()
    console.log("lgIn");
    const decoded = JWT.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(decoded);
    const user = await UserModel.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Email Verified",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const DELETEUserDataController = async (req, res) => {
  const role = req.user.role;
  const id = req.user.userId;
  console.log("role", id);
  try {
    if (role === "recruiter") {
      const deletedJobs = await JobModel.deleteMany({ postedBy: id });
      if (!deletedJobs) {
        return res.status(400).send({
          success: false,
          message: "Error in Deleting Data",
        });
      }
    }

    const deleteAccount = await UserModel.deleteOne({ _id: id });

    if (!deleteAccount) {
      return res.status(401).send({
        success: false,
        message: "Error in Deeleting Acoount",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Data Deleted Successfully",
      data: deleteAccount,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Working
export const PATCHUploadUserResume = async (req, res) => {
  const resume = req.body;
  if (!resume) {
    return res.status(402).send({
      success: false,
      message: "Resume not uploaded!",
      error: error.message,
    });
  }
  try {
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
