const Campaign = require("../models/campaign");

async function index(req, res) {
  const campaigns = await Campaign.find({});
  console.log(campaigns);
  res.render("index", {
    campaigns
  });
}

function campaign(req, res) {
  res.render("campaign");
}

module.exports = {
  index,
  campaign
};
