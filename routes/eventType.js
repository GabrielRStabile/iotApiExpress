const express = require('express');
const router = express.Router();
const EventType = require('../models/EventType');
const isAuthorized = require('../middleware/isAuthorized');

const errorMessages = {
  notFound: 'Tipo de evento não encontrado',
  invalidId: 'ID inválido',
  validation: 'Erro de validação',
  internalServerError: 'Ocorreu um erro ao processar a solicitação',
};

router.get('/', [isAuthorized], async (req, res) => {
  return res.json(await EventType.find());
});

router.get('/:id', isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await EventType.findById(id);

    if (!eventType) {
      return res.status(404).json({ errors: errorMessages.notFound });
    } else {
      return res.json(eventType);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ errors: errorMessages.invalidId });
    }
  }
});

router.post('/', isAuthorized, async (req, res) => {
  try {
    const { name, description } = req.body;

    const eventType = new EventType({ name, description });
    await eventType.save();

    res.status(201).json(eventType);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: errorMessages.validation });
    }
    return res.status(500).json({ errors: errorMessages.internalServerError });
  }
});

router.put('/:id', isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const eventType = await EventType.findById(id);

    if (!eventType)
      return res.status(404).json({ errors: errorMessages.notFound });

    Object.assign(eventType, updates);

    await eventType.save();

    res.status(201).json(eventType);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ errors: errorMessages.invalidId });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: errorMessages.validation });
    } else {
      return res
        .status(500)
        .json({ errors: errorMessages.internalServerError });
    }
  }
});

router.delete('/:id', isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;

    const eventType = await EventType.findByIdAndDelete(id);

    if (!eventType)
      return res.status(404).json({ errors: errorMessages.notFound });

    res.status(200).json();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ errors: errorMessages.invalidId });
    } else {
      return res
        .status(500)
        .json({ errors: errorMessages.internalServerError });
    }
  }
});

module.exports = router;
