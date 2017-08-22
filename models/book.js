const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        trim:true
    },
    age: {
        type: Number,
        default:0
    }
});
module.exports = mongoose.model('User', userSchema);