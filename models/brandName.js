const mongoose = require("mongoose");
const brandNameSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
    },
    images: {
      type: String,
    },
    isActive: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const brandName = mongoose.model("brandname-image", brandNameSchema);
module.exports = brandName;
