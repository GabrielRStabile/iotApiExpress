const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

module.exports = mongoose.model('Event', EventSchema, 'event');
