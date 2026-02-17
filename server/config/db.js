// connect to mongodb using mongoose

const mongoose = require ("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log ("Mongo db connected seccessifully ")
    } catch (error) {
        console.error ("mongodb connection failed")
        process.exit(1);
    }
}

module.exports = connectDB;