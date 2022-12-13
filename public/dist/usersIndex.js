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
//---airbnb users 
function handleGetUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, users, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/users/get-Users")];
                case 1:
                    result = _a.sent();
                    data = result.data;
                    users = data.users;
                    handleCheckForUser();
                    if (users) {
                        renderUsersToOwnerPage(users);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renderUsersToOwnerPage(users) {
    try {
        if (!Array.isArray(users))
            throw new Error("data is not an array");
        var airbnbUsers_1 = document.querySelector("#airbnbUsers");
        var html_1 = "";
        users.forEach(function (user) {
            html_1 += "<div class=\"airbnbUser\" >\n                       <h3 class=\"airbnbUser__username\"> Username: " + user.username + "</h3>\n                       <p>id: " + user._id + "</p>\n                       <input type=\"text\" value=" + user.username + " name=\"username\" onblur=\"handleUpdateUsers(event,'" + user._id + "')\" >                       \n                       <p class=\"airbnbUser__role\"> User Role: " + user.role + "</p> \n                       <button class=\"airbnbUser__deleteUser\" onclick='handleDeleteUsers(\"" + user._id + "\")'>Delete User</button>                  \n                       \n                       \n\n                    </div>";
            airbnbUsers_1.innerHTML = html_1;
        });
    }
    catch (error) {
        console.error(error.message);
    }
}
function handleCheckForUser() {
    return __awaiter(this, void 0, void 0, function () {
        var data, username, role, userProfileButton, showUsersName, showSignOutOption, ownerPageOption, ownerPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/places/checkForUser")];
                case 1:
                    data = (_a.sent()).data;
                    username = data.username, role = data.role;
                    try {
                        if (username) {
                            userProfileButton = document.querySelector(".navigation--user");
                            showUsersName = document.querySelector("#theUsersName");
                            showSignOutOption = document.querySelector("#signOut");
                            ownerPageOption = document.querySelector("#toOwnerPage");
                            if (role === "admin") {
                                ownerPage = "owner.html";
                                ownerPageOption.innerHTML = '<a href="' + ownerPage + '" class="ownerPageLink">Owner Page</a>';
                                userProfileButton.style.backgroundColor = "#228B22";
                                showSignOutOption.innerHTML = "SignOut";
                            }
                            else if (role === "host") {
                                showUsersName.innerHTML = "" + username;
                                showSignOutOption.innerHTML = "SignOut";
                                userProfileButton.style.backgroundColor = "#66CDAA";
                            }
                            else {
                                showUsersName.innerHTML = "" + username;
                                showSignOutOption.innerHTML = "SignOut";
                                userProfileButton.style.backgroundColor = "#3CB371";
                            }
                        }
                        else {
                            console.log("Username or Password or Role is incorrect");
                        }
                    }
                    catch (err) {
                        console.error(err.message);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function handlePopupLogin() {
    var showPopupText = document.querySelector(".popupForm");
    showPopupText.style.visibility = "visible";
}
function handleClosePopop() {
    var closePopupText = document.querySelector(".popupForm");
    closePopupText.style.visibility = "hidden";
}
function handleKeepPopop() {
    var showPopupText = document.querySelector(".popupForm");
    showPopupText.style.visibility = "visible";
}
function handleLogin(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, role, data, showPopupText, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ev.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = ev.target.elements, username = _a.username, password = _a.password, role = _a.role;
                    username = username.value;
                    password = password.value;
                    role = role.value;
                    return [4 /*yield*/, axios.post("/users/login", {
                            username: username,
                            password: password,
                            role: role
                        })];
                case 2:
                    data = (_b.sent()).data;
                    if (data.login) {
                        showPopupText = document.querySelector(".popupForm");
                        showPopupText.style.visibility = "hidden";
                        handleCheckForUser();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleRegister(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, role, data, showPopupText, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ev.preventDefault();
                    _a = ev.target.elements, username = _a.username, password = _a.password, role = _a.role;
                    username = username.value;
                    password = password.value;
                    role = role.value;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post("/users/add-User", {
                            username: username,
                            password: password,
                            role: role
                        })];
                case 2:
                    data = (_b.sent()).data;
                    if (data.register) {
                        showPopupText = document.querySelector(".popupForm");
                        showPopupText.style.visibility = "hidden";
                        if (role === "host" || role === "guest") {
                            handleCheckForUser();
                        }
                        else {
                            console.log("can not register as admin ");
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    console.error(err_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleSignOut() {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/users/signOut-user")];
                case 1:
                    result = _a.sent();
                    window.location.reload();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.error(err_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleUpdateUsers(ev, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var username, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = ev.target.value;
                    return [4 /*yield*/, axios.patch("/users/update-user", {
                            userId: userId,
                            username: username
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/];
            }
        });
    });
}
function handleDeleteUsers(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios["delete"]("/users/delete-user", {
                        data: { userId: userId }
                    })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/];
            }
        });
    });
}
