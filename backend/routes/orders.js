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
    orderReview: req.body.orderReview,
    userId: req.body.userId
  });
  order.save().then(result => {
    res.json({ message: result.firstName + ', your order was successfull!' });
  }).catch(err => { console.log('Error') });
});

router.get('/orders/:userId', (req, res, next) => {
  Order.find({ userId: req.params.userId })
  .then(result => {
    res.status(200).json({
      result: result
    })
  })
  .catch(err => {
    console.log('Error: ' + err);
  })
});

router.get('/all-orders', (req, res, next) => {
  Order.find()
  .then(result => {
    res.status(200).json({
      result: result
    })
  })
  .catch(err => {
    console.log('Error: ' + err);
  })
})

module.exports = router;
