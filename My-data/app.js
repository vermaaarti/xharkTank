const { Router } = require("express");
const express = require("express");
require("./conn");
const {entrepreneurSchema, entrepreneurModel} = require("./enterpreneur");
const {investorSchema, investorModel} = require("./investor");
//import {entrepreneurSchema, entrepreneurModel} from "./enterpreneur";



const app = express();
app.use(express.json());
const port = 8081;
let pitches  ={};

const pitchRouter = express.Router();
app.use('/pitches', pitchRouter);

pitchRouter
.route('/:id')
.get(getPitchById);


app.get("/pitches", async(req, res) => {
  //res.send("list of pitches are ")
  res.send(pitches);
 })

app.post("/pitches", async(req, res) =>{
  console.log(req.body);
  pitches = req.body;
   res.json({
    message : "pitch created successfully",
    pitch : req.body
   })
   if(!pitches){
        res.status(400).send("pitch could not be created");
      }
      res.status(201).send(pitches);
 })
// Router.post("/pitches", async(req, res) =>{
//   let pitch = new pitch({
//     enterpreneur : req.body.enterpreneur,
//     pitchTitle : req.body.pitchTitle,
//     pitchIdea : req.body.pitchIdea,
//     askAmount : req.body.askAmount,
//     equity : req.body.equity,
//   });
//   pitch = await pitch.save();
//   if(!pitch){
//     res.status(400).send("pitch could not be created");
//   }
//   res.status(201).send(pitch);
// });



//  app.get("/pitches/:id", async(req, res) => {
//   const id = req.params.id;
//  const getData = await entrepreneurModel.findById(id);
// //  res.send(getData);
//  console.log(req.params.id);
//   res.json({
//    message : "enterpreneur id received",
//    id : req.params.id,
//    data : getData
//  }) 
// });

app.post("/pitches/:id/makeOffer", async(req, res) =>{
  console.log(req.body);
  makeOffer = req.body;
   res.json({
    message : "offer created successfully",
    Offer : req.body
   })
   console.log(req.body);
 })

 function getPitchById(req, res){
  console.log(req.params.id);
 let paramId= req.params.id;
 let obj = {};
 for(let i=0; i<pitches.length; i++){
  if(pitches[i]['id']==paramId){
    obj = entrepreneur[i];
  }
 }
   res.json({
    message : "enterpreneur id received",
    id : req.params.id,
    data : obj
   })
 }




app.listen(port, () =>{
   console.log(`connection is live on port ${port}`)
})














//  app.patch("/pitches", async(req, res) => {
//   //res.send("list of pitches are ")
//  console.log("req.body->", req.body);
// res.json({
//   message:"data updated successfully",
//   pitch : req.body
// })
// console.log(req.body);
//  })

//  app.put("/pitches", async(req, res) => {
//   //res.send("list of pitches are ")
//  console.log("req.body->", req.body);
// res.json({
//   message:"data updated successfully",
//   pitch : req.body
// })
// console.log(req.body);
//  })

// app.delete("/pitches", async(req,res) =>{
//   pitches = {};
//   res.json({
//     message: "data deleted successfully"
//   })
// })

