const mongoose = require("mongoose");


//schema
const entrepreneurSchema = new mongoose.Schema({
     id:{
        type : Number,
        required : true
     },
    entrepreneur :{
        type : String,
        required : true
      },
      pitchIdea :{
        type : String,
        required : true
      },
      askAmount :{
        type : Number,
        required : true
      },
      equity :{
        type : Number,
        required : true
      }
})

//model
const entrepreneurModel = mongoose.model('entrepreneurModel', entrepreneurSchema);
(async function createentrepreneur(){
  let entrepreneur = [{

    id: 1,

    entrepreneur: "ashok kumar",

pitchTitle : "Crio.Do - Work-experience based learning programs for developers",

pitchIdea : "Build professional projects like the top 1% developers. Master the latest full stack and backend tech with real work-ex. Crack developer jobs at the best tech companies.",

askAmount: 10000000.25,

equity : 12.5
  },

  {

    id : 2,
 
    "entrepreneur":"Sanjay kumar",
 
    "pitchTitle":"Lenskart - Sabo Chashma Pehnao",
 
    "pitchIdea":"Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.",
 
    "askAmount":20000000.23,
 
    "equity":15.23,
 
    //"offers":[]
 
 }
 
];

  let data = await entrepreneurModel.create(entrepreneur);
  //console.log(data);

})();




//collection creation
//const business = new mongoose.model("business", enterpreneur)

module.exports = {entrepreneurSchema, entrepreneurModel};
//export  {entrepreneurSchema, entrepreneurModel};