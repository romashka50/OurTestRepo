define(['Backbone', '/js/models/song.js'], function(Backbone, Song){
    var Songs = Backbone.Collection.extend({
        model: Song,
        url: '/song/'
    });

    return Songs;
});