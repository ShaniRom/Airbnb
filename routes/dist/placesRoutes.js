"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var usersCont_1 = require("../controler/usersCont");
var placesCont_1 = require("../controler/placesCont");
var placesCont_2 = require("../controler/placesCont");
var placesCont_3 = require("../controler/placesCont");
router
    .get('/checkForUser', usersCont_1.loggedInUser)
    .get('/getToPlace/:placeId', placesCont_1.getToPlace)
    .get('/search-airbnb', placesCont_2.searchAirbnb)
    .post('/search-city', placesCont_3.searchAirbnbByCity);
exports["default"] = router;
