// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stockQty: { type: Number, required: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);