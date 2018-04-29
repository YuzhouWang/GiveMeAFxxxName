import express from 'express';
import fs from 'fs';

const router = express.Router();


/* GET questions listing. */
router.get('/', (req, res, next) => {
  //got to model questions, get
  //DB connect
  getQuestions()
  .then((ques) =>{
    res.send(ques)
  })
  .catch((err) =>{
    res.send("No data")
  })
});

router.get('/:id', (req, res, next) => {
  //got to model questions, get
  const questionId = req.params.id
  getQuestions()
    .then((questions) => {
      const foundQuestion = questions.find(question => {
        return question.id == questionId
      })

      if (foundQuestion) {
        res.send(foundQuestion)
      } else {
        throw new Error("Can't find question by Id")
      }
    })
    .catch(err => {
      res.send("Can't find question by Id")
    })
});

const getQuestions = () => {
  return new Promise((res, rej) => {
    fs.readFile("./data/questions.json", (err, data) => {
      if (err) {
        console.log(err)
        return rej(err)
      }
  
      const json = JSON.parse(data)
      //find one question
      res(json)
    })
  })
}

module.exports = router;
