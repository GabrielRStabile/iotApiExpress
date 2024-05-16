const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', async (req, res) => {
  const event = new Event(req.body);

  const hasErrors = event.validateSync();

  if (hasErrors) {
    res.status(400).json({
      errors: [hasErrors.message]
    });
  } else {
    event.save();
    res.json(event);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ errors: ['Evento não encontrado.'] });
    } else {
      res.json(event);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ errors: ['ID inválido.'] });
    }
  }
});

router.put('/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

  const hasErrors = event.validateSync();

  if (hasErrors) {
    res.status(400).json(
      { errors: [hasErrors.message] }
    );
  } else {
    event.save();
    res.json(event);
  }
});

router.delete('/:id', async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    res.status(404).json({ errors: ['Evento não encontrado'] });
  } else {
    res.json(event);
  }
});

module.exports = router;
