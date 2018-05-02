import express from 'express';
import a from '../app'

const router = express.Router();
let db = a.db;

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.sendFile(__dirname + '/index.html');
  //res.send("Welcome");
});

export default router;
