import express from 'express'
import Answer from '../models/answers.model'

const router = express.Router();

//Retrieving all answers
router.get('/', (req, res) => {
  Answer.find()
  .then(answers => {
    res.send(answers)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving answers."
    })
  });
});

//Retrieving a single answer
router.get('/:aId', (req, res) => {
  const aId = req.params.aId;

  Answer.findById(aId)
  .then(answer => {
    if(!answer) {
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }

    res.send(answer);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }else{
      return res.status(500).send({
        message: "Error retrieving answer with id " + aId
      });
    }
  });
});

//Create a new answer
router.post('/', (req, res) => {
  if(!req.body.txt){
    return res.status(400).send({
      message: "Answer text can not be empty."
    });
  }

  //console.log(req.body)
  const answer = new Answer({
    // aId: req.body.aId,
    txt: req.body.txt
    // uId: req.body.uId
  })
  //console.log(answer)

  answer.save()
  .then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a answer."
    })
  });
})

//Updating an answer
router.put('/:aId', (req, res) => {
  const aId = req.params.aId;

  if(!req.body.txt) {
    return res.status(400).send({
        message: "Answer text can not be empty."
    });
  }
  
  Answer.findByIdAndUpdate(aId, {
    //aId: req.body.aId,
    txt: req.body.txt,
    //uId: req.body.uId
  }, {new: true})
  .then(answer => {
    if(!answer) {
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }

    res.send(answer);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }else{
      return res.status(500).send({
        message: "Error updating answer with id " + aId
      });
    }
  });
});

//Deleting an answer
router.delete('/:aId', (req, res) => {
  const aId = req.params.aId;

  Answer.findByIdAndRemove(aId)
  .then(answer => {
    if(!answer) {
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }
    res.send({message: "Answer deleted successfully."});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound'){
      return res.status(404).send({
        message: "Answer not found with id " + aId
      });
    }else{
      return res.status(500).send({
        message: "Error deleting answer with id " + aId
      });
    }
  });
});

export default router;
