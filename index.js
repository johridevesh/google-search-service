'use strict'

var Seneca = require('seneca');
var SenecaWeb = require('seneca-web');
var Express = require('express');
var bodyParser = require('body-parser');
var seneca = Seneca();

var searchServicePlugin = require('./src/google_search_plugin.js',{});

var Routes = [{
  pin: 'role:google,cmd:*',
  prefix: '/api/google',
  map: {
    search: {
      POST: true
    },
  }
}]

var app = Express();
app.use(bodyParser.json({ type: 'application/*+json' }))

var config = {
  routes: Routes,
  adapter: require('seneca-web-adapter-express'),
  context: app
};

var port = process.env.SERVER_PORT || 8081;

seneca.use(searchServicePlugin);
seneca.use(SenecaWeb,config);
seneca.ready(() => {
  var server = seneca.export('web/context')();
  server.listen(port, (error) => {
      console.log(error || 'server started on: '+port);
  });
});