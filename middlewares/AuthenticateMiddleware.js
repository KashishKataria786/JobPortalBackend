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
        req.user = user;
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