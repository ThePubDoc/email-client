const mongoose = require("mongoose");

const schema = mongoose.Schema;

const sentCampaignSchema = new schema(
  {
    campaign: { type: String, required: true },
    campaign_subject: { type: String, required: true },
    sender: { type: String, required: true },
    sender_email: { type: String, required: true },
    reply_email: { type: String, requiredl: true },
    lists: { type: Array, required: true },
    total_contacts: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = sent_campaign = mongoose.model(
  "sent_campaign",
  sentCampaignSchema
);
