const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'user' });
    const accessToken = signAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role, email: user.email });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = signAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = signRefreshToken({ id: user._id, role: user.role, email: user.email });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = signAccessToken({ id: payload.id, role: payload.role, email: payload.email });
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token', detail: err.message });
  }
};

module.exports = { register, login, refresh };
