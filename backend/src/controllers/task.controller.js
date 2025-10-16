const Task = require('../models/task.model');

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, owner: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

const listTasks = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { owner: req.user.id };
    const tasks = await Task.find(query).populate('owner', 'name email');
    res.json(tasks);
  } catch (err) { next(err); }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await task.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
