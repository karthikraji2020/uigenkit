require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const apiRoute = require('./api/routes/uigeneratorkit.routes');
const LinearGradientColor = require('./api/models/lineargradient.model');
const SocialMediaColors = require('./api/models/socialmedia.model');
const UiGeneratorkitPalette = require('./api/models/uigeneratorkit.model');
const port = process.env.PORT || 3000;

const mongooseSets={
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };
  // Connecting to the database
  mongoose.connect(process.env.MONGODB_URI, mongooseSets).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//dataPaths

//middlewares 
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressLayouts);
// app.use('/api',apiRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("./partials/home");
});

app.get("/home", function(req, res) {
    res.render("./partials/home");
});

app.get("/neumorphism", function(req, res) {
    res.render("./partials/neumorphism/neumorphism");
});
app.get("/colorpalette", function(req, res) {
    res.render("./partials/colorPalette/colorPalette");
});
app.get("/lineargradient", function(req, res) {
    res.render("./partials/linearGradient/linearGradient");
});

app.get("/about", function(req, res) {
    res.render("./partials/about/about");
});

app.get("/api/custompalette", function(req, res) {
    UiGeneratorkitPalette.find()
    .then(customPalette => {
        res.status(200).send(customPalette);  
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the customPalette."
        });
    });
});
app.get("/api/socialmediapalette", function(req, res) {
    SocialMediaColors.find()
    .then(socialMediaColors => {
        res.status(200).send(socialMediaColors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the socialMediaColors."
        });
    });
});

app.get("/api/lineargradientcolors", function(req, res) {
    LinearGradientColor.find()
    .then(gradients => {
        res.status(200).send(gradients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the gradients."
        });
    });
});

 // UPDATE
app.put("/api/updatelikesbyid/:paletteid",  function(req, res) {
      // Validate Request
      let paletteid =req.params.paletteid;
      let likes =req.body.likes;
      let isLiked =req.body.isLiked;
      console.log(paletteid);
  
    UiGeneratorkitPalette.findOneAndUpdate(
        { "id": paletteid}, {
            likes: req.body.likes,
            isLiked:req.body.isLiked,
    }, {new: true})
    .then(palette => {
        if(!palette) {
            return res.status(404).send({
                message: "palette not found with id " +paletteid
            });
        }
        UiGeneratorkitPalette.find()
        .then(customPalette => {
        res.send(customPalette);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the customPalette."
            });
        });
    }).catch(err => {
       
        return res.status(500).send({
            message:err.message+ "Error updating palette with id " +paletteid
        });
    });

});


app.post("/api/custompalette", function(req, res) {

    const lineargradient = new UiGeneratorkitPalette({
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
    });
  lineargradient.save(function(err, rec) {
    if(err) {
      return res.status(400).send("error while creting a post")
    }
    UiGeneratorkitPalette.find()
    .then(customPalette => {
    res.send(customPalette);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the customPalette."
        });
    });

  })
        
});


app.listen(port, () => console.log(`Server started on Port ${port}`));

