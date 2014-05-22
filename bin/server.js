#!/usr/bin/env node
if ( process.env.NEW_RELIC_ENABLED ) {
  require( "newrelic" );
}

var nconf = require("nconf");
var redirect = require('../lib/redirect');

// load the config from config.json
var config = nconf.argv().file({file:__dirname+"/../config.json"});


// extract the values we'll be passing to redirect()
var redirectList = config.get('redirect');
var proxyList = config.get('monkeys');
var redirectPort = config.get('port');

// check the redirects
redirect(redirectList, redirectPort);

console.log('redirect running on port %d', redirect.address().port);