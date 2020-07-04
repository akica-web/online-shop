const express = require('express');

const Category = require('../models/category');

const router = express.Router();

router.get('/categories', (req, res, next) => {
  Category.find().then(data => res.status(200).json(data));
});

module.exports = router;
