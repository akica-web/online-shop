const express = require('express');

const Product = require('../models/product');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/products', (req, res, next) => {
  Product.find().then(data => res.status(200).json(data));
});

router.get('/product/:id', (req, res, next) => {
  Product.findById(req.params.id).then(result => {
      res.status(200).json(result);
  });
});

router.get('/products/:id', (req, res, next) => {
  Product.find({ categoryId: req.params.id }).then(result => res.status(200).json(result)).catch(err => console.log('Error occured!'));
});

router.post('/add-product', checkAuth, (req, res, next) => {
  const product = new Product({
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId
  });
  product.save();
});

router.delete('/products/:id', checkAuth, (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => res.status(200).json({ message: 'Product Deleted!' }));
});

router.put('/products/:id', checkAuth, (req, res, next) => {
  const product = new Product({
      _id: req.body._id,
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl
  });
  Product.updateOne({_id: req.params.id}, product).then(result => {
      res.status(201).json({ message: 'Update successfull!' });
  });
});

module.exports = router;
