const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/taller_facebook');

const userSchema = new Schema({
	name: String,
	provider:String,
	uid: String,
	accessToken: String
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
