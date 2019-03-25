const User = require('../models/user');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').compare;

module.exports = {

  register(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User
      .create(newUser)
      .then(user => {
        res.status(201).json({
          user,
          message: 'You have successfully registered'
        });
      })
      .catch(err => {
        let error = err.errors;
        let objError = {};
        if (error.hasOwnProperty('name') && error.hasOwnProperty('email') && error.hasOwnProperty('password')) {
          res.status(400).json({ message: 'Name, Email and Password cannot be empty.' });
        } else if (error.hasOwnProperty('name') || error.hasOwnProperty('email') || error.hasOwnProperty('password')) {
          for (const key in error) {
            if (error[key]) {
              objError[key] = error[key].message
            }
            res.status(400).json(objError);
          };
        } else {
          res.status(500).json(err);
        }
      })
  },

  login(req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let isValid = compare(req.body.password, user.password);
          if (isValid) {
            let payload = {
              id: user._id,
              email: user.email,
              role: user.role
            }
            let token = jwt.sign(payload, process.env.SECRET);
            res.status(200).json({
              token,
              message: 'You have successfully logged in'
            });
          } else {
            res.status(404).json({ message: 'Please proivde a valid email and password' });
          }
        } else {
          res.status(404).json({ message: 'Please provide a valid email and password' });
        }
      })
      .catch(err => {

      })
  },

  checkUser(req, res) {
    User
      .findOne({ email: req.auth_user.email })
      .select('-password')
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

};
