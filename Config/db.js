const mongoose = require('mongoose');

const ConnectDB = async() => {
    try{
       // Debug what Railway is actually providing
       console.log('=== RAILWAY DEBUG ===');
       console.log('NODE_ENV:', process.env.NODE_ENV);
       console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
       console.log('MONGODB_URI length:', process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0);
       console.log('First 50 chars of MONGODB_URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 50) + '...' : 'UNDEFINED');
       console.log('All env keys:', Object.keys(process.env).length);
       console.log('=== END DEBUG ===');
       
       const mongoUri = process.env.MONGODB_URI;
       
       if (!mongoUri) {
           console.error('MONGODB_URI environment variable is not defined');
           console.error('Available environment variables:', Object.keys(process.env));
           process.exit(1);
       }
       
       await mongoose.connect(mongoUri);
       console.log('Connection with DB established Successfully !')
    }
    catch(err){
        console.log('An error occurred while connecting to DB :', err.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;