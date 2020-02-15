const Campaign = require("../models/campaign");
const SentCampiagn = require("../models/sent-campaign");
const List = require("../models/list");
const log = require("../../utils").log;
const multer = require("multer");
const fs = require("fs")
const path = require("path")
const csv = require('csv-parser');
var AWS = require("aws-sdk");

AWS.config.loadFromPath(path.join(__dirname,"../../","aws.json"));

function index(req, res) {
  try {
    const html_content = req.file.buffer.toString();
    const { name, format, subject } = req.body;
    // console.log(req.file.buffer.toString())
    const campaign_instance = new Campaign({ name, format, subject, html_content });
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
  const {lists_id, campaign_id, sender, sender_email, reply_email } = req.body;
  // console.log(lists)
  const selectedCampaign = await Campaign.findOne({_id : campaign_id})
  const campaign = selectedCampaign.name;
  const campaign_subject = selectedCampaign.subject;
  const template = selectedCampaign.html_content;

  let total_contacts = 0;
  let destinations = [];
  let lists_name = [];
  if(Array.isArray(lists_id)){
    for(list in lists_id){
      const selectedList = await List.findOne({_id : lists_id[list]});
      lists_name.push(selectedList.name);
      for(email in selectedList.emails){
        destinations.push(selectedList.emails[email]);
      }
      total_contacts = total_contacts + selectedList.contacts;
    }
  }
  else{
    const selectedList = await List.findOne({_id : lists_id});
    lists_name.push(selectedList.name);
    for(email in selectedList.emails){
      destinations.push(selectedList.emails[email]);
    }
    total_contacts = selectedList.contacts;
  }
  console.log(destinations)
  var params = {
    Destination: { /* required */
      CcAddresses: [
        sender_email
        /* more items */
      ],
      ToAddresses: destinations
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: template
        },
        Text: {
         Charset: "UTF-8",
         Data: "TEXT_FORMAT_BODY"
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: campaign_subject
       }
      },
    Source: sender_email, /* required */
    ReplyToAddresses: [
       reply_email,
      /* more items */
    ],
  };
  
  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  
  // Handle promise's fulfilled/rejected states
  // sendPromise.then(
  //   function(data) {
  //     console.log(data.MessageId);
  //   }).catch(
  //     function(err) {
  //     console.error(err, err.stack);
  //   });
  // console.log("---",destinations)

  const sent_campaign_instance = new SentCampiagn({campaign, campaign_subject, sender, sender_email, reply_email, lists_id, lists_name, total_contacts})
  sent_campaign_instance.save();
  // console.log(sent_campaign_instance);
  res.redirect("/campaigns/sent?id="+sent_campaign_instance._id);
}

module.exports = {
  index,
  edit,
  send
};
