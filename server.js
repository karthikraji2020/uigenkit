const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const socialMediaColor = require('./public/data/socialMediaColor.json');
const linearGradientColor = require('./public/data/linearGradientColor.json');
const customPalette = require('./public/data/custompalette.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
//dataPaths

const customPaletteDataPath = `./public/data/custompalette.json`;



//middlewares 
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("./partials/home");
});


app.get("/home", function(req, res,next) {
    res.render("./partials/home");
});

app.get("/neumorphism", function(req, res) {
    res.render("./partials/neumorphism/neumorphism");
});
app.get("/lineargradient", function(req, res) {
    res.render("./partials/linearGradient/linearGradient");
});

app.get("/colorpalette", function(req, res) {
    res.render("./partials/colorPalette/colorPalette");
});
// app.get("/createCustomPalette", function(req, res) {
//     res.render("./partials/colorPalette/createCustomPalette");
// });

app.get("/custompalette", function(req, res) {
    readDataAndSortwithDate(`${customPaletteDataPath}`,res);
});
app.get("/socialmediapalette", function(req, res) {
    res.status(200).send(socialMediaColor);
});
app.get("/lineargradientcolors", function(req, res) {
    res.status(200).send(linearGradientColor);
});

 // UPDATE
app.put("/updatelikesbyid/:paletteid", function(req, res) {
    let paletteid =req.params.paletteid;
    let likes =req.body.likes;
    let isLiked =req.body.isLiked;

      customPalette.forEach(element => {
        if(element.id == paletteid) {
          element.likes= likes;
          element.isLiked= isLiked;
         }
    });

      // STEP 3: Writing to a file 
      fs.writeFile(`${customPaletteDataPath}`, JSON.stringify(customPalette, null, 2), err => { 
        // Checking for errors 
        if (err) throw err;  
        console.log("Done update"); // Success 
    }); 
    readDataAndSortwithDate(`${customPaletteDataPath}`,res);

});




 // UPDATE
 app.get('/users/:id', (req, res) => {

    readFile(data => {

        console.log(filteredItems);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
    },
        true);
});


    // variables

// app.post("/likes", function(req, res) {
//     let layers =req.body.obj.split(',');
//     console.log(layers);
//     res.render("./partials/colorPalette/likes",{layers});
// });
//   res.redirect('/')
app.post("/custompalette", function(req, res) {
        // STEP 2: Adding new data to users object 
        customPalette.push(req.body); 
        // STEP 3: Writing to a file 
        fs.writeFile(`${customPaletteDataPath}`, JSON.stringify(customPalette, null, 2), err => { 
            // Checking for errors 
            if (err) throw err;  
            console.log("Done writing"); // Success 
        }); 
        readDataAndSortwithDate(`${customPaletteDataPath}`,res);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on Port ${port}`));


function readDataAndSortwithDate(filePath,res) {
    fs.readFile(`${filePath}`, function(err, data) { 
        // Check for errors 
        if (err) throw err; 
        // Converting to JSON 
        const paletteData = JSON.parse(data); 
            // console.log(`Difference in hours: ${hours}`);
        let t1= Date.now();
        let sortedArray = paletteData.sort((a,b)=>b.likes-a.likes);
      
        // sortedArray.map(x=>{
        //     console.log(`likes ${x.likes}`);})
        sortedArray.sort(function(a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return ((a>b) ? -1 : (a<b) ? 1 : 0);
        });

        sortedArray.forEach(element => {
            let d1 = moment(element.createdAt);
            let d2 = moment();
            let days = d2.diff(d1, 'days');
            let result;
            let months = d2.diff(d1, 'months');
            let years = d2.diff(d1, 'years');
            let hours = d2.diff(d1, 'hours');
            let minutes = d2.diff(d1, 'minutes');
            result= months>12 ? `${years} years ago` :  `${months} months ago` ;
            result= hours>24 ? `${days} days ago` :  `${hours} hrs ago` ;
            result =minutes>60 ? `${hours} hours ago` :  `${minutes} mins ago` ;
            element.createdAt= result;
        });
        // sortedArray.map(x=>{
        //     console.log(`likes ${x.likes}`);})
        let t2= Date.now();
        console.log(`Difference in ms: ${t2-t1}`);
        res.status(200).send(sortedArray);
    }); 
}