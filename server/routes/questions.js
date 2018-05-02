import express from 'express';
import a from '../app'
import fs from 'fs';

const router = express.Router();
let db = a.db;

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
  return new Promise((resolve, reject) => {
    fs.readFile("./data/questions.json", (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      }
  
      const json = JSON.parse(data)
      //find one question
      resolve(json)
    })
  })
}

router.post('/', (req, res, next) => {
  db.collection('quora').save(req.body, (err, result) => {
    if(err)
      console.log(err)
      reject(err)
    
      console.log('save to database')
      res.redirect('/')
  })
  // createQuestion()
  // .then(() => {
  //   res.send('success!')
  // })
  // .catch((err) => {
  //   res.send('fail')
  // })
});

// const createQuestion = () => {
//   return new Promise((resolve, reject) => {
//     db.collection('quora').save(req.body, (err, result) => {
//       if(err)
//         console.log(err)
//         reject(err)
      
//         console.log('save to database')
//         res.redirect('/')
//     })
//   })
// }

export default router;
