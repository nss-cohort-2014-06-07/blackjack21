'use strict';

module.exports = {
  description: 'Static Routes',
  tags:['general'],
  auth: false,
  handler: {
    directory: {
      path: __dirname + '/../../../../public'
    }
  }
};
