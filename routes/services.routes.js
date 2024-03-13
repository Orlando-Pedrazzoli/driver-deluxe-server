const router = require('express').Router();
const Massage = require('../models/Massages.model');
const mongoose = require('mongoose');
const Booking = require('../models/Booking.model');

const serviceMap = {
  chairmassage: 'Chair massage',
  vibration: 'Vibration',
  reflexology: 'Reflexology',
  shiatsu: 'Shiatso',
};

router.post('/service', async (req, res, next) => {
  console.log(req.headers);
  const { type, imgURL, price, description, duration, company } = req.body;

  try {
    const newService = await Service.create({
      type,
      imgURL,
      price,
      description,
      duration,
      company,
    });

    console.log('New service', newService);
    res.status(201).json(newService);
  } catch (error) {
    console.log('An error occured creating the new service', error);
    next(error);
  }
});

router.get('/services', async (req, res, next) => {
  try {
    const allServices = await Service.find({});
    res.status(200).json(allServices);
  } catch (error) {
    console.log('Error retrieving all services', error);
    next(error);
  }
});

// Modify your route to accept a query parameter for the service type
router.get('/services/:serviceType', async (req, res) => {
  const { serviceType } = req.params; // Get the service type from query parameter

  try {
    let services;
    if (serviceType) {
      services = await Massage.find({ type: serviceMap[serviceType] }); // Filter services by type
      console.log(services);
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/addservicebyid', async (req, res, next) => {
  const { serviceid } = req.body;

  try {
    const service = await Massage.findById(serviceid);
    if (!service) {
      return res.status(400).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log('Error retrieving service by id', error);
    next(error);
  }
});

router.get('/getservicebyid', async (req, res, next) => {
  const { serviceid } = req.body;

  try {
    const service = await Massage.findById(serviceid);
    if (!service) {
      return res.status(400).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log('Error retrieving service by id', error);
    next(error);
  }
});

router.post('/services/addmassage', async (req, res, next) => {
  const { massageId, userId, price, date, time, address, name, type } =
    req.body;

  try {
    // Create a new booking instance
    const newBooking = new Booking({
      massageId: massageId,
      userId: userId,
      price: price,
      date: date,
      time: time,
      address: address,
      name: name,
      type: type,
    });

    // Save the new booking
    const savedBooking = await newBooking.save();

    // Respond with the saved booking
    res.status(201).json(savedBooking);
  } catch (error) {
    console.log('Error adding service by id', error);
    next(error);
  }
});

/* router.get('/services/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // check if id is valid value in our DB:
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }
    const service = await Service.findById(id);
    // check if there is a service or not, might be null or deleted:
    if (!service) {
      return res.status(404).json({ message: 'No service found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log('There was an error getting the service', error);
    next(error);
  }
}); */
module.exports = router;
