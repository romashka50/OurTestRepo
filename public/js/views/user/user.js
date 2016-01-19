define([
    'Backbone',
    'views/user/userItem',
    'views/user/createItem',
    'text!templates/user/user.html'
], function (Backbone, UserItemView, createItem, UserTemplate) {
    var View = Backbone.View.extend({
        el      : '#content-holder',
        template: _.template(UserTemplate),

        events: {
            'click #createBtn': 'createItem',
            'click .edit': 'editItem'
        },

        initialize: function (options) {
            this.chanel = options.chanel;
            this.startTime = options.startTime;
            this.render();
        },

        createItem: function (e) {
            if(this.creatItemView){
                this.creatItemView.undelegateEvents();
            }
            this.creatItemView = new createItem();
        },

        editItem: function(){
            alert('OK');
        },

        render: function () {

            this.$el.html(this.template({
                tableName: 'UserTable'
            }));

            this.collection.each(function (model) {
                var item = new UserItemView({model: model});
            });

            this.$el.append('<span>' + (new Date() - this.startTime) + '</span>');

            this.chanel.trigger('customEvent');
            return this;
        }
    });

    return View;
});
