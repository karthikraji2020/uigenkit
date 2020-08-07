const mongoose = require("mongoose");

const LineargradientSchema = mongoose.Schema({
    colorStopOne: { type: String },
    colorStopTwo: { type: String },
    gradientName: { type: String },
});
module.exports = mongoose.model("LinearGradientColor", LineargradientSchema);


