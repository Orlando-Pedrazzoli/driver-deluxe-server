const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  massage: {
    type: Schema.Types.ObjectId,
    ref: 'Massage',
  },
  vehiclemain: {
    type: Schema.Types.ObjectId,
    ref: 'VehicleMain',
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
