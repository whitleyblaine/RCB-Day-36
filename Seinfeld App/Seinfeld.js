// Making an Express server available
var express = require('express');
var app = express();

// Adding in the components of the mysql library. Outlining the parameters tied to the mysql db
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'E$*G8Y1el6rn0AshUb6YY5Nm6F62103$',
  database: 'seinfeld'
});

// Connecting the mysql database mentioned above
connection.connect(function(err) {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/', function(req, res) {
  connection.query('SELECT * FROM actors', function(err, result) {

    var html = '<h1> Seinfeld Actors </h1>';

    html += '<ul>'

    // Use the data from the database to populate an HTML file
    for (var i = 0; i < result.length; i++) {
      html += '<li><p> ID: ' + result[i].id + '</p>';
      html += '<p>Name: ' + result[i].name + '</p>';
      html += '<p>Coolness Points: ' + result[i].coolness_points + '</p>';
      html += '<p>Attitude: ' + result[i].attitude + '</p></li>';
    };

    html += '</ul>'

    // Send the html to the browser
    res.send(html);
  });
});

app.get('/coolness-chart', function(req, res) {
  connection.query('SELECT * FROM actors ORDER BY coolness_points DESC', function(err, result) {

    var html = '<h1> Seinfeld Actors </h1>';

    html += '<ul>'

    // Use the data from the database to populate an HTML file
    for (var i = 0; i < result.length; i++) {
      html += '<li><p>Name: ' + result[i].name + '</p>';
      html += '<p>Coolness Points: ' + result[i].coolness_points + '</p>';
      html += '<p>Attitude: ' + result[i].attitude + '</p><br></li>';
    };

    html += '</ul>'

    // Send the html to the browser
    res.send(html);
  });
});

app.get('/attitude-chart/:att', function(req, res) {
  // Uses prepared statement to avoid sql injection
  connection.query('SELECT * FROM actors WHERE attitude = ?', [req.params.att], function(err, result) {

    var html = '<h1> Seinfeld Actors With an Attitude of ' + req.params.att + '</h1>';

    html += '<ul>'

    // Use the data from the database to populate an HTML file
    for (var i = 0; i < result.length; i++) {
      html += '<li><p>Name: ' + result[i].name + '</p>';
      html += '<p>Attitude: ' + result[i].attitude + '</p>';
      html += '<p>Coolness Points: ' + result[i].coolness_points + '</p><br></li>';
    };

    html += '</ul>'

    // Send the html to the browser
    res.send(html);
  });
});

// Telling the server to run
var port = 3000;
app.listen(port);
