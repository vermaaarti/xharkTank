const mongoose = require('mongoose')


const db_link = 'mongodb://127.0.0.1/xhark';
mongoose.connect(db_link, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(
  function(db){
    console.log(db);
    console.log('db connected');
  }).catch(function(err){
    console.log(err);
  });