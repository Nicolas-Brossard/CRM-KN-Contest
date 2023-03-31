const { Action } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const actions = await Action.findAll();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const action = await Action.findByPk(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ error: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newAction = await Action.create(req.body);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedAction = await Action.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedAction[0] === 1) {
      res.status(200).json({ message: 'Action updated successfully' });
    } else {
      res.status(404).json({ error: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedAction = await Action.destroy({ where: { id: req.params.id } });
    if (deletedAction === 1) {
      res.status(200).json({ message: 'Action deleted successfully' });
    } else {
      res.status(404).json({ error: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
