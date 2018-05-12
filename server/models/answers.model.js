import mongoose from 'mongoose'

const AnswerSchema = mongoose.Schema({
    //id: String,
    txt: String
},{
    timestamp: true
})

module.exports = mongoose.model('Answer', AnswerSchema)