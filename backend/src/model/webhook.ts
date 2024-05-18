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
});

const Webhook = mongoose.model("Webhook", WebhookSchema);

export default Webhook;
