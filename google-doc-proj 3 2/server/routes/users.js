const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Document = require("../Document");
const router = express.Router();
const {v4} =require('uuid');
const  UserModel  = require("../User")

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  } 

  const newUser = new UserModel({ username, password:password });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

 
  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = (password+"")===user.password;
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: " password is incorrect"});
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});


module.exports= router ;

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// module.exports = verifyToken;


router.post("/creation", async (req, res) => {
  const { username, password,userId} = req.body;
   let a=v4().slice(0,18);

    let temp1=a+"p"+v4().slice(0,18);
    
    let temp2=await v4().slice(0,18)+"t"+a;

    let publicId=temp1;
  
    let privateId=temp2;
 
    let input=temp1;
    let final=input.slice(0,18)
  //   let final=''
  //   if(input[18]==="p"){
  //     final=input.slice(0,18)






      
  //  }else{
  //     final=input.slice(19,37)
 
    
  //  }

  const document = new Document(
    { 
    _id:final,
    docName:username,
    description:password,
    publicID:publicId,
    privateID:privateId,
    userOwner:userId,
  });
  console.log("userid  "+userId)
  await document.save();
  const doc = await Document.findById(final);
  console.log(doc)
  const user = await UserModel.findById(userId);
  console.log(user)
  
    // user.savedRecipes.push(doc);
    // await user.save();

    res.send({final,privateId,publicId});
  
  
});





router.post("/alldocs", async (req, res) => {
  try {
    
    const savedRecipes = await Document.find({
      userOwner:req.body.userId
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/items/:id', async(req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  // Use the itemId to delete the item from your MongoDB database
  await Document.findByIdAndDelete(itemId)

  

  res.status(200).json({ message: 'deleted successfully' });

});