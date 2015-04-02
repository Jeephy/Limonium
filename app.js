// ===================================================================
//    “星辰花”项目主程序
//    Limonium Project Main Program
//
//    Version 0.1.0
//
//            Created by Jeephy Ji on 2015/3/31.
// ===================================================================



// ------- 头部模块和全局变量    BEGIN MODULE SCOPE VARIABLES ---------

var
    http    = require( 'http' ),
    express = require( 'express' ),
    body_parser = require( 'body-parser' ),
    method_override = require( 'method-override'),
    serve_staic = require ( 'serve-static'),
    morgan = require ( 'morgan'),
    error_handler = require ( 'errorhandler'),
    routes  = require( './lib/routes.js' );

var app     = express();
// -------------------------------------------------------------------



// -------- BEGIN SERVER CONFIGURATION ----------

    app.use( body_parser.json() );
    app.use( body_parser.urlencoded({ extended: true }));
    app.use( method_override() );
    app.use( serve_staic( __dirname + './static' ) );

if ('development' == app.get('env')) {
    app.use( morgan() );
    app.use( error_handler({
        dumpExceptions : true,
        showStack      : true
    }) );
};

if ( 'production' == app.get('env'))  {
    app.use( error_handler() )
};

// routes.configRoutes( app, server );
// app.get('./lib', routes.js);
// --------------------------------------------------


// ------------ BEGIN START SERVER --------------

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
// -----------------------------------------------
