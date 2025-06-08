const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../Models/UserModel');

// Now, we will write the handler functions for signup, login and token refresh for users

const Signup = async(req,res) => {
    try{
      const {email,username,password} = req.body;

      if(!email || !username || !password){
        return res.status(401).json({error:"Credentials not complete !"})
      }

      const userExists = await User.findOne({email});

      if(userExists){
        return res.status(409).json({error:"This user already Exists !"})
      }

      const user = new User({username,email,password});

      await user.save();

      res.status(201).json({
        message:"New User Created Successfully !",
        user:{
            username:user.username,
            email:user.email,
            userId:user._id
        }
      })

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}


const Login = async(req,res) => {
    try{

     const{email,password} = req.body;
     
     if(!email || !password){
        return res.status(401).json({error:"Incomplete Credentials !"});
     }
     
     const userExists = await User.findOne({email});

     if(!userExists){
        return res.status(404).json({error:"This user doesnt exist ! Please login first ."})
     }

     const isMatch = await bcrypt.compare(password,userExists.password);

     if(!isMatch){
        return res.status(404).json({error:"Invalid Password ! Please enter the correct password "})
     }

     const payLoad = {
        username:userExists.username,
        email:userExists.email,
        userId:userExists._id
     }

     const accessToken = jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:'2m'});

     const refreshToken = jwt.sign(payLoad,process.env.REFRESH_SECRET_KEY,{expiresIn:'7d'});

     res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:7*24*60*60*1000
     });

     res.status(200).json({
        message:"Login Attempt Successful !",
        token:accessToken
     })
      
    }
    catch(err){
      res.status(500).json('Internal Server Error !')
    }
}


const RefreshToken = async(req,res) => {
       
     try{
        
      const refreshToken = req.cookies.refreshToken;

      if(!refreshToken){
        return res.status(404).json({error:"Refresh Token not found !"})
      }

      const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY);

      const payLoad = {
        username:decoded.username,
        email:decoded.email,
        userId:decoded.userId
      }

      const accessToken = jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:'2m'});

      res.status(200).json({
        message:"New Access Token Generated !",
        token:accessToken
      })

     }
     catch(err){
  
      res.status(500).json({error:"Internal Server Error !"})

     }

}

module.exports = {Signup,Login,RefreshToken};