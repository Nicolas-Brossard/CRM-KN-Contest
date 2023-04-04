const { Contact } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const query = {
      user_id: req.query.userId,
    };

    if (req.query.type) {
      query.type = req.query.type;
    }

    const contacts = await Contact.findAll({
      where: query,
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedContact = await Contact.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedContact[0] === 1) {
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedContact = await Contact.destroy({
      where: { id: req.params.id },
    });
    if (deletedContact === 1) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLastPosition = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: {
        user_id: req.query.userId,
        type: req.query.type,
      },
    });

    if (contacts.length > 0) {
      res
        .status(200)
        .json({ position: contacts[contacts.length - 1].position });
    } else {
      res.status(200).json({ position: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
