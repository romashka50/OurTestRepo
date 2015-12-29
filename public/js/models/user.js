define(['Backbone'], function(Backbone){
    var UserModel = Backbone.Model.extend({
        //by default idAttribute: 'id'
        idAttribute: '_id',
        defaults: {
            gender: 'male'
        }
    });

    //collection.fetch({reset: true, success: cb, error: cb})
    
    return UserModel;
});