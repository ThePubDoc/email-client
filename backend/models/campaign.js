const mongoose = require("mongoose")

const schema = mongoose.Schema

const campaignSchema = new schema({
    name : {type : String ,required : true},
    format : {type : String , required : true},
    subject : {type: String,required: true},
    file_url : {type: String,required: true},
},{timestamps : true})

module.exports = campaign = mongoose.model("campaign" , campaignSchema);