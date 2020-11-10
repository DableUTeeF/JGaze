var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (req, res) {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method === 'GET') {
    var fileUrl = '';


    // Change fileUrl depends on url
    if (req.url === '/') {
      fileUrl = '/index.html';
    } else {
      fileUrl = req.url;
    }

    var filePath = path.resolve('./public' + fileUrl);
    var fileExt = path.extname(filePath);

    // Handle only .html file
    if (fileExt === '.html') {
      // check file exists
      fs.exists(filePath, function (exists) {

        // does not exist
        if (!exists) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
        }
        else {
          // normal logic
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          fs.createReadStream(filePath).pipe(res);
        }
      });
    } else {
      // not html file 
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.end('<h1>Error 404: ' + fileUrl + ' is not HTML file</h1>');
    }

  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end('<h1>Error 404: ' + req.method + ' is not supported</h1>')
  }


});


server.listen(port, function () {
  console.log(`Server running on http://${hostname}:${port}/`);
})