const mongoose = require("mongoose");

const UiGeneratorkitPaletteSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  createdAt: {
    type: Number,
  },
  isLiked: {
    type: Boolean,
  },
  likes:{
    type: Number,
    default: 0
  },
  hex: {
    layer1: { type: String },
    layer2: { type: String },
    layer3: { type: String },
    layer4: { type: String },
  },
  rgb: {
    layer1: { type: String },
    layer2: { type: String },
    layer3: { type: String },
    layer4: { type: String },
  },
  rgba: {
    layer1: { type: String },
    layer2: { type: String },
    layer3: { type: String },
    layer4: { type: String },
  },
});

module.exports = mongoose.model("UiGeneratorkitPalette", UiGeneratorkitPaletteSchema);
