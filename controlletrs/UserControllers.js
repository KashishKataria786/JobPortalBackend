import { UserModel } from "../models/UserModel.js"

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


// Working
export const PATCHUploadUserResume = async(req,res)=>{
  const resume = req.body;
  if(!resume){
    return res.status(402).send({
      success:false,
      message:"Resume not uploaded!",
      error:error.message
    })
  }
  try {
    
  } catch (error) {
    return res.status(500).send({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}