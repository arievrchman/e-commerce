const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  product_name: {
    type: String,
    required: [true, 'product name cannot be empty']
  },
  catalog: {
    type: String,
    required: [true, 'catalog cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'description cannot be empty']
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number
  },
  product_image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

productSchema.pre('save', function(next) {
  if (!this.product_image) {
    this.product_image = process.env.PRODUCT_NF;
  }
  next();
});

let Product = mongoose.model('product', productSchema);

module.exports = Product;