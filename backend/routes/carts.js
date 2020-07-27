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
        result.save().then(result => res.status(201).json({ cart: result }));
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

router.post('/delete-cart', (req, res, next) => {
  Cart.findOne({ _id: req.body.cartId }).then(result => {
      //console.log(result);
      let productId = req.body.product._id;
      //console.log(productId);
      let existingProductIndex = result.items.findIndex(p => p.productId == productId);
      //console.log(existingProductIndex);
      console.log(result.items[existingProductIndex].quantity);

      if (/*existingProductIndex !== -1 &&*/ parseInt(result.items[existingProductIndex].quantity) > 1) {
        result.items[existingProductIndex].quantity -= 1;
        result.items[existingProductIndex].subTotal = result.items[existingProductIndex].quantity * req.body.product.price;
        result.totalQuantity = result.totalQuantity - 1;
        result.totalPrice = result.totalPrice - req.body.product.price;
        result.save().then(cart => { res.status(201).json(cart) });
      }


      else if (parseInt(result.items[existingProductIndex].quantity) === 1)  {
        let productPrice = result.items[existingProductIndex].subTotal;

        let newArr = [...result.items];

         newArr.splice(existingProductIndex, 1);

         result.items = newArr;



        let sum = 0;
        for (let item of result.items) {
          sum += item.subTotal;
        }
        console.log(sum);
        result.totalQuantity = result.totalQuantity - 1;
        result.totalPrice = sum;

        result.save().then(cart => {  res.status(201).json(cart) });

      }






      //result.save().then(cart => { res.status(201).json(cart) });



  })
})

router.post('/delete-cart-product', (req, res, next) => {
  Cart.findOne({ _id: req.body.cartId }).then(result => {
    if (!result) {
      return;
    } else {
      const productId = req.body.product._id;
      const existingProductIndex = result.items.findIndex(p => p.productId == productId);
      let subTotalPrice = result.items[existingProductIndex].subTotal;
      let itemQuantity = result.items[existingProductIndex].quantity;
      result.items.splice(existingProductIndex, 1);
      result.totalQuantity = result.totalQuantity - itemQuantity;
      result.totalPrice = result.totalPrice - subTotalPrice;
      result.save().then(cart => { res.status(201).json(cart) });
    }
  })
});

module.exports = router;
