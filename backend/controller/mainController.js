const Campaign = require("../models/campaign");
const List = require("../models/list");
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

function create_campaign(req, res) {
  res.render("create-campaign");
}

function edit_campaign(req, res) {
  const id = req.query.id;

  Campaign.find({ _id: id }).exec(function(err, campaign) {
    if (err) {
      console.log("Error in fetching id");
    } else {
      res.render("edit-campaign", {
        campaign: campaign
      });
    }
  });
}

function del_campaign(req, res) {
  const id = req.query.id;
  Campaign.findOneAndDelete({ _id: id }).exec((err, campaign) => {
    if (err) {
      console.log("Error in deleting");
    } else {
      res.redirect("/");
    }
  });
}

function copy_campaign(req, res) {
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

function create_list(req, res) {
  res.render("create-list");
}

async function lists(req, res) {
  const lists = await List.find({});
  res.render("lists", {
    lists
  });
}

module.exports = {
  index,
  completed_campaigns,
  create_campaign,
  edit_campaign,
  del_campaign,
  copy_campaign,
  create_list,
  lists
};
