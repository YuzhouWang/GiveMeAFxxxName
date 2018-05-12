import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    //id: String,
    title: String,
    txt: String
},{
    timestamp: true
})

module.exports = mongoose.model('Question', QuestionSchema)