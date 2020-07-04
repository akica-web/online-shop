const express = require('express');

const Order = require('../models/order');

const router = express.Router();

router.post('/check-out', (req, res, next) => {
  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    email: req.body.email,
    orderReview: req.body.orderReview
  });
  order.save().then(result => {
    res.json({ message: result.firstName + ', your order was successfull!' });
  }).catch(err => { console.log('Error') });
});

module.exports = router;
