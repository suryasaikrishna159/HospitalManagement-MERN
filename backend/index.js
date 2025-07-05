const express=require("express");
const cors=require("cors");
const app=express();

app.use(express.json());


const allowedOrigins = [
  "https://hospitalmanagement-mern-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


const connectdb=require("./config/db");
connectdb();

//exporting models
const doctors=require("./models/doctors");
const patients=require("./models/patients");
const appointments=require("./models/appointments");


//---------------------------------------------------controllers-------------------------------------------------------------

//to get doctors data
app.get("/api/v1/doctors",async(req,res)=>{
    try{
        const alldocs= await doctors.find({});
        res.json({doctorsdata:alldocs});
    }catch(err){
        res.json({msg:err});
    }
})

//to insert doctors data
app.post("/api/v1/doctors",async (req,res)=>{
    try{
        const evt=await doctors.create(req.body);
        res.json({evt});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to insert patients data
app.post("/api/v1/patients",async(req,res)=>{
    try{
        const evt=await patients.create(req.body);
        res.json({evt});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to get patients data
app.get("/api/v1/patients",async(req,res)=>{
    try{
        const allpatda=await patients.find({});
        res.json({patientdata:allpatda});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to book appointment
app.post("/api/v1/appointments",async(req,res)=>{
    try{
        const evt=await appointments.create(req.body);
        res.json({evt});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to get appointments
app.get("/api/v1/appointments",async(req,res)=>{
    try{
        const allappointm=await appointments.find({});
        res.json({appointmentsdata:allappointm});
    }
    catch(err){
        res.json({msg:err});
    }
})


//to delete doctors
app.delete("/api/v1/doctors/:id",async(req,res)=>{
    try{
        const reqid=req.params.id;
        const reqdoc=await doctors.deleteOne({id:reqid});
        res.json({deleteddoc:reqdoc});
    }
    catch(err){
        res.json({msg:err});
    }
})

//to delete patient
app.delete("/api/v1/patients/:id",async(req,res)=>{
    try{
        const reqid=req.params.id;
        const reqdoc=await patients.deleteOne({id:reqid});
        res.json({deleted:reqdoc});
    }
    catch(err){
        res.json({msg:err});
    }
})

///to delete appointment
app.delete("/api/v1/appointments/:id", async (req, res) => {
    try {
        const reqid = parseInt(req.params.id); 
        const reqdoc = await appointments.deleteOne({ id: reqid });
        res.json({ deleted: reqdoc });
    } catch(err) {
        res.json({ msg: err });
    }
})

//----------------------------------------------------------listener------------------------------------

app.listen(5000,()=>{
    console.log("server is live on port 5000");
})


