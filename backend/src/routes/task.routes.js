const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/task.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean().optional()
});

router.use(authenticate);
router.post('/', validate(taskSchema), taskCtrl.createTask);
router.get('/', taskCtrl.listTasks);
router.get('/:id', taskCtrl.getTask);
router.put('/:id', validate(taskSchema), taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;
