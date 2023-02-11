const dbConfig = require("../config/dbConfig")

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
 db.mongoose = mongoose;
 db.url = dbConfig.url;
 db.tables = require("./model")(mongoose);
//  db.speaker = require("./model")(mongoose);
//  db.cource_Speaker= require("./model")(mongoose);
//  db.topic = require("./model")(mongoose);

 module.exports=db;

 console.log("index is running fine")
