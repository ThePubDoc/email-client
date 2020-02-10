const campaign = require("../models/campaign")
const log = require("../../utils").log; 
const multer = require("multer");


function index(req,res){
    // console.log("---",req.body);
    // console.log("-",req.file.path)
    try {
        const file_url = req.file.path;
        const {name, format, subject} = req.body;
        const campaign_instance = new campaign({name, format, subject, file_url})
        campaign_instance.save();
        log.info("saved");
        res.redirect("/");
    }
    catch(err){
        log.info("Some error occured in campaign insert")
    }
}

function edit(req,res){
    const id = req.query.id;
    const {name, format, subject} = req.body;
    campaign.findOneAndUpdate(
        {_id : id},
        {name, format, subject},
        {upsert : false},
        (err,doc) => {
            if(err){
                console.log("error in updating")
            }
            else{
                // console.log(doc)
                res.redirect("/")
            }
        }
    )
}

function del(req,res){
    const id = req.query.id;
}

module.exports = {
    index : index,
    edit : edit,
    del : del,
}