const mongoose = require('mongoose');

const EventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

EventTypeSchema.set('toJSON', {
  transform(__, ret, _) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('EventType', EventTypeSchema, 'eventType');
