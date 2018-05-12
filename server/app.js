import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import questionsRouter from './routes/questions'
import answersRouter from './routes/answers'
import dbConfig from './config/database.config'
import {MongoClient} from 'mongodb'

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db
MongoClient.connect(dbConfig.url, (err, client) => {
  if (err) 
    return console.log(err)
  db = client.db('quora') 
  app.use("/api/questions", questionsRouter(db));
})

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/answers", answersRouter)


/** index *****/
// app.get('/', (req, res) => {
//   db.collection('app').find().toArray((err, result) => {
//     if (err) 
//       return console.log(err)

//     res.render('index.ejs', {users: result})
//   })
// })

app.get('/', (req, res, next) => {
  getApp()
    .then((result) => {
      //res.render('index.ejs', {users: result})
      res.send(result)
    })
    .catch((err) => {
      res.send('fail')
    })
});

const getApp = () => {
  return new Promise((resolve, reject) => {
    db.collection('app').find().toArray((err, result) => {
      if (err) {
        return console.log(err)
        reject(err)
      }
  
      resolve(result)
    })
  })
}

// app.post('/', (req, res) => {
//   db.collection('app').save(req.body, (err, result) => {
//     if (err) 
//       return console.log(err)

//     console.log('saved to table app')
//     res.redirect('/')
//   })
// })

//fail...
app.post('/', (req, res, next) => {
  createApp()
    .then((result) => {
      res.send('success!')
    })
    .catch((err) => {
      res.send('fail')
    })
});

const createApp = () => {
  return new Promise((resolve, reject) => {
    db.collection('app').save(req.body, (err, result) => {
      if(err){
        console.log(err)
        reject(err)
      }
      
      console.log('save to database')
      resolve(result)
    })
  })
}

/** questions *****/
app.get('/api/questions', (req, res, next) => {
  getQuestions()
    .then((questions) =>{
      res.send(questions)
    })
    .catch((err) =>{
      res.send("No data")
    })
});

const getQuestions = () => {
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

app.get('/api/questions/:id', (req, res, next) => {
  const questionId = req.params.id

  db.collection('questions').find({id: questionId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.get('/api/questions/:id/answers', (req, res, next) => {
  const questionId = req.params.id

  db.collection('answers').find({questionId: questionId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.post('/api/questions', (req, res) => {
  db.collection('questions').save(req.body, (err, result) => {
    if (err) 
      return console.log(err)

    console.log('saved to table questions')
    res.redirect('/')
  })
})

app.put('/api/questions/:id', (req, res) => {
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

app.delete('/api/questions/:id', (req, res) => {
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

app.delete('/api/questions/:id/answers', (req, res) => {
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

/** users *****/
app.get('/api/users', (req, res, next) => {
  getUsers()
    .then((users) =>{
      res.send(users)
    })
    .catch((err) =>{
      res.send("No data")
    })
});

const getUsers = () => {
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

app.get('/api/users/:id', (req, res, next) => {
  const userId = req.params.id

  db.collection('users').find({id: userId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.get('/api/users/:id/questions', (req, res, next) => {
  const userId = req.params.id

  db.collection('questions').find({userId: userId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.get('/api/users/:userId/answers', (req, res, next) => {
  const userId = req.params.userId

  db.collection('answers').find({userId: userId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.post('/api/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) 
      return console.log(err)

    console.log('saved to table users')
    res.redirect('/')
  })
})

app.put('/api/users/:id', (req, res) => {
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

app.delete('/api/users/:id', (req, res) => {
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

app.delete('/api/users/:id/questions', (req, res) => {
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

app.delete('/api/users/:id/answers', (req, res) => {
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

/** answers *****/
app.get('/api/answers', (req, res, next) => {
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

app.get('/api/answers/:id', (req, res, next) => {
  const answerId = req.params.id

  db.collection('answers').find({id: answerId})
  .toArray((err, result) => {
    if (err) {
      console.log(err)
    }

    res.send(result)
  })
});

app.post('/api/answers', (req, res) => {
  db.collection('answers').save(req.body, (err, result) => {
    if (err) 
      return console.log(err)

    console.log('saved to table answers')
    res.redirect('/')
  })
})

app.put('/api/answers/:id', (req, res) => {
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

app.delete('/api/answers/:id', (req, res) => {
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

module.exports = app
