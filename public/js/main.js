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
        templates: '../templates'
    },
    shim : {
        'Backbone': ['Underscore', 'jQuery'],
        'app'     : ['Backbone']
    }
});

require(['app'], function (app) {
    app.init();
});