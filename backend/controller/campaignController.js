const Campaign = require("../models/campaign");
const SentCampiagn = require("../models/sent-campaign");
const List = require("../models/list");
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

async function send(req, res) {
  const {lists, campaign_id, sender, sender_email, reply_email } = req.body;
  console.log(lists)
  const selectedCampaign = await Campaign.findOne({_id : campaign_id})
  const campaign = selectedCampaign.name;
  const campaign_subject = selectedCampaign.subject;

  let total_contacts = 0;
  if(Array.isArray(lists)){
    for(list in lists){
      const selectedList = await List.findOne({_id : lists[list]});
      total_contacts = total_contacts + selectedList.contacts;
    }
  }
  else{
    const selectedList = await List.findOne({_id : lists});
    total_contacts = selectedList.contacts;
  }

  const sent_campaign_instance = new SentCampiagn({campaign, campaign_subject, sender, sender_email, reply_email, lists, total_contacts})
  sent_campaign_instance.save();
  console.log(sent_campaign_instance);
  res.redirect("/campaigns/sent?id="+sent_campaign_instance._id);
}

module.exports = {
  index,
  edit,
  send
};
