const Transaction = require('../models/transaction');
const User = require('../models/user');

module.exports = {
  async checkoutTransaction(req, res) {
    try {
      let findUserCart = await User
        .findById(req.auth_user.id)
        .populate('shopping_cart')
      
      let userCart = findUserCart.shopping_cart.map(elem => {
        let objCart = {
          id: elem.id,
          product_name: elem.product_name,
          product_image: elem.product_image,
          description: elem.description,
          price: elem.price,
          stock: elem.stock
        }
        return objCart;
      });

      let newTransaction = {
        user: req.auth_user.id,
        contactInformation: req.body.contactInformation,
        products: userCart,
        total: req.body.total
      }
      await User.findByIdAndUpdate(req.auth_user.id, { $set: { shopping_cart: [] } }, { new: true });
      let transaction = await Transaction.create(newTransaction);
      res.status(201).json({
        transaction,
        message: 'Thank you for purchasing our products, your order will be evaluated with our Teams.'
      })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async findTransaction(req, res) {
    try {
      let findAll = await Transaction.find({}).populate('user')
      let transaction = findAll.map(elem => {
        let objTrans = {
          id: elem._id,
          date: elem.date,
          products: elem.products,
          total: elem.total,
          shipped: elem.shipped,
          user: {
            id: elem.user._id,
            name: elem.user.name
          },
          contactInformation: elem.contactInformation
        };
        return objTrans
      });
      res.json(transaction);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
