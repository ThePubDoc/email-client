const List = require("../models/list");
const log = require("../../utils").log;
const multer = require("multer");

function createList(req, res) {
  try {
    const file_url = req.file.path;
    const { name } = req.body;
    const list_instance = new List({ name, file_url });
    list_instance.save();
    log.info("saved");
    res.redirect("/lists");
  } catch (err) {
    log.info("Some error occured in campaign insert");
  }
}

function edit_list(req,res){
  const id = req.query.id;
  const {name, format, subject} = req.body;
  List.findOneAndUpdate(
      {_id : id},
      {name,},
      {upsert : false},
      (err,doc) => {
          if(err){
              console.log("error in updating")
          }
          else{
              // console.log(doc)
              res.redirect("/lists")
          }
      }
  )
}

module.exports = {
  createList,
  edit_list,
};
