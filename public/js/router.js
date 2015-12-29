define(['Backbone'], function(Backbone){
    var Router = Backbone.Router.extend({
        routes: {
            'myApp/:contentType': 'goTo',
            '*any': 'default'
        },

        goTo: function(contentType){
            var self = this;
            var viewUrl = 'views/' + contentType + '/' + contentType;
            var collectionUrl = 'collections/' + contentType;


            console.log(contentType);

            require([collectionUrl, viewUrl], function(Collection, View){
                var startTime = new Date();
                var collection = new Collection();

                collection.on('reset', buildView, self);

                function buildView(){
                    //ToDo add filtering, pagination logic etc...
                    var view = new View({
                        collection: collection,
                        startTime: startTime
                    });
                   /* self.changeView(view);*/
                };
            });

            //http://localhost:3030/#myApp/user --> contentType = user
            //viewUrl = 'views/user'
            //collectionUrl = 'collections/user'
            //require(['collections/user', 'views/user'], function(UserCollection, UserView){
            //
            //});
        },

       /* changeView: function(view){
            if(this.contentView){
                this.contentView.undelegateEvents();
            }

            this.contentView = view;
        },*/

        default: function(){
            Backbone.history.navigate('#myApp/user', {trigger: true});
        }
    });

    return Router;
});