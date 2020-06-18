const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
// let socialData = require('.colorData.json');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("./partials/home");
    // res.render("./partials/colorPalette");
    // res.render("../partials/home", {async: false});
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
// let jsonData = {}
// fs.readFile(socialData, 'utf-8', (err, data) => {
//   if (err) throw err
//   jsonData = JSON.parse(data);
//   console.log(jsonData);
// })

    res.render("./partials/colorPalette/colorPalette");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on Port ${port}`));
