const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let provinceSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    num:{
        type:Number,
        required:true
    }
});

module.exports =mongoose.model("province",provinceSchema);