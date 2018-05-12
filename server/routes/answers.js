import express from 'express'
import Answer from '../models/answers.model'

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router
