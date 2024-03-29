//---local storage 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function storeData(data) {
    try {
        if (data) {
            localStorage.setItem("airbnbData", JSON.stringify(data));
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
function getData() {
    try {
        var airbnbNavFiltered = JSON.parse(localStorage.getItem("airbnbData"));
        if (Array.isArray(airbnbNavFiltered.getplaces)) {
            return airbnbNavFiltered.getplaces;
        }
        else if (typeof airbnbNavFiltered === "object") {
            return airbnbNavFiltered;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
//---airbnb location search
function handleLoadPlaces() {
    var data = getData();
    handleCheckForUser();
    renderAirbnbOptions(data);
}
function handleLoadPlace() {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getData()];
                case 1:
                    data = _a.sent();
                    renderPlace(data);
                    handleCheckForUser();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleGoToPlace(placeId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/places/getToPlace/" + placeId)];
                case 1:
                    data = (_a.sent()).data;
                    storeData(data);
                    if (data) {
                        window.location.href = "place.html";
                        handleLoadPlace();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderPlace(data) {
    try {
        var data_1 = getData();
        var html = "";
        var rootChosenAirbnb = document.querySelector("#rootChosenAirbnb");
        html = " <div class=\"mainUpper\">\n        <div class=\"mainUpper__title\">\n            <h1>" + data_1.name + " </h1>\n            <h3>" + data_1.address_country + ", " + data_1.address_country_code + "</h3>\n            <h2>" + data_1.price + "$</h2>\n        </div>\n        <div class=\"mainUpper__photoGrid\">\n            <img class=\"img\" src=\"" + data_1.images + "\" alt=\"\" \">\n\n        </div>\n\n    </div>\n    <div class=\"mainMiddle\">\n        <div class=\"mainMiddle__left\">\n            <div class=\"mainMiddle__left--up\">\n                <div class=\"mainMiddle__left--up--title\">\n                    <h2>Entire rental unit hosted by " + data_1.host_name + "</h2>\n                </div>\n                <h4>accommadates: " + data_1.accommodates + " <span>&#8226;</span> bedroom: " + data_1.bedrooms + " <span>&#8226;</span> beds: " + data_1.beds + " <span>&#8226;</span> bathroom: " + data_1.bathrooms + "</h4>\n            </div>\n            <div class=\"mainMiddle__left--up--profile\">\n                <img src=\"" + data_1.host_picture_url + "\">\n            </div>\n        </div>\n        <div class=\"mainMiddle__left--great\">\n            <h5>" + data_1.description + "</h5>\n            \n        </div>\n        <div class=\"mainMiddle__left--bed\">\n            <h2>Beds Available:" + data_1.bed_type + "</h2>\n        </div>\n        <div class=\"mainMiddle__left--list\">\n            <h2>This Airbnb offers:</h2>\n\n           " + data_1.amenities.map(function (amentiy) {
            return " " + amentiy + " ";
        }) + "\n           \n\n        </div>\n\n    </div>\n\n    \n    <div class=\"reviews\">\n        <h2>Latest Review:</h2>\n        <div class=\"reviews__review\">\n               <div class=\"reviews__review__user\" >\n                <img src=\"images/guestDefaultImage.webp\" class=\"reviews__review__user--profilePic\" alt=\"guest profile image\">\n                <h4>Alex97</h4>\n               </div>\n            <p>\n            Very tidy and lovely AirBnb apartment equipped with everything you need. A good bed and nice bathroom. " + data_1.host_name + " is a great host , Very nice and had excellent restaurant recommendations and was of great help. We had a great stay.\n            </p>\n        </div>\n\n    </div>\n\n    <div class=\"aboutHost\">\n        <div class=\"aboutHost--left\">\n            <div class=\"aboutHost--left--profileHost\">\n                <img src=\"" + data_1.host_picture_url + "\" alt=\"host image\">\n            </div>\n            <div class=\"aboutHost--left--title\">\n                <h2>\n                    About host- " + data_1.host_name + "\n                </h2>\n              \n            </div>\n\n        </div>\n        <div class=\"aboutHost--right\">\n            <h4>\n                Languages the host speaks: english, french, hebrew \n            </h4>\n            <h4>\n            Response time: within an hour\n            </h4>\n            <h4>\n               Airbnb Rating: " + data_1.reviews_rating + "\n            </h4>\n\n\n            <p class=\"payment\">\n                To protect your payment, never transfer money or communicate outside of the Airbnb website or app.\n            </p>\n        </div>\n    </div>\n    <div class=\"houseInfo\">\n        <h2>Airbnb host rules:</h2>\n        <ul>\n            \n            <li>\n                Check-in: 4:00 PM - 10:00 PM\n            </li>\n            <li>\n                Checkout: 11:00 AM\n            </li>\n            <li>\n                No smoking\n            </li>\n            <li>\n                No pets\n            </li>\n            <li>\n                No parties or events\n            </li>\n\n        </ul>\n        <h2> Health & Safety</h2>\n        <ul>\n            \n            <li>\n                Airbnb's social-distancing and other COVID-19-related guidelines apply\n            </li>\n            <li>\n\n                Carbon monoxide alarm not reported Show more\n            </li>\n            <li>\n                Smoke alarm not reported Show more\n            </li>\n            <li>\n                Security Deposit - if you damage the home, you may be charged up to \u20AA2500\n            </li>\n\n        </ul>\n        <div class=\"houseInfo__cancel\">\n            <h5>cancellation policy: " + data_1.cancel + "</h5>\n          \n\n        </div>\n\n    </div>";
        rootChosenAirbnb.innerHTML = html;
    }
    catch (error) {
        console.error(error.message);
    }
}
function handleFindAirbnb(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var searchLocation, checkIn, checkOut, adults, children, infants, pets, data, ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    searchLocation = ev.target.elements.searchLocation.value;
                    checkIn = ev.target.elements.checkIn.value;
                    checkOut = ev.target.elements.checkOut.value;
                    adults = ev.target.elements.adults.value;
                    children = ev.target.elements.children.value;
                    infants = ev.target.elements.infants.value;
                    pets = ev.target.elements.pets.value;
                    return [4 /*yield*/, axios.get("/places/search-airbnb?searchLocation=" + searchLocation + "&checkIn=" + checkIn + "&checkOut=" + checkOut + "&adults=" + adults + "&children=" + children + "&infants=" + infants + "&pets=" + pets + " ")];
                case 1:
                    data = (_a.sent()).data;
                    storeData(data);
                    ok = data.ok;
                    if (ok === true) {
                        window.location.href = "places.html";
                        handleLoadPlaces();
                    }
                    else {
                        window.alert("No airbnbs found for " + " Destination:" + ("" + searchLocation));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function handleCities(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var city, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    city = ev.target.dataset.card;
                    return [4 /*yield*/, axios.post("/places/search-city", { city: city })];
                case 1:
                    data = (_a.sent()).data;
                    storeData(data);
                    if (data) {
                        window.location.href = "places.html";
                        handleLoadPlaces();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function renderAirbnbOptions(data) {
    try {
        if (!Array.isArray(data))
            throw new Error("data is not an array");
        var rootAirbnbOptions_1 = document.querySelector("#rootAirbnbOptions");
        var map_1 = document.querySelector('.airbnbOptions__grid--map');
        var html_1 = "";
        data.forEach(function (place) {
            if (place.address_country === 'Tel Aviv') {
                map_1.innerHTML = '<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tel%20aviv+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure distance on map</a></iframe>';
            }
            else if (place.address_country === 'Eilat') {
                map_1.innerHTML = '<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Eilat+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure area map</a></iframe>';
            }
            else if (place.address_country === 'Jerusalem') {
                map_1.innerHTML = '<iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Jerusalem&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
            }
            else if (place.address_country === 'Harei Yehuda') {
                map_1.innerHTML = '<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Harei%20Yehuda+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">area maps</a></iframe>';
            }
            html_1 += " <div class=\"airbnbOptions__container\" onclick=\"handleGoToPlace('" + place._id + "')\">\n                      <div class=\"airbnbOptions__container__img\">\n                          <img src=\"" + place.images + "\">\n                      </div>\n                      <div class=\"airbnbOptions__container__content\">\n                          <div class=\"airbnbOptions__container__content__namePlace\">                                \n                              \n                                  <p>" + place.name + "</p>\n                          </div>\n                          <div class=\"airbnbOptions__container__content__description\">\n                              <p>" + place.bathrooms + " bathrooms\u00B7\n" + place.bedrooms + " bedrooms\u00B7" + place.beds + " beds\u00B7" + place.accommodates + " guests</p>\n                             \n                         \n                              " + place.amenities
                .map(function (amenity) {
                return "" + (amenity.search(amenity) !== -1
                    ? amenity + "\u00B7 "
                    : "");
            })
                .join(" ") + "\n   \n                            \n                                                        \n                          </div>\n                        \n                          <div class=\"airbnbOptions__container__content__priceRating\">\n                              <button class=\"btn btn-outline\">\n                              \u20AA" + place.price + " night\n                              </button>\n                              <button class=\"btn btn-outline\">\n                                 \n                              \u2B50" + place.reviews_rating + "(" + place.number_of_reviews + " reviews)\n                                  \n\n                              </button>\n                          </div>\n\n                      </div>\n                  </div>";
            html_1 += "<br/>";
            rootAirbnbOptions_1.innerHTML = html_1;
        });
    }
    catch (error) {
        console.error(error.message);
    }
}
