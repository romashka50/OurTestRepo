define(['/js/models/song.js', '/js/collections/songs.js'], function (SongModel, SongCollection) {
    function initialize() {
        var song = new SongModel({
            id: 1,
            title: 'Marry Christmas'
        });

        var o = {
            save: function(data){
                $('#title').text(data.title);
            }
        };
        _.extend(o, Backbone.Events);

        o.listenTo(song, 'myCustomEvent', function(){
            this.save(song.changed);
        });

        song.save(null, {
            wait: true,
            success: function(model, xhr){
                song.set('title', 'another one');
                song.trigger('myCustomEvent', {tile: 'sdgfjsdgjhsdgf'});
            },
            error: function(){

            }
        });
    }

    return {
        initialize: initialize
    }
});
