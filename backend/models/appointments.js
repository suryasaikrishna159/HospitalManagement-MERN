const mongoose=require("mongoose");

const appoi=new mongoose.Schema({
    id:{
        type:Number,
        required:[true,"must provide id"],
        unique:true
    },
    date:{
        type:Date,
        required:[true,"must require date"],
    },
    patient_name:{
        type:String,
        required:[true,"must provide name"]
    },
    doctor_name:{
        type:String,
        required:[true,"must provide name"]
    },
    status:{
        type:String,
        required:[true,"must provide name"]
    }
})

module.exports=mongoose.model("appointments",appoi);