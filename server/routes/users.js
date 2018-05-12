import express from 'express';
import a from '../app'

const router = express.Router();
const db = a.db

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default router;
