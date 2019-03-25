const routes = require('express').Router();
const { checkoutTransaction, findTransaction } = require('../controllers/transaction');
const authenticate = require('../middlewares/authenticate');

routes.use(authenticate);
routes.post('/', checkoutTransaction);
routes.get('/', findTransaction);

module.exports = routes;