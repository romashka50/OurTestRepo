var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    age: {type: Number, default: 0},
    dateOfBirth: {type: Date, default: Date.now}
});

mongoose.model('user', userSchema);
