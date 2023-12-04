const mongoose = require('mongoose');

const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: String, ref: 'user', require: true },
    document: { type: mongoose.Schema.Types.ObjectId, require: true},
    permitted_users:[{ type: String, ref: 'user'}],
    public:{ type: Boolean,default: false}
});

module.exports = model('permit', schema);