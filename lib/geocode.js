// ===================================================================
//    地理编码获取程序模块
//
//
//    Version 0.1.0
//
//            Created by Jeephy Ji on 2015/4/13.
// ===================================================================
console.log('Enter geocode.js !');
var http = require('http');

module.exports = function(query, cb) {
    var options = {
        hostname: 'maps.googleapis.com',
        path: '/maps/api/geocode/json?address=' +
            encodeURIComponent(query) + '&sensor=false'
    };
    http.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function(){
            data = JSON.parse(data);
            if (data.results.length) {
                cb(null, data.results[0].geometry.location);
            } else {
                cb("No results found.", null);
            }
        });
    }).end();
}

