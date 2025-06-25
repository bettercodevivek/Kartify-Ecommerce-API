require('dotenv').config();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../Models/UserModel');

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Now, we will write the handler functions for signup, login and token refresh for users

// redirect to google login
const googleLogin = async(req,res) => {
  try{
       const url = client.generateAuthUrl({
        access_type:'offline',
        scope:['profile','email']
       });
       res.redirect(url);
  }
  catch(err){
     res.status(500).json({message:"Error in redirecting to google auth !"})
  }
}

// google redirects back here with a token/code

const googleCallback = async(req,res) => {

   const code = req.query.code;

  try{
    
   const {tokens} = await client.getToken(code);
   client.setCredentials(tokens);

   const oauth2 = require('googleapis').google.oauth2({
    auth:client,
    version:'v2'
   })

   const {data} = await oauth2.userinfo.get();

   const {email,name,picture} = data;

   let user = await User.findOne({email});

   if(!user){
    user = await User.create({
       username:name,
       email,
       avatar:picture,
       googleAuth:true
    })
   }

   const token = jwt.sign({id:user._id},process.env.ACCESS_SECRET_KEY,{expiresIn:"1h"});

   res.status(200).json({
    message:"Google Login Successful !",
    token,
    user
   })

  }
  catch(err){
     console.error("google callback error : ",err);
     res.status(500).json({message:"Internal Server Error !"})
  }
}

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
        userId:userExists._id,
        role:userExists.role
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
        userId:decoded.userId,
        role:decoded.role
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

module.exports = {Signup,Login,RefreshToken,googleLogin,googleCallback};