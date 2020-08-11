const Uigeneratorkit = require('../controllers/uigeneratorkit.controller.js');
const express = require('express');
const router = express.Router();
// const checkAuth= require('./../middleware/check-auth');

    // Retrieve all Notes
    router.get('/lineargradientcolors', Uigeneratorkit.findAllLineargradient);

    // Create a new custompalette
    // router.post('/custompalette', Uigeneratorkit.findAllUiGeneratorkitPalette);

    // Create a new custompalette
    router.get('/custompalette', Uigeneratorkit.findAllCustomPalette);

     // Retrieve all socialmediapalette
    router.get('/socialmediapalette', Uigeneratorkit.findAllSocialmediapalette);

    // Update a Url with urlId
    // router.put('/updateurl/:urlId', Uigeneratorkit.updatePalette);

    // Delete a Url with urlId
    // router.delete('/deleteurl/:urlId', URLShortener.delete);

    module.exports = router;
