const{model, Schema} = require('mongoose');

const schema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    first_name: {type:String,require:true},
    fathers_last_name: {type:String,require:true},
    mothers_last_name: {type:String,require:true},
    birthdate: {type:Date,require:true},
    nationality: {type:String, require:true},
    civil_state: {type:String, require:true},
    birth_entity: {type:String, require:true},
    birth_municipality: {type:String, require:true},
    entity_of_birth: {type:String, require:true},
    genre: {type:String, require:true}
});

module.exports = model('profile', schema);


