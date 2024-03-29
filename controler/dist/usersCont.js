"use strict";
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
exports.__esModule = true;
exports.deleteUser = exports.updateUser = exports.getUsers = exports.loggedInUser = exports.signOutUser = exports.registerUser = exports.login = void 0;
var usersModel_1 = require("../model/usersModel");
var jwt_simple_1 = require("jwt-simple");
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, role, user, secret, payload, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password, role = _a.role;
                if (!(typeof username === "string" &&
                    typeof password === "string" &&
                    typeof role === "string")) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel_1["default"].findOne({ username: username, password: password, role: role })];
            case 1:
                user = _b.sent();
                if (user) {
                    if (user.password === password) {
                        secret = process.env.JWT_SECRET;
                        payload = { username: username, id: user._id, role: role };
                        token = jwt_simple_1["default"].encode(payload, secret);
                        res.cookie("userInfo", token, { maxAge: 900000, httpOnly: true });
                        res.send({ ok: true, login: true });
                        return [2 /*return*/];
                    }
                }
                throw new Error("username or password or role are incorrect");
            case 2: throw new Error("username or password or role is missing");
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error(error_1.message);
                res.send({ error: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, role, newUser, result, payload, secret, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password, role = _a.role;
                if (!(typeof username === "string" &&
                    typeof password === "string" &&
                    typeof role === "string")) return [3 /*break*/, 2];
                newUser = new usersModel_1["default"]({ username: username, password: password, role: role });
                return [4 /*yield*/, newUser.save()];
            case 1:
                result = _b.sent();
                payload = { username: username, id: newUser._id, role: role };
                secret = process.env.JWT_SECRET;
                token = jwt_simple_1["default"].encode(payload, secret);
                res.cookie("userInfo", token, { httpOnly: true });
                res.send({ ok: true, register: true });
                return [3 /*break*/, 3];
            case 2: throw new Error("username or password or role is missing");
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error(error_2.message);
                res.send({ error: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signOutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo;
    return __generator(this, function (_a) {
        try {
            userInfo = req.cookies.userInfo;
            if (userInfo) {
                res.clearCookie("userInfo");
                res.send({ signedOut: true });
                return [2 /*return*/];
            }
            throw new Error(" no user to sign out from ");
        }
        catch (error) {
            console.error(error.message);
            res.send({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
//--checks if there is a user logged in
exports.loggedInUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, secret, decoded;
    return __generator(this, function (_a) {
        try {
            userInfo = req.cookies.userInfo;
            if (!userInfo)
                throw new Error('"userInfo" not found ');
            if (userInfo) {
                console.log('"userInfo" found');
                secret = process.env.JWT_secret;
                if (!secret)
                    throw new Error("no secret found in the server");
                decoded = jwt_simple_1["default"].decode(userInfo, secret);
                res.send({ username: decoded.username, role: decoded.role });
            }
        }
        catch (error) {
            console.error(error.message);
            res.send({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, secret, decoded, users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log("user id is " + req.id + " and the role is " + req.role);
                userInfo = req.cookies.userInfo;
                secret = process.env.JWT_SECRET;
                decoded = jwt_simple_1["default"].decode(userInfo, secret);
                if (!(decoded && decoded.role === "admin")) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel_1["default"].find({ role: { $ne: "admin" } })];
            case 1:
                users = _a.sent();
                res.send({ ok: true, users: users });
                return [2 /*return*/];
            case 2: throw new Error("user is not allowed ");
            case 3:
                error_3 = _a.sent();
                console.log("error on getUsers", error_3.message);
                res.send({ error: error_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, username, users, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, userId = _a.userId, username = _a.username;
                if (!(username && userId)) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel_1["default"].updateOne({ _id: userId }, { username: username })];
            case 1:
                users = _b.sent();
                res.send({ ok: true, users: users });
                console.log(req.id + ' updated the user: ' + userId + ' new username is ' + username);
                return [3 /*break*/, 3];
            case 2: throw new Error("username or userId  is missing");
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.error(error_4.message);
                res.send({ error: error_4.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, users, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.body.userId;
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, usersModel_1["default"].deleteOne({ _id: userId })];
            case 1:
                users = _a.sent();
                res.send({ ok: true, users: users });
                console.log(users);
                console.log(userId + " deleted a user");
                return [3 /*break*/, 3];
            case 2: throw new Error(" userId  is missing");
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error(error_5.message);
                res.send({ error: error_5.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
