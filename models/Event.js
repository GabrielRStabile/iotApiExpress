const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  eventType: {
    type: mongoose.Schema.ObjectId,
    ref: 'EventType',
    required: true,
  },
  timeStamp: { type: Date, default: Date.now },
  details: { type: String },
});

EventSchema.set('toJSON', {
  transform(__, ret, _) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Event', EventSchema, 'event');
