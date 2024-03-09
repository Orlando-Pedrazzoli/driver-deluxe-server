const { Schema, model } = require('mongoose');

const massagesSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  company: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
});

const Massages = model('Massages', massagesSchema);

module.exports = Massages;
