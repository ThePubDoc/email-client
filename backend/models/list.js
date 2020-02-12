const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    name : {type : String ,required : true},
    file_url : {type: String,required: true},
    contacts : {type: Number,default: 0}
},{timestamps : true})

module.exports = list = mongoose.model("list" , userSchema);