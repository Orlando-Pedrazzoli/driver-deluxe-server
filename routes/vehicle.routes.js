const router = require('express').Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
const VehicleMaintenence = require('../models/VehicleMain.model');
mongoose.set('debug', true);

const serviceMap = {
  norauto: 'Norauto',
  mforce: 'Mforce',
  euromaster: 'Euromaster',
  boschcarservice: 'Bosch Car Service',
};

//! Route to create a new vehicle service:

router.post('/addvehicleservice', async (req, res, next) => {
  console.log(req.headers);
  const { type, imgURL, description, duration, company } = req.body;

  try {
    const newService = await VehicleMaintenence.create({
      type,
      imgURL,
      description,
      duration,
      company,
    });

    console.log('New vehicle service', newService);
    res.status(201).json(newService);
  } catch (error) {
    console.log('An error occured creating the new service', error);
    next(error);
  }
});

//! Route to get all services:
router.get('/allvehiclemaintenences', async (req, res, next) => {
  try {
    const allvehiclemaintenences = await VehicleMaintenence.find({});
    res.status(200).json(allvehiclemaintenences);
  } catch (error) {
    console.log('Error retrieving all services', error);
    next(error);
  }
});

//! Route to get one vehicle maintenence only by id:
router.get(
  '/allvehiclemaintenences/oneItem/:itemId',
  async (req, res, next) => {
    try {
      const service = await VehicleMaintenence.findById(req.params.itemId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      console.log('Error retrieving service by ID', error);
      next(error);
    }
  }
);

//! Route to get vehicle services by type:
router.get('/vehicleservices/:serviceType', async (req, res) => {
  const { serviceType } = req.params; // Get the service type from query parameter

  try {
    let services;
    if (serviceType) {
      services = await VehicleMaintenence.find({
        type: serviceMap[serviceType],
      }); // Filter services by type
      console.log(services);
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//!---------------------BOOKINGS-----------------------------------------//

//! Route to get all bookings from the user id:
router.get('/users/:userId/bookings', async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = await Booking.find({ user: userId }).populate('massage');
    console.log(bookings);
    res.json(bookings);
  } catch (error) {
    console.log('Error getting massages for user', error);
    next(error);
  }
});

//! Route to add a new vehicle maintenence booking:
router.post('/allvehicleservices/newbooking', async (req, res, next) => {
  const { user, vehiclemain, date, time } = req.body;

  try {
    const newBooking = new Booking({
      user: user,
      vehiclemain: vehiclemain,
      date: date,
      time: time,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.log('Error adding service by id', error);
    next(error);
  }
});

module.exports = router;
