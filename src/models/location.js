const{model, Schema} = require('mongoose');

const schema = new Schema({
    Line1: {type:String},
    City: {type:String},
    CP: {type:String},
    State: {type:Date},
    Country: {type:String, require:true},
});


module.exports = model('location', schema);

