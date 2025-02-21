const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  product: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;