// ===================================================================
//    “星辰花”项目主程序
//    Limonium Project Main Program
//
//    Version 0.1.0
//
//            Created by Jeephy Ji on 2015/3/31.
// ===================================================================



// ------- 头部模块和全局变量    BEGIN MODULE SCOPE VARIABLES ---------

var express = require( 'express' );

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

//    body_parser = require( 'body-parser' ),
//    method_override = require( 'method-override'),
//    serve_staic = require ( 'serve-static'),
//    morgan = require ( 'morgan'),
//    error_handler = require ( 'errorhandler'),
//    routes  = require( './lib/routes.js' );

app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );

// -------------------------------------------------------------------



// -------- BEGIN SERVER CONFIGURATION ----------
//
//    app.use( body_parser.json() );
//    app.use( body_parser.urlencoded({ extended: true }));
//    app.use( method_override() );
//    app.use( serve_staic( __dirname + './static' ) );
//
//if ('development' === app.get('env')) {
//    app.use( morgan() );
//    app.use( error_handler({
//        dumpExceptions : true,
//        showStack      : true
//    }) );
//};
//
//if ( 'production' === app.get('env'))  {
//    app.use( error_handler() )
//};

// routes.configRoutes( app, server );
// app.get('./lib', routes.js);
// --------------------------------------------------



// -------- 路由配置    BEGIN ROUTE CONFIGURATION ----------

app.use(express.static( __dirname + '/public/asset'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/test', function (req, res) {
    res.render('jquerytest');
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



// ------------ BEGIN START SERVER --------------

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Express server listening on port :' + app.get('port'));
});
// -----------------------------------------------
