import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
// import config from '../config';


export const signup =  async(req, res)=>{
try {
  //    res.json("Signup");
const {username,email,password,roles} = req.body;

// const  userFound =  User.find({email});
 
 const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),})
 
 

if(req.body.roles){
  const foundRoles =  await Role.find({name:{$in: roles}});
  newUser.roles = foundRoles.map((role) => role._id) ;
}else{
    const role = await Role.findOne({name:"user"});
    newUser.roles = [role._id];
}

 const savedUser = await  newUser.save();
 console.log(savedUser);
 
 const token = jwt.sign({id: savedUser._id},'product-api',{
      expiresIn: 86400,
  })

  res.json({token});


} catch (error) {
  console.log(error);
  return res.status(500).json(error);
}
  
}

export const signin = async(req, res)=>{

  try {
        // res.json("Signin");

        const userFound = await User.findOne({ email: req.body.email }).populate(
          "roles"
        );

  if(!userFound) return res.status(400).json({message:"EL Usuario no Existe"})

const macthPassword = await User.comparePassword(req.body.password,userFound.password);

if(!macthPassword) return res.status(400).json({token:null,message:'Password Invalid'});

const token = jwt.sign({id: userFound._id},'product-api',{
    expiresIn: 86400,  // 24 hours
})

  console.log(userFound);

  res.json({token});

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  
  }
}

