const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      subTotal: { type: Number, required: true }
    },
  ],
  totalPrice: Number,
  totalQuantity: Number
});

module.exports = mongoose.model('Cart', cartSchema);
