import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    // uId: String,
    username: String,
    password: String
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);