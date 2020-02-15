const mongoose = require("mongoose")

const schema = mongoose.Schema

const listSchema = new schema({
    name : {type : String ,required : true},
    file_url : {type: String,required: true},
    contacts : {type: Number,default: 0},
    emails : {type: Array,default : []},
},{timestamps : true})

module.exports = list = mongoose.model("list" , listSchema);