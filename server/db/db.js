const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/registration",{})
.then(()=>{
    console.log('successfully connected to the data base');
}).catch(()=>{
    console.log('can not connect  to the data base');
})