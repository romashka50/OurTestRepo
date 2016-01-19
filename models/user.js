var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    age: {type: Number, set: calculateAge},
    dateOfBirth: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next){
    var model = this;

    model.age = new Date() - new Date(model.dateOfBirth);

    next();
});
userSchema.fullName = function(){
    return this.name.first + ' ' + this.name.last;
};
userSchema.set('toJSON', {virtual: true});

mongoose.model('user', userSchema);

function calculateAge(val){
    var age = val / 1000 / 60/ 60/ 24 /365;

    return age;
};
