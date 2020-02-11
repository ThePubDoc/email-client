const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    name : {type : String ,required : true},
    file_url : {type: String,required: true},
},{timestamps : true})

module.exports = list = mongoose.model("list" , userSchema);