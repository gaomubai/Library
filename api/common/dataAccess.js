var mysql = require('mysql');
var dbConfig = require('.././web.config.js').dbConfig

var dbPool = mysql.createPool(dbConfig);

dbPool.getConnection(function (err, conn) {
    if (err)
        throw err;
});

dbPool.on('error', function(err) {
  console.log(err.code);
});

module.exports = dbPool;
