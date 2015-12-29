define([
    'Backbone',
    'text!templates/user/userItem.html'
], function(Backbone, UserTemplate){
    var View = Backbone.View.extend({
        el: '#bodyHolder',
        template: _.template(UserTemplate),

        initialize: function(options){
            this.render();
        },

        render: function(){

            this.$el.append(this.template(this.model.toJSON()));

            return this;
        }
    });

    return View;
});
