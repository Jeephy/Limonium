// ===================================================================
//    地理编码测试程序
//    测试输入地名的经纬度
//    如：'Shanghai'、'Zunyi, Guizhou, China'、'北京'、'罗马'
//
//    Version 0.1.0
//
//            Created by Jeephy Ji on 2015/4/13.
// ===================================================================
var geo = require('./geocode');
var geoaddr = '首尔';

console.log('Start get geoAddress of the "' + geoaddr + '" :');
geo(geoaddr, function(err, coords) {
    if (err) return console.log('Geocoding failure for ' + geoaddr);
    console.log('Coords.lat = ' + coords.lat);
    console.log('Coords.lng = ' + coords.lng);
});