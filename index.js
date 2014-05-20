// Main manipulator app
var http = require("http"),
  _ = require('underscore'),
  request = require("request"),
  underscore = require("underscore"),
  port = 80;

// this is a function we're going to use to determine whether our listen() call succeeds or not
function listenCallback(error, no_error_data) {
  if (error) {
    // ....
    return console.error("this shit be bunk yo: ", error);
  }

  console.log("We are listening for your requests on port " + port);
};


var proxyOptions = {
  router: {
    "opennews.org" : 'opennews.org',
    "training.webmakerprototypes.org" : 'training.webmakerprototypes.org',
    "togetherjs.com" : "origin.togetherjs.com"
  }
};

var redirectOptions = {
    'mozillaopennews.com'      : 'http://opennews.org/',
    'www.jdotpz.org'  : 'http://jdotpz.org/',
    'training.webmakerprototypes.org' : 'http://training.webmakerprototypes.org'  };

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer(proxyOptions);

var server = http.createServer(function(req, res) {
    var oriHost = req.headers.host,
        //remove port number from original host
        host = oriHost.indexOf(":") ? oriHost.split(':')[0] : oriHost;

  //Check matches of redirect hostnames
if(_.has(redirectOptions, host)) {
  res.writeHead(301, { //You can use 301, 302 or whatever status code
    'Location': redirectOptions[host],
    'Expires': (new Date()).toGMTString()
    });
  res.end();
  } else {
    //Routing proxy will handle the rest of requests
    proxy.proxyRequest(req, res);
  }
});

server.on('upgrade', function(req, socket, head) {
  proxy.proxyWebSocketRequest(req, socket, head);
});

server.listen(80, "0.0.0.0", listenCallback);