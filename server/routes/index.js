const routes = require('express').Router();
const { register, login, checkUser } = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');

/* GET home page. */
routes.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

routes.post('/register', register);
routes.post('/login', login);
routes.get('/auth', authenticate, checkUser);

module.exports = routes;
