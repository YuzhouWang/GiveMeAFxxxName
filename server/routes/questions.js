import express from 'express'
const router = express.Router();

/* GET questions listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
