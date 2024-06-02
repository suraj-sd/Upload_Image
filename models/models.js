const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
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

const models =  mongoose.model("image", imageSchema);
module.exports = models
