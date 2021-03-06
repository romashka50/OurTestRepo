var APP = APP || {};

require.config({
    paths: {
        jQuery     : './libs/jquery/dist/jquery',
        Underscore : './libs/underscore/underscore',
        Backbone   : './libs/backbone/backbone',
        text       : './libs/text/text',
        models     : './models',
        collections: './collections',
        views      : './views',
        templates  : '../templates',
        moment     : './libs/moment/moment',
        io         : '/socket.io/socket.io'
    },
    shim : {
        Underscore: {
            exports: '_'
        },
        jQuery    : {
            exports: '$'
        },
        'Backbone': ['Underscore', 'jQuery'],
        'app'     : ['Backbone', 'io']
    }
});

require(['app', 'io'], function (app, io) {
    app.init();
    io().on('myServer', function(msg){
        console.log(msg);
    });
});