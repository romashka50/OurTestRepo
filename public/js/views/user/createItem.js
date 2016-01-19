define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/user/createItem.html',
    'models/user'
], function (Backbone, _, $, templateHtml, Model) {
    var View = Backbone.View.extend({
        el      : '#content-holder',
        template: _.template(templateHtml),

        events: {
            'click #saveBtn'  : 'saveItem',
            'click #cancelBtn': 'cancel'
        },

        initialize: function (options) {
            this.render();
        },

        saveItem: function (e) {
            e.preventDefault();
            var self = this;

            var firstName = this.$firstName.val();
            var lastName = this.$lastName.val();
            var email = this.$email.val();
            var dateOfBirth = this.$dateOfBirth.val();
            var data = {
                name       : {
                    first: firstName,
                    last : lastName
                },
                email      : email,
                dateOfBirth: dateOfBirth
            };

            var user = new Model(data);

            //user.url = '';

            user.save(null, {
                success: function (model, xhr, options) {
                    self.undelegateEvents();

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('myApp/user', {trigger: true});
                },
                error  : function (model, xhr, options) {
                    self.$el.append('<span>Error</span>');
                }
            });
        },

        cancel: function () {
            Backbone.history.navigate('myApp/user', {trigger: true});
        },

        render: function () {
            var $thisEl = this.$el;
            $thisEl.html(this.template());

            this.$firstName = $thisEl.find('#firstName');
            this.$lastName = $thisEl.find('#lastName');
            this.$email = $thisEl.find('#email');
            this.$dateOfBirth = $thisEl.find('#dateOfBirth');

            return this;
        }
    });
    return View;
});
