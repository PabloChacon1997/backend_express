const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;