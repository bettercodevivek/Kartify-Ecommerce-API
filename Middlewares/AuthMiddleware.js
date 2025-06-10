require('dotenv').config();

const jwt = require('jsonwebtoken');

const AuthMiddleware = (req,res,next) => {
    try{
      
      const AuthHeader = req.headers.authorization;

      if(!AuthHeader || !AuthHeader.startsWith('Bearer')){
        return res.status(401).json({error:"Token not found or expired in header !"})
      }

      const accessToken = AuthHeader.split(" ")[1];

      const decoded = jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY);

      req.user = decoded ;

      next();

    }
    catch(err){
        return res.status(500).json({error:"Expired or invalid token "})
    }
}

module.exports = AuthMiddleware;