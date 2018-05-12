import express from 'express';

const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
// });

export default (db) => {
  router.get('/', (req, res, next) => {
    getUsers(db)
      .then((users) =>{
        res.send(users)
      })
      .catch((err) =>{
        res.send("No data")
      })
  });

  const getUsers = (db) => {
    return new Promise((resolve, reject) => {
      db.collection('users').find().toArray((err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        }
    
        resolve(result)
      })
    })
  }

  router.get('/:id', (req, res, next) => {
    const userId = req.params.id

    db.collection('users').find({id: userId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.get('/:id/questions', (req, res, next) => {
    const userId = req.params.id

    db.collection('questions').find({userId: userId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.get('/:userId/answers', (req, res, next) => {
    const userId = req.params.userId

    db.collection('answers').find({userId: userId})
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(result)
    })
  });

  router.post('/', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
      if (err) 
        return console.log(err)

      console.log('saved to table users')
      res.redirect('/')
    })
  })

  router.put('/:id', (req, res) => {
    const userId = req.params.id

    db.collection('users').findOneAndUpdate(
      {
        id: userId
      },
      {
        $set: {
          username: req.body.username,
          password: req.body.username
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
    const userId = req.params.id

    db.collection('users').findOneAndDelete(
      {
        id: userId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'A user got deleted'})
      }
    )
  })

  router.delete('/:id/questions', (req, res) => {
    const userId = req.params.id

    db.collection('questions').deleteMany(
      {
        userId: userId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'All questions of the user got deleted'})
      }
    )
  })

  router.delete('/:id/answers', (req, res) => {
    const userId = req.params.id

    db.collection('answers').deleteMany(
      {
        userId: userId
      },
      (err, result) => {
        if(err)
          res.send(500, err)

        console.log('delete success')
        res.send({message: 'All answers of the user got deleted'})
      }
    )
  })

  return router
}
  
