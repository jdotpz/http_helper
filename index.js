// Main manipulator app
var http = require("http"),
  _ = require('underscore'),
  request = require("request"),

  port = 80;

// this is a function we're going to use to determine whether our listen() call succeeds or not
function listenCallback(error, no_error_data) {
  if (error) {
    // ....
    return console.error("this shit be bunk yo: ", error);
  }

  console.log("We are listening for your requests on port " + port);
};
