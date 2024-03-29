require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  // origin: "http://localhost:8081",
  origin:"*",
  Credentials:true,
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

// app.use(express.json());
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));

//mongoose connection 

mongoose.set('strictQuery', false)

const db = require("./model");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
  app.use(express.static(path.resolve(__dirname,'fronted','my-app','build')))
  res.sendFile(path.resolve(__dirname,'fronted','my-app','build','index.html'))
});

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});