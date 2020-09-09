"use strict";

var Sequelize = require('sequelize');

var sequelize = new Sequelize('WebCrud', 'cw', '44543303873', {
  host: 'localhost',
  dialect: 'mssql',
  sync: {
    force: true
  }
});
sequelize.authenticate().then(function () {
  return console.log('Authenticated');
})["catch"](function () {
  return console.log('Error Auth');
});
sequelize.sync();
module.exports = sequelize;