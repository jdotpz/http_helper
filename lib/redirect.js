var http = require('http');

// module.exports is a middleware
module.exports = function (redirects, proxies, port) {
  return http.createServer(function (req, res) {
    var components = req.headers.host.split(':');  // ["http", "status.mofowibble.info"]
    var requestHost = components[0];   // -> "http"
    var requestDomain = components[1]; // -> "status.mofeshizzles.biz"


    if (redirects[requestHost]) {
      var redirect = redirects[requestHost];
      var url = redirect.host + req.url;

      res.statusCode = redirect.code || 302;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Location', url);
      res.end('Redirecting to '+url);
    }

    else if (proxies[requestHost]) {
      var proxy = proxies[requestHost];

      // "request -> pipe to res" trick from other repo

    }

    else {
      // unknown host! follow the "*" redirect
      var redirect = redirects['*'];

      // we forgot to add a "*" rule in our config. fuck!
      if (!redirect) {
        //their is no catch all, we will just show an error message
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Host not found');
        return;
      }

      // there is a "*". Redirect there
      var redirect = redirects[requestHost];
      var url = redirect.host + req.url;

      res.statusCode = redirect.code || 302;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Location', url);
      res.end('Redirecting to '+url);
    }

  }).listen(port);
}

