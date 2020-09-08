const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const projectSchema = new mongoose.Schema({
        title:{
            type :String,
            required: true,
        },
        body:{
            type :String,
            required: true,
        },
        file:{
            type :String,
            required: true,
        },
        belongTo:{
            type:ObjectId,
            ref:"User"
        },
        isSent:{
            type:Boolean,
            required:true
        }
});

mongoose.model("Project",projectSchema)