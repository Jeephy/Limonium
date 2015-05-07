// ===================================================================
//    “星辰花”项目主程序
//    Limonium Project Main Program
//
//    Version 0.1.0
//
//            Created by Jeephy Ji on 2015/3/31.
// ===================================================================



// ------- 头部模块和全局变量    BEGIN MODULE SCOPE VARIABLES ---------

var express = require( 'express' ),
    http = require( 'http') ,
    //https = require( 'https' ),
    //fs = require( 'fs' ),
    bodyparser = require( 'body-parser'),
    formidable = require( 'formidable' );

//var options = {
//    key: fs.readFileSync(__dirname + '/key.pem'),
//    cert: fs.readFileSync(__dirname + '/key-cert.pem')
//};

var app = express();

var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

// -------------------------------------------------------------------



// -------- BEGIN SERVER CONFIGURATION ----------

app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );

// --------------------------------------------------



// -------- 路由配置    BEGIN ROUTE CONFIGURATION ----------

app.use( express.static( __dirname + '/public') );
app.use( bodyparser() );

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/thank-you', function (req, res) {
    res.render('thankyou');
});

app.get('/test', function (req, res) {
    res.render('jquerytest');
});

app.get('/nursery-rhyme', function (req, res) {
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});

app.get('/newsletter', function(req, res) {
    res.render('newsletter', {csrf: 'CSRF token goes here'});
});

app.post('/process', function(req, res) {
    if (req.xhr || req.accepts('json, html') === 'json') {
        res.send({success: true});
    } else {
        res.redirect(303, '/thank-you');
    }
});

app.get('/contest/vacation-photo', function(req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(), month: now.getMonth()
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields: ');
        console.log(fields);
        console.log('files: ');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// ---------------------------------------------------------



// ----------------- 启动服务器    BEGIN START SERVER -------------------

app.set('port', process.env.PORT || 8080);
http.createServer(app).listen(app.get('port'), function() {
//https.createServer(options, app).listen(app.get('port'), function() {
    console.log('dirname : '+__dirname);
    console.log('Express server listening on port :' + app.get('port'));
});
// ---------------------------------------------------------------------
