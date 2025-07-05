const mongoose=require("mongoose");

const patschema=new mongoose.Schema({
    id:{
        type:Number,
        required:[true,"must provide id"],
        unique:true
    },
    name:{
        type:String,
        required:[true,"must provide name"]
    },
    disease:{
        type:String,
        required:[true,"must provide disease name"]
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

module.exports=mongoose.model("patients",patschema);