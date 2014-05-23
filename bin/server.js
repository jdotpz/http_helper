#!/usr/bin/env node
if ( process.env.NEW_RELIC_ENABLED ) {
  require( "newrelic" );
}

var config = require("nconf")
    .argv()
    .file({file:__dirname+"/../config.json"});

helperApp = require('../lib/brain')(config.get('appOptions'), config.get('port'));
console.log('redirect running on port %d', helperApp.address().port);