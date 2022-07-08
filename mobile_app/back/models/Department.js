const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0,
  },
  lamp: {
    type: String,
    enum: ["on", "off"],
    default: "off",
  },
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
