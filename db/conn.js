const mongoose = require('mongoose');
mongoose.set('strictQuery',true)
mongoose.connect('mongodb://127.0.0.1:27017/folder-image',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connection Successfullly'))
.catch((err)=>console.log('Connection UnSuccessfully'))