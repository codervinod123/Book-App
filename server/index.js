const express=require('express');//requiring express
const mongoose=require('mongoose');//requiring mongoose
const cors=require('cors');//requiring cors


//creating object of the express with the name app;
const app=express();

//hide critical information for security purpose
//bsically process env hold critical information after when ew required the info
//we take it from th dotenv file that is saved with .env
require("dotenv").config();


//
const userRoutes=require("./routes/userRoutes")

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);

//connectioning the server from the mongodb
mongoose.connect(process.env.MONGO_URL,{})
.then(()=>{
    console.log('DB Server connected successfully');
}).catch((e)=>{
    console.log(e.message);
})



//listening the server on port no 5000
const server=app.listen(process.env.PORT,()=>{
    console.log(`listening to the port number ${process.env.PORT}`);
})  