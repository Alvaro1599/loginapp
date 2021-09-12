import Mongoose from "mongoose";

Mongoose.connect(
  "mongodb+srv://AlvaroUser:Alvaro1599@clouddata.q6wnw.mongodb.net/LoginApp?retryWrites=true&w=majority",
  { dbName: "LoginApp" }
)
  .then((db) => console.log("database is connect"))
  .catch((err) => console.log(err));
