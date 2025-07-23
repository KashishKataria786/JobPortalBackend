import { UserModel } from "../models/UserModel.js";
import mongoose from 'mongoose'
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
export const GETUserSavedJobController = async (req, res) => {
  const id = req.user.userId;

  try {
    const userdata = await UserModel.findById(id);

    if (!userdata || !Array.isArray(userdata.savedJobs)) {
      return res.status(404).send({
        success: false,
        message: "User or saved jobs not found",
      });
    }

    if (userdata.savedJobs.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No saved jobs found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Jobs retrieved successfully",
      data: userdata.savedJobs,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const PATCHRemoveUserSavedJobController = async (req, res) => {
  const userId = req.user.userId;
  const { id: jobId } = req.params;

  console.log("Job ID to remove:", jobId);
  console.log("User ID:", userId);

  try {
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Convert ObjectIds to string for comparison
    const isAvailable = userData.savedJobs.some(
      (savedId) => savedId.toString() === jobId
    );

    if (!isAvailable) {
      return res.status(404).send({
        success: false,
        message: "Job not found in saved jobs",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { savedJobs: new mongoose.Types.ObjectId(jobId) },
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Job removed successfully",
      data: updatedUser.savedJobs,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const PATCHApplyJobController = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.user;
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() === userId) {
      return res.status(400).send({
        success: false,
        message: "Recruiters cannot apply to their own job",
      });
    }
if (job.applicants.some(applicant => applicant._id.toString() === userId)) {
  return res.status(400).send({
    success: false,
    message: "User already applied to this job",
  });
}

    job.applicants.push(userId);
    await job.save();
    

    await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { appliedJobs: id },
    });

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      jobId: id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to apply to job",
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
