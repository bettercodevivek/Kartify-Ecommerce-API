// Here, we will do 3 things : 
// 1. Create UserSchema
// 2. then use pre-save middleware to hash password before saving new user
// 3. creating model from schema

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

UserSchema.pre('save',async function (next){
   
    const user = this;

    const SaltRounds = 10;

    if(!user.isModified('password')) return next();

    try{
       
      const hashedPwd = await bcrypt.hash(user.password,SaltRounds);

      user.password = hashedPwd;

      next();

    }
    catch(err){
         
       next(err);

    }

});

const User = mongoose.model('User',UserSchema);

module.exports = User ;