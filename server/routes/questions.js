import express from 'express'
import Question from '../models/questions.model'

const router = express.Router();

//Retrieving all questions
router.get('/', (req, res) => {
  Question.find()
  .then(questions => {
    res.send(questions)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving questions."
    })
  });
});

//Retrieving a single question
router.get('/:qId', (req, res) => {
  const qId = req.params.qId;

  Question.findById(qId)
  .then(question => {
    if(!question) {
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }

    res.send(question);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }else{
      return res.status(500).send({
        message: "Error retrieving question with id " + qId
      });
    }
  });
});

//Retrieving all answers of the question
router.get('/:qId/answers', (req, res) => {
  const qId = req.params.qId;

  Question.find({qId: qId})
  .then(answers => {
    if(!answers) {
      return res.status(404).send({
        message: "Answers not found of question" + qId
      });
    }

    res.send(answers);
  }).catch(err => {
    res.send(err);
  });
});

//Create a new question
router.post('/', (req, res) => {
  if(!req.body.title){
    return res.status(400).send({
      message: "Question title can not be empty."
    });
  }

  //console.log(req.body)
  const question = new Question({
    // qId: req.body.qId,
    title: req.body.title,
    txt: req.body.txt
    // uId: req.body.uId
  })
  //console.log(question)

  question.save()
  .then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a question."
    })
  });
})

//Updating a question
router.put('/:qId', (req, res) => {
  const qId = req.params.qId;

  if(!req.body.title) {
    return res.status(400).send({
        message: "Question title can not be empty."
    });
  }
  
  Question.findByIdAndUpdate(qId, {
    //qId: req.body.qId,
    title: req.body.title,
    txt: req.body.txt,
    //uId: req.body.uId
  }, {new: true})
  .then(question => {
    if(!question) {
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }

    res.send(question);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }else{
      return res.status(500).send({
        message: "Error updating question with id " + qId
      });
    }
  });
});

//Deleting a question
router.delete('/:qId', (req, res) => {
  const qId = req.params.qId;

  Question.findByIdAndRemove(qId)
  .then(question => {
    if(!question) {
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }
    res.send({message: "Question deleted successfully."});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound'){
      return res.status(404).send({
        message: "Question not found with id " + qId
      });
    }else{
      return res.status(500).send({
        message: "Error deleting question with id " + qId
      });
    }
  });
});

//Deleting all answers of the question
router.delete('/:qId/answers', (req, res) => {
  const qId = req.params.qId;

  Question.deleteMany({qId: qId})
  .then(answers => {
    if(!answers) {
      return res.status(404).send({
        message: "Answers not found of question" + qId
      });
    }

    res.send(answers);
  }).catch(err => {
    res.send(err);
  });
});

export default router;
