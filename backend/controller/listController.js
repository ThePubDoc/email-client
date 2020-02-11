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

module.exports = {
  createList
};
