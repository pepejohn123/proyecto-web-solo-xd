const mongoose = require('mongoose');
const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: {type:String,require:true},
    expedition_date: {type:Date,require:true},
    expiration_date: {type:Date,default: '01/01/2025'},
    ext: {type:String}
});

module.exports = model('document', schema);


