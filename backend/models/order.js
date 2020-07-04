const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    orderReview: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
