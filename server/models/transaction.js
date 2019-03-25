const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
  date: {
    type: Date,
    default: new Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  contactInformation: {
    type: Object 
  },
  products: {
    type: Array
  },
  total: {
    type: Number,
    default: 0
  },
  shipped: {
    type: Boolean,
    default: false
  }
});

let Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;