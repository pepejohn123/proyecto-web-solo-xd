const{model, Schema} = require('mongoose');

const schema = new Schema({
    email: {type:String, require:true},
    password: {type:String, require:true},
    type: {type:String, default: "user",require:true},
});

module.exports = model('user', schema);