const mongoose = require("mongoose");

const SocialMediaSchema = mongoose.Schema({
    brandName: { type: String },
    colorFormats:{ 
        hex: { type: String },
        hashhex: { type: String },
        rgb: { type: String },
        rgba: { type: String },
      
    }
});
module.exports = mongoose.model("SocialMediaColors", SocialMediaSchema);


