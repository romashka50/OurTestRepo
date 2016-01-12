define(['Backbone'], function (Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            'myApp/:contentType': 'goTo',
            '*any'              : 'default'
        },

        initialize: function(){
            //events chanel
            this.chanel = _.extend({}, Backbone.Events);
            this.listenTo(this.chanel, 'customEvent', function(){
                console.log('---- customEvent fired ----');
            })
        },

        goTo: function (contentType) {
            var self = this;
            var viewUrl = 'views/' + contentType + '/' + contentType;
            var collectionUrl = 'collections/' + contentType;

            console.log(contentType);

            require([collectionUrl, viewUrl], function (Collection, View) {
                var startTime = new Date();
                var collection = new Collection();

                collection.on('reset', buildView, self);

                function buildView() {
                    //ToDo add filtering, pagination logic etc...
                    var view = new View({
                        chanel: this.chanel,
                        collection: collection,
                        startTime : startTime
                    });
                    /* self.changeView(view);*/
                };
            });
        },

        default: function () {
            Backbone.history.navigate('#myApp/user', {trigger: true});
        }
    });

    return Router;
});