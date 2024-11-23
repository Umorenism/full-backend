const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @des Register user
// @route post /api/users/register
// @access public
const registerUser = asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body;

    if(!userName||!email||!password){
        res.status(400);
        throw new Error("All field are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if(!userAvailable){
        res.status(400);
        throw new Error("user Already registered") 
    }
// hashed password
   const hashedPassword = await bcrypt.hash(password,10);
   console.log("hashed password",hashedPassword)
   const user = await User.create({
    userName,
    email,
    password:hashedPassword
   })
   console.log(`user created ${user}`);
   if(user){
    res.status(201).json({_id:user.id,email:user.email})
   }else{
   res.status(400) ;
   throw new Error({message:"user data not found  "})
   }
    res.status(2000).json()
})




// @des login user
// @route post /api/users/login
// @access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All  field are required");
    }
    const user = await User.findOne({email});
    // compare password with hashedPassword
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                userName:user.userName,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN,{expiresIn:"15ms"}) 
       res.status(200).json({accessToken}); 
    }else{
        res.status(401);
        throw Error("email or password not valid")
    }
});


// @des current user
// @route post /api/users/current
// @access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.User);
    
})



module.exports={registerUser,loginUser,currentUser}