import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  chain: {
    type: String,
  },
});

const Merchant = mongoose.model("Merchant", merchantSchema);

export default Merchant;
