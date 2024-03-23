const { Schema, model } = require('mongoose');

const vehiclemainSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  description: {
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

const VehicleMaintenence = model('VehicleMain', vehiclemainSchema);

module.exports = VehicleMaintenence;
