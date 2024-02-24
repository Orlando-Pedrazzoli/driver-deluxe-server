const { Schema, model } = require('mongoose');

const servicesSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Service Name is required.'],
    },
    adress: {
      type: String,
      required: [true, 'Adress is required.'],
    },
    serviceType: {
      type: String,
      enum: ['Chair massage', 'Reflexology', 'Shiatsu', 'Vibration'],
      required: [true, 'Service type is required.'],
    },
    serviceDuration: {
      type: String,
      enum: ['30 min', '45 min', '1h'],
      required: [true, 'service duration is required'],
    },
    contact: {
      type: Number,
      required: [true, 'number is required'],
    },
    website: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Service = model('Service', servicesSchema);

module.exports = Service;
