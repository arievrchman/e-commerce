const routes = require('express').Router();
const { addToCart, removeFromCart, findUserCart } = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');

routes.use(authenticate);
routes.get('/cart', findUserCart);
routes.patch('/cart/:productId/add', addToCart);
routes.patch('/cart/:productId/remove', removeFromCart);

module.exports = routes;