const { default: mongoose } = require('mongoose');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:10,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:40,
        isEmail:["Enter Corrrect mail"],
    },
    password:{
        type:String,
        require:true,
         max:12,
         min:7,
    },
    isAvatarIageSet:{
        type:Boolean,
        dafault:false
    },
    avatarImage:{
        type:String,
        dafault:""
    },
})

module.exports=new mongoose.model("users",userSchema);