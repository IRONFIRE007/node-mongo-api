import jwt from 'jsonwebtoken';
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken= async (req, res, next) => {

   try {
       
    const token= req.headers["x-access-token"];

    console.log(token);
 
     if(!token) return res.status(403).json({message: "No Token Provided"});
         
     const decoded=   jwt.verify(token,'product-api');
     req.userId = decoded.id;
 
     console.log(decoded);
 
     const user = await User.findById(decoded.id,{password:0});

     console.log(user);
 
     if(!user) return res.status(404).json({message: "No user found"})
     
    next();

   } catch (error) {
       return res.status(404).json({message:"No Autorized"})
   }
}


export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in : user.roles}});

    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      return res.status(403).json({ message: "Require Moderator Role!" });
    
}

export const isAdmin = async (req, res, next) => {
    
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in : user.roles}});

    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return res.status(403).json({ message: "Require Admin Role!" });

}