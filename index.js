const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
const URL=process.env.URL
const connection=mongoose.connect(URL)
const menu=require('./models/menu')


const app = express();
const port = 3010;

app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post("/menu",async(req,res)=>{
  try{
  const {name, description,price}=req.body;
  const schema=new menu({
    name,
    description,
    price,
  })
  await schema.save();
  if(schema){
    res.status(200).json({message: "Succesfully created"})
  }
  else{
    res.status(404).json({message:"Not found"})
  }
}catch(err){
  res.status(500).send(err)
}
})

app.get("/menu",async(req,res)=>{
  try{
    const found=await menu.find();
    menuItem=[]
    if(found){
      menuItem.push(found);
      res.status(200).json(menuItem)
    }
    else{
      res.status(404).json({message:"Not found"})
    }

  }catch(err){
    res.status(500).send(err)
  }
})

app.listen(port, async() => {
  try{
    await connection
    console.log("connected")
  }catch(err){
    console.log("Error",err)
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
