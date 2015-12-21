define(['/js/models/song.js', '/js/collections/songs.js'], function (SongModel, SongCollection, View) {
    function initialize() {
        var song = new SongModel({
            id: 1,
            title: 'Marry Christmas'
        });

        song.save(null, {
            wait: true,
            success: function(model, xhr){
                song.set('title', 'another one');
                song.trigger('myCustomEvent');
            },
            error: function(){

            }
        });

        function doSomethingWhenEvent(){ //ToDo read on http://backbonejs.org/#Events
            alert('We listening ' + this.get('title')); // this.get('title') === this.attributes.title || this.toJSON().title
        };

        song.on('myCustomEvent', doSomethingWhenEvent, song); // toDo read default Model trigered events {change, change:attr1,}
    }

    return {
        initialize: initialize
    }
});
