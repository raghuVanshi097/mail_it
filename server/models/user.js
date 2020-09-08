const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:String,
        required:true
    },
    resetToken:{
        type:String,
        required:false
    },
    expireToken:{
        type:Date,
        required:false
    }
});

mongoose.model("User",userSchema)

