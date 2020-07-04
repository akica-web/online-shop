const express = require('express');

const Cart = require('../models/cart');

const router = express.Router();

router.get('/cart/:id', (req, res, next) => {
  Cart.findOne({ _id: req.params.id })
  .populate('items.productId')
  .then(cart => {
    console.log(cart);
    res.status(200).json(cart);
  }).catch(err => console.log('Error!'));
})


router.post('/cart', (req, res, next) => {
  Cart.findOne({ _id: req.body.cartId }).then(result => {
    if (!result) {
      const cart = new Cart({
        items: [{
          productId: req.body.product._id,
          quantity: 1,
          subTotal: req.body.product.price
        }],
        totalPrice: req.body.product.price,
        totalQuantity: 1
      });
      cart.save().then(result => res.status(201).json({ cartId: result._id })).catch(err => console.log('object'));
    } else {
      //console.log(req.body.product._id);
      const productId = req.body.product._id;
      const existingProductIndex = result.items.findIndex(p => p.productId == productId);

      if (existingProductIndex !== -1) {
        result.items[existingProductIndex].quantity += 1;
        result.items[existingProductIndex].subTotal = result.items[existingProductIndex].quantity * req.body.product.price;
        result.totalQuantity = result.totalQuantity + 1;
        result.totalPrice = result.totalPrice + req.body.product.price;
        result.save();
      } else {
        result.items.push({
          productId: productId,
          quantity: 1,
          subTotal: req.body.product.price
        });
        result.totalQuantity = result.totalQuantity + 1;
        result.totalPrice = result.totalPrice + req.body.product.price;
        result.save().then(data => console.log('Added!'));
      }




    }
  });

});

module.exports = router;
