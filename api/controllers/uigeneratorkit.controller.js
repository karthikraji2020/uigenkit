const UiGeneratorkitPalette = require('../models/uigeneratorkit.model');
const LinearGradientColor = require('../models/lineargradient.model');
const SocialMediaColors = require('../models/socialmedia.model');


exports.createCustomPalette = (req, res) => {
        const uiGeneratorkitPalette = new UiGeneratorkitPalette({
              id: req.body.id ,
              createdAt:  req.body.createdAt ,
              isLiked:  req.body.isLiked ,
              likes: req.body.likes,
              hex: {
                layer1:req.body.hex.layer1,
                layer2:req.body.hex.layer2,
                layer3:req.body.hex.layer3,
                layer4:req.body.hex.layer4,
            },
            rgb: {
                layer1:req.body.rgb.layer1,
                layer2:req.body.rgb.layer2,
                layer3:req.body.rgb.layer3,
                layer4:req.body.rgb.layer4,
            },
            rgba: {
                layer1:req.body.rgba.layer1,
                layer2:req.body.rgba.layer2,
                layer3:req.body.rgba.layer3,
                layer4:req.body.rgba.layer4,
            }
        })
        uiGeneratorkitPalette.save(function(err, rec) {
          if(err) {
            return res.status(400).send("error while creting a post")
          }
          console.log(rec);
          res.send(rec);
        })
};

// Retrieve and return all LineargradientSchema from the database.
exports.findAllCustomPalette = (req, res) => {
    UiGeneratorkitPalette.find()
    .then(palette  => {
        res.send(palette );
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the gradients."
        });
    });
};
// Retrieve and return all LineargradientSchema from the database.
exports.findAllLineargradient = (req, res) => {
    LinearGradientColor.find()
    .then(gradients => {
        res.send(gradients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the gradients."
        });
    });
};
// Retrieve and return all Socialmediapalette from the database.
exports.findAllSocialmediapalette = (req, res) => {
    SocialMediaColors.find()
    .then(socialMediaColors => {
        res.status(200).send(socialMediaColors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the socialMediaColors."
        });
    });
};
/*
// Update a url identified by the urlId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.longUrl) {
        return res.status(400).send({
            message: "LongUrl content can not be empty"
        });
    }
    // Find url and update it with the request body
    URLShortener.findByIdAndUpdate(req.params.urlId, {
        longUrl: req.body.longUrl,
        shortUrl:req.body.shortUrl,
        clickCount:req.body.clickCount,
    }, {new: true})
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });
        }
        res.send(url);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error updating longUrl with id " + req.params.urlId
        });
    });
};
*/

