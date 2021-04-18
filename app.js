//Require Express and bodyParser
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const mysql = require('mysql');


const db = require(__dirname + "/db.js");
// Connect to Database
var con = mysql.createConnection(db);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Create an app
const app = express();
//set ejs with express
app.set("view engine", "ejs");
//Allows fetching data from the form to the server
app.use(bodyParser.urlencoded({
  extended: true
}));
//This allows the usage of local static files which in this case are saved in the public folder
app.use(express.static("public"));




//GET Requests
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


//Post Requests
app.post("/", function(req, res) {
  const firstName = req.body.inputFN;
  const lastName = req.body.inputLN;
  const emailaddress = req.body.inputEmail;
  //const matrixId = req.body.matrixId;
  const street = req.body.street;
  const city = req.body.city;
  const country = req.body.country;
  const birthdate = req.body.inputdate;
  const birthplace = req.body.inputbirthPlace;

  var sql_users = "INSERT INTO users (firstname, lastname,  email) VALUES ('" + firstName + "', '" + lastName + "', '"  + "', '" + emailaddress + "' )";
  // var last_id = "SELECT LAST_INSERT_ID() FROM customers";
  var sql_address = "INSERT INTO address (street, city, country, userID) VALUES ('" + street + "', '" + city + "', '" + country + "', LAST_INSERT_ID())";
  var sql_dob = "INSERT INTO dob (userID, birthdate, birthplace) VALUES (LAST_INSERT_ID(),'" + birthdate + "', '" + birthplace + "')";
  con.query(sql_users, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted into users");
  });

  con.query(sql_address, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted into address");
  });
  con.query(sql_dob, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted into dob");
  });

  res.sendFile(__dirname + "/success.html");
});


// Route /user-list GET
app.get('/user-list', function(req, res, next) {
  var sql = "SELECT users.user_id, users.firstname, users.lastname, users.matrixID, users.email, dob.birthdate, dob.birthPlace, address.street, address.city, address.country FROM users INNER JOIN address on address.userID = users.user_id INNER JOIN dob on dob.userID = users.user_id";
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    //console.log(date);
    res.render('user-list', {
      title: 'User List',
      userData: data,
      convert: convert
    });
  });


  // app.get('/success', function(req, res) {
  //   res.redirect('/user-list');
  //   //res.sendFile(__dirname + "/success.html");
  // });


  //Change date format function
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
});

//Set up the server listening port to 3000
app.listen(3000, function() {
  console.log("Server Started on Port 3000");
});
