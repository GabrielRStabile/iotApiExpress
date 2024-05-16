const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  eventType: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
  details: { type: String },
});

module.exports = mongoose.model('Event', EventSchema, 'event');
