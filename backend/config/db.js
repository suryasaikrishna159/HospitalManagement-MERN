const mongoose=require("mongoose");
require("dotenv").config();

const connectdb=()=>{
    mongoose.connect(process.env.mongo_url)
        .then(()=>{console.log("connected to db")})
        .catch((err)=>{console.log(err)})
}

module.exports=connectdb;