define([
    'Backbone',
    'views/user/userItem',
    'text!templates/user/user.html'
], function(Backbone, UserItemView, UserTemplate){
    var View = Backbone.View.extend({
        el: '#content-holder',
        template: _.template(UserTemplate),

        initialize: function(options){
            this.chanel = options.chanel;
            this.startTime = options.startTime;
            this.render();
        },

        render: function(){

            this.$el.html(this.template({
                tableName: 'UserTable'
            }));

            this.collection.each(function(model){
                var item = new UserItemView({model: model});
            });

            this.$el.append('<span>' + (new Date() - this.startTime) + '</span>' );

            this.chanel.trigger('customEvent');
            return this;
        }
    });

    return View;
});
