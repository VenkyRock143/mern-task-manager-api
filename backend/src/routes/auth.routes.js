const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user','admin').optional()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
const refreshSchema = Joi.object({ refreshToken: Joi.string().required() });

router.post('/register', validate(registerSchema), authCtrl.register);
router.post('/login', validate(loginSchema), authCtrl.login);
router.post('/refresh', validate(refreshSchema), authCtrl.refresh);

module.exports = router;
