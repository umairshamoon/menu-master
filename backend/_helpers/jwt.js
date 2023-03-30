const expressJwt = require('express-jwt');
const { SECRET } = require('../config');
const userService = require('../users/UserService');

module.exports = jwt;

function jwt() {
  return expressJwt({
    SECRET,
    algorithms: ['HS256'],
    isRevoked,
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/register',
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
