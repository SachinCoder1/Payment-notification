import mongoose from "mongoose";

const WebhookSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  value: {
    type: Number,
  },
  network: {
    type: String,
  },
  completeData: {
    type: Object
  }
});

const Webhook = mongoose.model("Webhook", WebhookSchema);

export default Webhook;
