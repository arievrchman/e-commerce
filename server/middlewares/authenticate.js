const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    res.status(401).json({ message: 'You must login first.' });
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(400).json({ message: 'Invalid token' });
      } else {
        req.auth_user = decoded;
        next();
      }
    });
  }
}