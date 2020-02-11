const Campaign = require("../models/campaign");
const multer = require("multer");

async function index(req, res) {
  const campaigns = await Campaign.find({});
  res.render("index", {
    campaigns
  });
}

async function completed_campaigns(req, res) {
  const campaigns = await Campaign.find({});
  res.render("completed-campaigns", {
    campaigns
  });
}

function campaign(req, res) {
  res.render("campaign");
}

function edit(req, res) {
  const id = req.query.id;

  Campaign.find({ _id: id }).exec(function(err, campaign) {
    if (err) {
      console.log("Error in fetching id");
    } else {
      res.render("edit", {
        campaign: campaign
      });
    }
  });
}

function del(req, res) {
  const id = req.query.id;
  Campaign.findOneAndDelete({ _id: id }).exec((err, campaign) => {
    if (err) {
      console.log("Error in deleting");
    } else {
      res.redirect("/");
    }
  });
}

function copy(req, res) {
  const id = req.query.id;
  console.log(id);
  Campaign.findOne({ _id: id }).exec((err, doc) => {
    if (err) {
      console.log("Error in fetching in cpoy");
    } else {
      const { name, format, subject, file_url } = doc;
      const campaign_instance = new Campaign({
        name,
        format,
        subject,
        file_url
      });
      campaign_instance.save();
      res.redirect("/");
    }
  });
}

module.exports = {
  index,
  campaign,
  edit,
  del,
  copy,
  completed_campaigns
};
