const routes = require('express').Router();
const { checkoutTransaction, findTransaction, updateTransaction } = require('../controllers/transaction');
const authenticate = require('../middlewares/authenticate');

routes.use(authenticate);
routes.post('/', checkoutTransaction);
routes.get('/', findTransaction);
routes.patch('/:id', updateTransaction);

module.exports = routes;