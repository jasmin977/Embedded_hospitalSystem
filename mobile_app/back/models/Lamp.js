const mongoose = require("mongoose");

const LampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["on", "off"],
    default: "off",
  },
});

const Lamp = mongoose.model("Lamp", LampSchema);

module.exports = Lamp;
