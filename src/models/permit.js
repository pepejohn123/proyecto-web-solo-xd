const mongoose = require('mongoose');

const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    document:{type: mongoose.Schema.Types.ObjectId, ref: 'document', required: true},
    permitted_users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = model('permit', schema);