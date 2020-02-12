const Campaign = require("../models/campaign");
const List = require("../models/list");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require('csv-parser');

async function index(req, res) {
  const campaigns = await Campaign.find({});
  res.render("campaigns", {
    campaigns
  });
}

async function send_campaign(req, res) {
  const campaigns = await Campaign.find({});
  const lists = await List.find({});
  res.render("send-campaign", {
    lists,
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

function view_campaign(req, res) {
  const id = req.query.id;
  Campaign.findOne({ _id: id }).exec((err, doc) => {
    if (err) {
      console.log("Error in viewing campaign file");
    } else {
      const file_url = path.join(__dirname, "../../", doc.file_url);
      // const file_url = "../"+ doc.file_url;
      // console.log(file_url)
      fs.readFile(file_url, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
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

function edit_list(req, res) {
  const id = req.query.id;

  List.find({ _id: id }).exec(function(err, list) {
    if (err) {
      console.log("Error in fetching id");
    } else {
      res.render("edit-list", {
        list: list
      });
    }
  });
}

function del_list(req, res) {
  const id = req.query.id;
  console.log(id);
  List.findOneAndDelete({ _id: id }).exec((err, list) => {
    if (err) {
      console.log("Error in deleting");
    } else {
      res.redirect("/lists");
    }
  });
}

function copy_list(req, res) {
  const id = req.query.id;
  // console.log(id);
  List.findOne({ _id: id }).exec((err, doc) => {
    if (err) {
      console.log("Error in fetching in cpoy");
    } else {
      const { name, file_url } = doc;
      const list_instance = new List({
        name,
        file_url
      });
      list_instance.save();
      res.redirect("/lists");
    }
  });
}

module.exports = {
  index,
  completed_campaigns,
  create_campaign,
  edit_campaign,
  del_campaign,
  copy_campaign,
  view_campaign,
  create_list,
  lists,
  edit_list,
  del_list,
  copy_list,
  send_campaign
};
