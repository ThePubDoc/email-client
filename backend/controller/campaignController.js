const campaign = require("../models/campaign")
const log = require("../../utils").log; 

function index(req,res){
    // console.log("---",req.body);
    try {
        const {name, format, subject} = req.body;
        const campaign_instance = new campaign({name, format, subject})
        campaign_instance.save()
        log.info("saved")
    }
    catch(err){
        log.info("Some error occured in campaign insert")
    }
}

module.exports = {
    index : index
}