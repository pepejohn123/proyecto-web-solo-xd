const mongoose = require('mongoose');
const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    location:  { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
    document:  { type: mongoose.Schema.Types.ObjectId, ref: 'document', required: true },
    date: {type:date,default:Date.now}
});

module.exports = model('snapshot', schema);

