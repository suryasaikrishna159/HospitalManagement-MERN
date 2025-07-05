const mongoose=require("mongoose");

const docschema=new mongoose.Schema({
    id:{
        type:Number,
        required:[true,"must provide id"],
        unique:true
    },
    name:{
        type:String,
        required:[true,"must provide name"],
        trim:true
    },
    specialization:{
        type:String,
        required:[true,"must provide specialization"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"must provide email"],
        validate:{
            validator:function(v){
                return v.endsWith("@gmail.com");
            },
            message:props=>`${props.value} is not a valid gmail address`
        }
    }
})

module.exports=mongoose.model("doctors",docschema);