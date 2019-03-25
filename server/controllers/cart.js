const User = require('../models/user');
const Product = require('../models/product');

module.exports = {

  async addToCart(req, res) {
    try {
      let findProduct = await Product.findById(req.params.productId);
      if (findProduct.stock > 0) {
        let cartUser = await User
          .findById(req.auth_user.id)
          .populate('shopping_cart')
        let validateCart = cartUser.shopping_cart.some(e => {
          return e._id == req.params.productId
        });
        if (validateCart) {
          res.status(200).json(cartUser.shopping_cart);
        } else {
          findProduct.stock -= 1;
          await findProduct.save();
          let updateCartUser = await User
            .findOneAndUpdate(
              { _id: req.auth_user.id },
              { $push: { shopping_cart: req.params.productId } },
              { new: true })
            .select('-password')
            .populate('shopping_cart');
          res.status(200).json(updateCartUser.shopping_cart);
        }
      } else {
        res.status(400).json({ message: 'Out of stock' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async removeFromCart(req, res) {
    try {
      let findProduct = await Product.findById(req.params.productId);
      findProduct.stock += 1;
      await findProduct.save();
      let updateCartUser = await User
        .findOneAndUpdate(
          { _id: req.auth_user.id },
          { $pull: { shopping_cart: req.params.productId } },
          { new: true })
        .populate('shopping_cart');
      res.status(200).json(updateCartUser.shopping_cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findUserCart(req, res) {
    try {
      let carts = await User
        .findById(req.auth_user.id)
        .populate('shopping_cart')
        .select('shopping_cart');
      res.json(carts);

    } catch (error) {
      res.status(500).json(error);
    }
  }
};
