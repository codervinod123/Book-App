const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const { response } = require("express");

module.exports.register = async (req, res, next) => {
  try {

    const newMens = new User(req.body);
    const finalDate = await newMens.save();
    res.status(200).send(finalDate);

    const { username, email, password } = req.body;
    

    const usernameCheck=await User.findOne({username});
    if(usernameCheck)
    return response.json({msg:"username already present in our database",status: false});
    const emailCheck=await User.findOne({email});
    if(emailCheck)
    return response.json({msg:"email is used already",status: false});

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedpassword,
    });

     delete user.password;
    return res.json({ status: true, user });
} catch (error) {
    res.send(error);
  }
};







module.exports.login = async (req, res, next) => {
  try {
    
    const { username, password } = req.body;
    

    const usernameCheck=await User.findOne({username});
    if(!usernameCheck)
    return response.json({msg:"username or pass is not match",status: false});
    const isValidPassword=await User.findOne({password});
    if(!isValidPassword)
    return response.json({msg:"username or pass is not match",status: false});

   delete user.password;
    return res.json({ status: true, user });
} catch (error) {
    res.send(error);
  }
};




