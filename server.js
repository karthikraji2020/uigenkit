var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("./partials/home");
    // res.render("./partials/colorPalette");
    // res.render("../partials/home", {async: false});
});

app.get("/home", function(req, res) {
    res.render("./partials/home");
});

app.get("/neumorphism", function(req, res) {
    res.render("./partials/neumorphism/neumorphism");
});
app.get("/lineargradient", function(req, res) {
    res.render("./partials/linearGradient/linearGradient");
});

app.get("/solidcolor", function(req, res) {
    res.render("./partials/colorPalette/colorPalette");
});
// app.get("/about", function(req, res) {
//     res.render("./partials/about");
// });
// app.listen(3000, function() {
//     console.log("server is listening!!!");
// });

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));
