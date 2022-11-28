const mongoose = require("mongoose");


//schema
const investorSchema = new mongoose.Schema({
     id:{
        type : Number,
        required : true
     },
     investor :{
        type : String,
        required : true
      },
      amount :{
        type : Number,
        required : true
      },
     equity:{
        type : Number,
        required : true
      },
      comment :{
        type : String,
        required : true
      }
})

//model
const investorModel = mongoose.model('investorModel', investorSchema);
(async function createinvestor(){
  let investor = {

    "id": 1,

    "investor": "Anupam Mittal",

    "amount" : 10000000.56,
    
    "equity" : 20.2,
    
    "comment": "A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work with you to scale the vision of the company!"
    
  }

  let data = await investorModel.create(investor);
  //console.log(data);

})();





module.exports = {investorSchema, investorModel};
