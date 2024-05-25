import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  chain: {
    type: Object,
  },
  accessToken: {
    type: String,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  socketId: {
    type: String,
    default: null,
  },
});

const Merchant = mongoose.model("Merchant", merchantSchema);

export default Merchant;
