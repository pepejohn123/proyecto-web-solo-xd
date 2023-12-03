const mongoose = require('mongoose');
const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: {type:String,require:true},
    expedition_date: {type:Date,require:true},
    expiration_date: {type:Date,require:true},
    ext: {type:String}
});

module.exports = model('document', schema);


