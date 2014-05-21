#!/usr/bin/env node
if ( process.env.NEW_RELIC_ENABLED ) {
  require( "newrelic" );
}

var config = require("nconf")
    .argv()
    .file({file:__dirname+"/../config.json"});

redirect = require('../lib/redirect')(config.get('redirects'), config.get('port'));
console.log('redirect running on port %d', redirect.address().port);