'use strict';

var Hapi         = require('hapi'),
  server         = new Hapi.Server('0.0.0.0', process.env.PORT),
  io             = require('socket.io')(server.listener),
  routes         = require('./routes/config/routes'),
  plugins        = require('./routes/config/plugins'),
  authentication = require('./routes/config/authentication'),
  mongoose       = require('mongoose').connect(process.env.DB);

io.on('connection', require('./sockets/connection'));

mongoose.connection.once('open', function(){
  server.pack.register(plugins, function(){
    server.auth.strategy('session', 'cookie', true, authentication);
    server.route(routes);
    server.start(function(){
      server.log('info', server.info.uri);
    });
  });
});
