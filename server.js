var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var hostname = 'localhost';
var port = 3000;
const fs = require('fs');
var jsonParser = bodyParser.json()

app.use(express.static('public/'));
var filePath = path.resolve('./public/' + 'calibrate.html');

app.get('/',function(req,res){
    res.sendFile(filePath);
  });
app.post('/json', jsonParser, function(request, response) {
  // console.log(request.body)
  var str = JSON.stringify(request.body) + '\n'
  fs.appendFile('output.txt', str, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('thanks')
})

app.listen(3000,function(){
  console.log(`Server running on http://${hostname}:${port}/`);
});