import express from 'express';

const router = express.Router();

/* GET answers listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });

export default (db) => {
  router.get('/', (req, res, next) => {
    getAnswers()
      .then((answers) =>{
        res.send(answers)
      })
      .catch((err) =>{
        res.send("No data")
      })
  });

  const getAnswers = () => {
    return new Promise((resolve, reject) => {
      db.collection('answers').find().toArray((err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        }
    
        resolve(result)
      })
    })
  }

  router.get('/:id', (req, res, next) => {
    const answerId = req.params.id

    db.collection('answers').find({id: answerId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.post('/', (req, res) => {
    db.collection('answers').save(req.body, (err, result) => {
      if (err) 
        return console.log(err)

      console.log('saved to table answers')
      res.redirect('/')
    })
  })

  router.put('/:id', (req, res) => {
    const answersId = req.params.id

    db.collection('answers').findOneAndUpdate(
      {
        id: answersId
      },
      {
        $set: {
          text: req.body.text,
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
    const answersId = req.params.id

    db.collection('answers').findOneAndDelete(
      {
        id: answersId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'An answer got deleted'})
      }
    )
  })

  return router
}