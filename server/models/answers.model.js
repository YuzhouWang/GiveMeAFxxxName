import mongoose from 'mongoose'

const AnswerSchema = mongoose.Schema({
    // aId: String,
    txt: String,
    // qId: String,
    // uId: String
},{
    timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema);