var http = require('http');
var request = require('request');
var express = require('express');
var app = express();

module.exports = function (appOptions, port) {

  app.get('/healthcheck', function(req, res){
    res.send('healthcheck');
    console.log('Request to ' + req.protocol + ':://' + req.host + '/' + req.path + ' returned a ' + res.statusCode );
  });

  app.get('*', function(req, res){
    var requestHost = req.headers.host.split(':')[0];
    var hostOptions = appOptions[requestHost];

    if(!hostOptions){
      console.log(req.host + ' is not a valid host');
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(req.host + ' is invalid');
    }

    var actionOptions = hostOptions.function;

    if(actionOptions === "redirect"){
      console.log('requestHost is ' + requestHost + ' and hostOptions are ' + hostOptions + ' and actionOptions are ' + actionOptions );
      var url = hostOptions.host + req.url;

      // Set the status and redirect
      console.log('Redirecting ' + req.host + ' to ' + hostOptions.host + ' with a http status code of ' + hostOptions.code);
      console.log(req.protocol);
      res.statusCode = hostOptions.code || 302;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Location', url);
      res.end('Redirecting to '+url);
    }

    if(actionOptions === "proxy") {
      var url = hostOptions.host + req.url;
      request.get(url, function(error, result) {
        if (error) {
          res.write("there was an error requesting " + req.protocol + '://' + hostOptions.host);
          res.write( JSON.stringify(error) );
          return console.error(error);
        }
      console.log('Pulling ' + url + ' to ' + requestHost);
      res.write( result.body );
      res.end();
      });
    }
  });
  app.listen(80);
}
