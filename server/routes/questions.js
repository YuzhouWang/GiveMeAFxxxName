import express from 'express'
import Question from '../models/questions.model'

const router = express.Router();

/* GET users listing. */
//Retrieving all questions
router.get('/', (req, res) => {
  Question.find()
  .then(questions => {
    res.send(questions)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error  occured while retrieving questions"
    })
  })
});

//Creat a new question
router.post('/', (req, res) => {
  if(!req.body.title){
    return res.status(400).send({
      message: "Question title can not be empty"
    })
  }

  console.log(req.body)
  const question = new Question({
    title: req.body.title,
    txt: req.body.txt
  })
  console.log(question)

  question.save()
  .then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error  occurred while creating a question."
    })
  })

})

//Retrieving a single question


export default router
