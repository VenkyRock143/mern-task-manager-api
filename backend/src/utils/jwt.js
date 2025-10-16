require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env;

const signAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES || '15m' });
};

const signRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES || '7d' });
};

const verifyAccessToken = (token) => jwt.verify(token, JWT_ACCESS_SECRET);
const verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
