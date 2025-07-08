
export const accessControl = (...allowedRoles)=>{

    return (req,res,next)=>{
        if(!req.user || !req.user.role){
            return res.status(401).send({message:"Unauthorized Access:No User Info!"})
        }
    }
    if(!allowedRoles.includes(req.user.role)){
         return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
    }
    next();
}