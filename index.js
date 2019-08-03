const express = require("express");
var bodyParser = require("body-parser");
const htmlTemplate = require("./public/html");

const path = require("path");
const mongoose = require("mongoose");
const mongodbConnect = require("./config/database");

const db = mongoose.connection;
const app = new express();



const data = ["San Francisco", "San Jose", "New York", "Sand"];

// Connect to mongodb

// mongodbConnect();

// import models
const Employee = require("./models/Employee.js");

// Server Middleware
app.use(bodyParser.json());

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log("A " + req.method + " request received at " + new Date());
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// start  from here

app.get("/matrix/:number", (req, res) => {
  const matrix = htmlTemplate.replace("{:MATRIX}", toHTML(req.params.number));
  res.send(matrix);
});

app.get("/api/matrix/:number", (req, res) => {
  res.send(toHTML(req.params.number));
})


function toHTML(size) {
  let res = '<table style="border:1px solid green;margin:20% auto;">';
  let matrix = buildMatrix(size);
  for (let i = 0; i < matrix.length; i++) {
      res += '<tr>';
      for (let j = 0; j < matrix[i].length; j++) {
          res += '<td style="text-align:center;padding:20px;">' + matrix[i][j] + '</td>';
      }
      res += '</tr>';
  }
  res += '</table>';
  return res;
}

function buildMatrix(s) {
  let res = [];
  for (let i = 0; i < s; i++) {
      res[i] = [];
  }
  let count = 1;
  let offset = 0, size = s;
  while (true) {
      if (size < 1) {
          break;
      }
      if (size == 1) {
          res[offset][offset] = count;
          break;
      }
      for (let i = 0; i < size - 1; i++) {
          res[offset][offset + i] = count++;
      }
      for (let i = 0; i < size - 1; i++) {
          res[offset + i][offset + size - 1] = count++;
      }
      for (let i = 0; i < size - 1; i++) {
          res[offset + size - 1][offset + size - 1 - i] = count++;
      }
      for (let i = 0; i < size - 1; i++) {
          res[offset + size - 1 - i][offset] = count++;
      }
      size -= 2;
      offset++;
  }
  return res;
}



// end here

app.post("/api/search", (req, res) => {
  const searchText = req.body.seachText;
  if (!searchText) {
    res.json({ matchedText: [] });
  }
  let matchedResult = data.filter((ele) => ele.toUpperCase().indexOf(searchText.toUpperCase()) > -1);
  res.json({ matchedText: matchedResult });
});


app.listen(5000, () => {
  console.log("Listening to port 5000.");
});
