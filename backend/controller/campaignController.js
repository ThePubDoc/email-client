const Campaign = require("../models/campaign");
const log = require("../../utils").log;
const multer = require("multer");

function index(req, res) {
  try {
    const file_url = req.file.path;
    const { name, format, subject } = req.body;
    const campaign_instance = new Campaign({ name, format, subject, file_url });
    campaign_instance.save();
    log.info("saved");
    res.redirect("/");
  } catch (err) {
    log.info("Some error occured in campaign insert");
  }
}

function edit(req, res) {
  const id = req.query.id;
  const { name, format, subject } = req.body;
  Campaign.findOneAndUpdate(
    { _id: id },
    { name, format, subject },
    { upsert: false },
    (err, doc) => {
      if (err) {
        console.log("error in updating");
      } else {
        res.redirect("/");
      }
    }
  );
}

module.exports = {
  index: index,
  edit: edit
};
