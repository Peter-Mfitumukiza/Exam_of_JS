
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let districtSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    num:{
        type:Number,
        required:true
    }
});

module.exports =mongoose.model("district",districtSchema);