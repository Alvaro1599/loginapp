"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://AlvaroUser:Alvaro1599@clouddata.q6wnw.mongodb.net/LoginApp?retryWrites=true&w=majority", { dbName: "LoginApp" })
    .then((db) => console.log("database is connect"))
    .catch((err) => console.log(err));
//# sourceMappingURL=database.js.map