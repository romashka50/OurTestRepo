require.config({
    paths: {
        jQuery    : './libs/jquery/dist/jquery',
        Underscore: '/js/libs/underscore/underscore',
        Backbone  : './libs/backbone/backbone'
    },
    shim : {
        'Backbone': ['Underscore', 'jQuery'],
        'app'     : ['Backbone']
    }
});

require(['app/app'], function (app) {
    app.initialize();
});