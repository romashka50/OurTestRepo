define([
    'Backbone',
    'text!templates/user/userItem.html'
], function(Backbone, UserTemplate){
    var View = Backbone.View.extend({
        tagName: 'tr',
        template: _.template(UserTemplate),

        events: {
            'click .edit': 'editItem'
        },

        initialize: function(options){
            this.render();
        },

        editItem: function(){
            alert('OK');
        },

        render: function(){

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return View;
});
