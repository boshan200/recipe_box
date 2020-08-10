const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
    name: {type:String, unique: true, required: true},
    email: {type:String, unique: true, required: true},
    password: String,
    avatar: String,
    description: String,
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);