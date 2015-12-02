var fs = require('fs');
var url = require('url');

module.exports = function (request, response){
    //console.log(request);
    response.writeHead(200, {'Content-type': 'text/html'});

    // break out the request, note that [0] is always slash
    // Read the filename and parse the extension
      // .jpg -> images
      // .css -> stylesheets
      // .html -> views
    var extension = request.url.split('.');
    console.log(extension, extension.length, extension[1]);

    if(extension[1]){
      switch(extension[1]){
        case 'css':
          console.log('css detected');
          var path = '.' + extension[0] + '.' + extension[1];

          console.log(path);
          fs.readFile(path, 'utf-8', function (errors, contents){
            if (errors){
              console.log('CSS not found');
            }
            else{
              response.writeHead(200, {'Content-Type': 'text/css'});  // send data about response
              response.write(contents);  //  send repsonse body
              response.end(); // finished!  
            }
            
          });
          break;

        case 'html':
          console.log('html detected');
          var path = 'views' + extension[0] + '.' + extension[1];
          console.log(path);

          fs.readFile(path, 'utf8', function (errors, contents){
            if (errors){
              response.end('HTML Error');
            }
            else{
              response.write(contents);
              response.end();
            }
          });
          break;

        case 'jpg':
          console.log('jpeg detected');
          var path = '.' + extension[0] + '.' + extension[1];
          console.log(path);

          fs.readFile(path, function (errors, contents){
            if (errors){
              console.log('JPEG error');            
            }
            else{
              response.writeHead(200, {'Content-Type': 'image/jpeg'});  // send data about response
              response.write(contents);  //  send response body
              response.end(); // finished!
            }
          });
          break;

        default:
          response.end('File not found!!!');
      }
    } else {
          response.end('File not found!!!');
    }
};