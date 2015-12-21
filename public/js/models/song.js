define(['Backbone'], function(Backbone){
    var Song = Backbone.Model.extend({
        idAttribute: 'name',
        urlRoot: function(){
            return '/song/'
        }
    });

    return Song;
});