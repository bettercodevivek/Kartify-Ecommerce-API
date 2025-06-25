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
        required:function(){
            return !this.googleAuth;
        }
    },
    createdAt:{
        type:Date,
        default:Date.now

          // A very important note : Date.now should be used instead of Date.now(), because here Date.now is a function reference, we are not
         // calling the function here itself, rather mongoose will call it everytime user is created, so timestamp of that time will be saved,
        // but if we use Date.now(), it means we have called function here itself and a fixed timestamp value will get associated with every
       // user that gets created.
      // default: Date.now → har nayi entry ke liye dynamic current time lagta hai.
     // default: Date.now() → ek hi fixed time har document me default hoga (jo schema define hone ke time pe tha).
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    googleAuth:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String
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