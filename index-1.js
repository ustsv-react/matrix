const express = require("express");
var bodyParser = require("body-parser");

const path = require("path");
const mongoose = require("mongoose");
const mongodbConnect = require("./config/database");

const db = mongoose.connection;
const app = new express();


const data = ["San Francisco", "San Jose", "New York", "Sand"];

// Connect to mongodb

mongodbConnect();

// import models
const Employee = require("./models/Employee.js");

// Server Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("A " + req.method + " request received at " + new Date());
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});



app.post("/api/list", (req, res) => {
  res.json({data: data});
});






app.post("/api/search", (req, res) => {
  const searchText = req.body.seachText;
  if (!searchText) {
    res.json({matchedText: []});
  }
  let matchedResult = data.filter((ele) => ele.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
  res.json({matchedText: matchedResult});
});


app.listen(5000, () => {
  console.log("Listening to port 5000.");
});
