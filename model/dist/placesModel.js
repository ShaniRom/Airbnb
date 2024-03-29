"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PlacesSchema = new mongoose_1["default"].Schema({
    id: String,
    accommodates: String,
    address: String,
    address_country: String,
    address_country_code: String,
    name: String,
    amenities: [String],
    bedrooms: String,
    beds: String,
    number_of_reviews: String,
    price: String,
    cancel: String,
    bathrooms: String,
    images: String,
    host: String,
    host_about: String,
    host_name: String,
    host_picture_url: String,
    description: String,
    bed_type: String,
    reviews_rating: String,
    daysAvailable: String
});
var Places = mongoose_1["default"].model("airbnboptions", PlacesSchema);
exports["default"] = Places;
