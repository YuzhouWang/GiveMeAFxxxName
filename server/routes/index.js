import express from 'express';

const router = express.Router();

// /* GET home page. */
// router.get('/', (req, res, next) => {
//   res.sendFile(__dirname + '/index.html');
//   //res.send("Welcome");
// });


export default (db) => {
  // router.get('/', (req, res) => {
  //   db.collection('app').find().toArray((err, result) => {
  //     if (err) 
  //       return console.log(err)

  //     res.render('index.ejs', {users: result})
  //   })
  // })

  router.get('/', (req, res, next) => {
    getApp(db)
      .then((result) => {
        //res.render('index.ejs', {users: result})
        res.send(result)
      })
      .catch((err) => {
        res.send('fail')
      })
  });

  const getApp = (db) => {
    return new Promise((resolve, reject) => {
      db.collection('app').find().toArray((err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        }
    
        resolve(result)
      })
    })
  }

  // router.post('/', (req, res) => {
  //   db.collection('app').save(req.body, (err, result) => {
  //     if (err) 
  //       return console.log(err)

  //     console.log('saved to table app')
  //     res.redirect('/') //must redirect, otherwise keep waiting
  //   })
  // })

  router.post('/', (req, res, next) => {
    createApp(db)
      .then((result) => {
        res.send('success!')
      })
      .catch((err) => {
        res.send('fail')
      })
  });

  const createApp = (db) => {
    return new Promise((resolve, reject) => {
      db.collection('app').save(req.body, (err, result) => {
        if(err){
          console.log(err)
          reject(err)
        }
        
        console.log('save to database app')
        resolve(result)
      })
    })
  }

  return router
};
