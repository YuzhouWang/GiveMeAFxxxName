import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    // qId: String,
    title: String,
    txt: String
    // uId: String
},{
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);