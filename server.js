const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
// let socialData = require('./public/data/colorData.json');
const customPalette = require('./public/data/custompalette.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
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

app.get("/custompalette", function(req, res) {
    readDataAndSortwithDate('./public/data/custompalette.json',res);
});
app.post("/custompalette", function(req, res) {
            // Defining new user 
    
        // STEP 2: Adding new data to users object 
        customPalette.push(req.body); 
        // STEP 3: Writing to a file 
        fs.writeFile("./public/data/custompalette.json", JSON.stringify(customPalette), err => { 
            // Checking for errors 
            if (err) throw err;  
            console.log("Done writing"); // Success 
        }); 
        readDataAndSortwithDate('./public/data/custompalette.json',res);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on Port ${port}`));


function readDataAndSortwithDate(filePath,res) {
    fs.readFile(`${filePath}`, function(err, data) { 
        // Check for errors 
        if (err) throw err; 
        // Converting to JSON 
        const paletteData = JSON.parse(data); 
        // paletteData.sort((a,b)=>a.getTime()-b.getTime());
        let sortedArray = paletteData.sort(function(a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a>b ? -1 : a<b ? 1 : 0;
        });

        sortedArray.forEach(element => {
            let d1 = moment(element.createdAt);
            let d2 = moment();
            let days = d2.diff(d1, 'days');
            let result;
            let hours = d2.diff(d1, 'hours');
            // console.log(`Difference in hours: ${hours}`);
            result= hours>24 ? `${days} days ago` :  `${hours} hrs ago` ;
            let minutes = d2.diff(d1, 'minutes');
            result =minutes>60 ? `${hours} hours ago` :  `${minutes} mins ago` ;
            // console.log(`Difference in minutes: ${minutes}`);
            element.createdAt= result;
        });
        res.send(sortedArray);
    }); 
}