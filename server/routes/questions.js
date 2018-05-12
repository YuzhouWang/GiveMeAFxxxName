import express from 'express';

const router = express.Router();

export default (db) => {
  router.get('/', (req, res, next) => {
    getQuestions(db)
      .then((questions) =>{
        res.send(questions)
      })
      .catch((err) =>{
        res.send("No data")
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

  router.get('/:id', (req, res, next) => {
    const questionId = req.params.id

    db.collection('questions').find({id: questionId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.get('/:id/answers', (req, res, next) => {
    const questionId = req.params.id

    db.collection('answers').find({questionId: questionId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.post('/', (req, res) => {
    db.collection('questions').save(req.body, (err, result) => {
      if (err) 
        return console.log(err)

      console.log('saved to table questions')
      res.redirect('/')
    })
  })

  router.put('/:id', (req, res) => {
    const questionId = req.params.id

    db.collection('questions').findOneAndUpdate(
      {
        id: questionId
      },
      {
        $set: {
          title: req.body.title,
          text: req.body.text
        }
      },
      (err, result) => {
        if(err)
          res.send(err)

        console.log('put success')
        res.send(result)
      }
    )
  })

  router.delete('/:id', (req, res) => {
    const questionId = req.params.id

    db.collection('questions').findOneAndDelete(
      {
        id: questionId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'A question got deleted'})
      }
    )
  })

  router.delete('/:id/answers', (req, res) => {
    const questionId = req.params.id

    db.collection('answers').deleteMany(
      {
        questionId: questionId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'All answers of the question got deleted'})
      }
    )
  })

  return router
};
