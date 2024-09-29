require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
// const apiRoute = require('./api/routes/uigeneratorkit.routes');
const LinearGradientColor = require('./api/models/lineargradient.model');
const SocialMediaColors = require('./api/models/socialmedia.model');
const UiGeneratorkitPalette = require('./api/models/uigeneratorkit.model');
const port = process.env.PORT || 3000;

// const connectDB= require("./libs/db");
const multer = require("multer");
// const sharp = require("sharp");

// const uri = "mongodb+srv://admin:Password@cluster0.zt42g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
// Connect DB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     consoog("MongoDB Connected...");
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

const mongooseSets={
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };
  // Connecting to the database

  const connectDB = async () => {
  try {
    await  mongoose.connect(process.env.MONGODB_URI, mongooseSets);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();


//dataPaths

//middlewares 
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(compression({
    level:6,
    threshold:10*1000, //10kb
    filter: (req, res)=>{
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
          }
          // fallback to standard filter function
          return compression.filter(req, res)
    }
   
}))
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



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });
  
  const upload = multer({
    storage: storage
  });

  app.post("/preview", upload.single("image"), (req, res, next) => {
    const file = req.file;
    var ext;
  
    if (!file) {
      const error = new Error("Please Upload a file");
      error.httpStatusCode = 404;
      return next(error);
    }
    if (file.mimetype == "image/jpeg") {
      ext = "jpg";
    }
    if (file.mimetype == "image/png") {
      ext = "png";
      }
      console.log(file.path)
  
    res.render("./partials/imageoptimizer/preview", { url: file.path, name: file.filename, ext: ext });
  });
  
  app.post("/compress/uploads/:name/:ext",  (req, res) => {
    let name =req.params.name;
    let ext =req.params.ext;
    console.log(name);
    console.log(__dirname);
    let file =name;
    console.log(file);
    const fileFormat = ext;
    if (fileFormat === 'svg') {
      console.log('svg not processed with sharp');
      return;
    }
  
    let sh = sharp('./uploads/' + file);
    if (fileFormat === 'jpg' || fileFormat === 'jpeg') {
      sh = sh.jpeg({ quality: 70 });
    } else if (fileFormat === 'png') {
      sh = sh.png({ quality: 70 });
    }
  
    sh.toFile('output/' + file, function (err, info) {
      // console.log(info);
      if (err) {
        console.log('error in image optimization');
        return;
      }
    });
    setTimeout(()=>{
      res.download(path.join(__dirname,`output/${file}`));
    },1000)
  
  });
  
  
app.get("/", function(req, res) {
    res.render("./partials/home");
});

app.get("/home", function(req, res) {
    // res.setHeader('Cache-Control', 'public, max-age=86400');
    res.render("./partials/home");
});
app.get("/imageoptimizer", function(req, res) {
    res.render("./partials/imageoptimizer/imageoptimizer");
});
app.get("/test", function(req, res) {
    res.send("test".repeat(100000));
});

app.get("/neumorphism", function(req, res) {
    res.render("./partials/neumorphism/neumorphism");
});
app.get("/pattern", function(req, res) {
    res.render("./partials/bgPattern/bgPattern");
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

app.post('/lineargradientposts', function(req, res) {
  const lineargradient = new LinearGradientColor({
    gradientName: req.body.gradientName,
    colorStopOne: req.body.colorStopOne,
    colorStopTwo: req.body.colorStopTwo
  })
  // const lineargradient = new SocialMediaColors({
  //   brandName: req.body.brandName,
  //   colorFormats: {
  //       hex:req.body.colorFormats.hex,
  //       hashhex:req.body.colorFormats.hashhex,
  //       rgb:req.body.colorFormats.rgb,
  //       rgba:req.body.colorFormats.rgba,
  //     }
  // })
  console.log(req.body);
  
  lineargradient.save(function(err, rec) {
    if(err) {
      return res.status(400).send("error while creting a post")
    }
    console.log(rec);
    res.send(rec);
  })
})



app.listen(port, () => console.log(`Server started on Port ${port}`));

function getExtension(filename) {
  let ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1];
}
