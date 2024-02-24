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
