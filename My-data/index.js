const express = require("express");
const app = express();
const mongoose = require('mongoose');
 
const db_link = 'mongodb+srv://admin:AartiV@3@cluster0.py29nzh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
    console.log(db);
    console.log("DB Connected Successfully");
})
.catch(function(err){
    console.log(err);
});

//db schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true ,
        minLength : 7
    },
    confirmPassword : {
        type : String,
        required : true,
        minLength : 7
    }
});

//dbmodel
const userModel = mongoose.model('userModel', userSchema);

(async function createUser(){
    let user = {
        name : 'Aarti',
        email : 'aarti@gmail.com',
        password : '12345678',
        confirmpassword : '12345678'
    };
    let data = await userModel.create(user);
    console.log(data);
})();



// const dbName = "xharktank";
// let db;
// const url = 'mongodb://localhost:27017/xharktank';
// mongoose.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err);

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName);
//   console.log(`Connected MongoDB: ${url}`);
//   console.log(`Database: ${dbName}`);
// });
 
app.get("/",(req, res)=>{
    res.send("Hello World");
});
 
const PORT = 8081;
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});