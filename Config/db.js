// We will write the function to connect Database in this module\

require('dotenv').config();

const mongoose = require('mongoose');

const ConnectDB = async() => {
    try{
       await mongoose.connect(process.env.MONGODB_URL);
       console.log('Connection with DB established Successfully !')
    }
    catch(err){
        console.log('An error occurred while connecting to DB :', err.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;