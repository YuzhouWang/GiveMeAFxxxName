import express from 'express';
import app from '../app'

const router = express.Router();

export default (db) => {
    /* GET questions listing. */
  router.get('/', (req, res, next) => {
    //got to model questions, get
    //DB connect
    getQuestions(db)
      .then((questions) => {
        res.send(questions)
      })
      .catch((err) => {
        console.log(err)
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

  const getQuestions = (db) => {
    return new Promise((resolve, reject) => {
      db.collection('questions').find().toArray((err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        }
    
        resolve(result)
      })
    })
  }

  router.post('/', (req, res) => {
    db.collection('questions').save(req.body, (err, result) => {
      if (err) 
        return console.log(err)

      console.log('saved to table questions')
      res.redirect('/')
    })
  })

  return router
};
