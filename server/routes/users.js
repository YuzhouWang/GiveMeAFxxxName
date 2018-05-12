import express from 'express'
import User from '../models/users.model'

const router = express.Router();

//Retrieving all users
router.get('/', (req, res) => {
  User.find()
  .then(users => {
    res.send(users)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving users."
    })
  });
});

//Retrieving a single user
router.get('/:uId', (req, res) => {
  const uId = req.params.uId;

  User.findById(uId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + uId
      });
    }

    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "User not found with id " + uId
      });
    }else{
      return res.status(500).send({
        message: "Error retrieving user with id " + uId
      });
    }
  });
});

//Retrieving all questions of the user
router.get('/:uId/questions', (req, res) => {
  const uId = req.params.uId;

  User.find({uId: uId})
  .then(questions => {
    if(!questions) {
      return res.status(404).send({
        message: "Questions not found of User" + uId
      });
    }

    res.send(questions);
  }).catch(err => {
    res.send(err);
  });
});

//Retrieving all answers of the user
router.get('/:uId/answers', (req, res) => {
  const uId = req.params.uId;

  User.find({uId: uId})
  .then(answers => {
    if(!answers) {
      return res.status(404).send({
        message: "Answers not found of User" + uId
      });
    }

    res.send(answers);
  }).catch(err => {
    res.send(err);
  });
});

//Create a new user
router.post('/', (req, res) => {
  if(!req.body.username){
    return res.status(400).send({
      message: "Username can not be empty."
    });
  }

  //console.log(req.body)
  const User = new User({
    // uId: req.body.uId,
    username: req.body.username,
    password: req.body.password
  })
  //console.log(User)

  user.save()
  .then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a User."
    })
  });
})

//Updating a user
router.put('/:uId', (req, res) => {
  const uId = req.params.uId;

  if(!req.body.username) {
    return res.status(400).send({
        message: "Username can not be empty."
    });
  }
  
  User.findByIdAndUpdate(uId, {
    //uId: req.body.uId,
    username: req.body.username,
    password: req.body.password
  }, {new: true})
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "user not found with id " + uId
      });
    }

    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "User not found with id " + uId
      });
    }else{
      return res.status(500).send({
        message: "Error updating User with id " + uId
      });
    }
  });
});

//Deleting a user
router.delete('/:uId', (req, res) => {
  const uId = req.params.uId;

  User.findByIdAndRemove(uId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + uId
      });
    }
    res.send({message: "User deleted successfully."});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound'){
      return res.status(404).send({
        message: "User not found with id " + uId
      });
    }else{
      return res.status(500).send({
        message: "Error updating User with id " + uId
      });
    }
  });
});

//Deleting all questions of the user
router.delete('/:uId/questions', (req, res) => {
  const uId = req.params.uId;

  User.deleteMany({uId: uId})
  .then(questions => {
    if(!questions) {
      return res.status(404).send({
        message: "Questions not found of User" + uId
      });
    }

    res.send(questions);
  }).catch(err => {
    res.send(err);
  });
});

//Deleting all answers of the user
router.delete('/:uId/answers', (req, res) => {
  const uId = req.params.uId;

  User.deleteMany({uId: uId})
  .then(answers => {
    if(!answers) {
      return res.status(404).send({
        message: "Answers not found of User" + uId
      });
    }

    res.send(answers);
  }).catch(err => {
    res.send(err);
  });
});

export default router;
