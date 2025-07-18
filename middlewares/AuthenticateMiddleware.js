import JWT from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js';

export const jobSeekerAuthenticate = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token)return res.status(401).send({message:"Login to Access Content"});

    try {
        const decodedToken = JWT.verify(token, process.env.JWT_TOKEN_SECRET);
        const user=await UserModel.findById(decodedToken.userId);
        if(!user)return res.status(401).send({message:"User not Found"});
        if(user.role !='jobseeker')res.status(401).send({message:"Access Denied"})
        req.user = user._id;
        next();
    } catch (error) {
        return res.status(400).send({
            message:"Invalid Token"
        })
    }
}

export const commonUserAuthenticate = async (req,res,next)=>{
    const token = req.headers.authorization;
        if(!token)return res.status(401).send({message:"Login to Access Content"});
    try {
        const decodedToken = JWT.verify(token, process.env.JWT_TOKEN_SECRET);
        const user=await UserModel.findById(decodedToken.userId);
        if(!user)return res.status(401).send({message:"User not Found"});
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(400).send({
            message:"Invalid Token"
        })
    }
}

export const recruiterAuthenticate = async(req,res,next)=>{

    const token = req.headers.authorization;
    if(!token)return res.status(401).send({message:"Login to Access Content"});
    try {
        const decodedToken = JWT.verify(token,process.env.JWT_TOKEN_SECRET);
        const guardianUser = await UserModel.findById(decodedToken.userId);
        if(!guardianUser)return res.status(401).send({message:"User not Found"});
        if(guardianUser.role!='recruiter') return res.status(401).send({message:"Access Denied"});
        req.user =guardianUser
        next();
    } catch (error) {
        return res.status(400).send({
            message:"Invalid Token"
        })
    }
}




// Working for recruitors , will have to see for Jobseekser!
export const authorizationChecker =(Model, ownership)=>{

    return async(req,res,next)=>{
        try {
        const {id} = req.params;
        const token= req.headers.authorization;
        const decodedToken = JWT.verify(token,process.env.JWT_TOKEN_SECRET)
        const userId = decodedToken.userId;
          console.log( userId)
        if(!id){
            return res.status(400).send({
                success:false,
                message:"Missing resource ID "
            })
        }   
        const resource= await Model.findById(id);
        if(!resource){
            return res.status(400).send({
                success:false,
                message:"Resource not Found",
            })
        }
        console.log( resource[ownership].toString())
        console.log(resource[ownership].toString() === userId)
        if(resource[ownership]!=  userId){
         return res.status(403).json({
          success: false,
          message: "Unauthorized: You do not own this resource.",
        });
        }

      next();

        } catch (error) {
            return res.status(500).json({
        success: false,
        message: "Authorization check failed.",
        error: error.message,
      });
        }
    }
}