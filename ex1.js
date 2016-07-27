// Dependencies
var express = require('express');

// Sets up the Express App
var app = express();

// Routes

app.get('/:operator/:num1/:num2', function(req, res){
  var params = req.params;
  var operator = params.operator;
  var num1 = parseInt(params.num1);
  var num2 = parseInt(params.num2);
  if (operator == 'add') {
    res.send(200, num1 + num2);
  } else if (operator == 'subtract') {
    res.send(200, num1 - num2);
  } else if (operator == 'divide') {
    res.send(200, num1 / num2);
  } else if (operator == 'multiply') {
    res.send(200, num1 * num2);
  };
});

app.listen(3000, function(){
  console.log('App listening on PORT ' + 3000);
});