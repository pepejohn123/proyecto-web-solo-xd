const mongoose = require('mongoose');
const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: {type:String,require:true}
});

module.exports = model('notification', schema);

