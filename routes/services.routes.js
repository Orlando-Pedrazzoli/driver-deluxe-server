const router = require('express').Router();
const Massage = require('../models/Massage.model');
const mongoose = require('mongoose');
const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
mongoose.set('debug', true);

//! Route to create a new service:
const serviceMap = {
  chairmassage: 'Chair massage',
  vibration: 'Vibration',
  reflexology: 'Reflexology',
  shiatsu: 'Shiatsu',
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

//! Route to get all services:
router.get('/services', async (req, res, next) => {
  try {
    const allServices = await Service.find({});
    res.status(200).json(allServices);
  } catch (error) {
    console.log('Error retrieving all services', error);
    next(error);
  }
});

//! Route to get services by type:
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

//! Route to get one massage only by id:
router.get('/services/oneItem/:itemId', async (req, res, next) => {
  try {
    const service = await Massage.findById(req.params.itemId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log('Error retrieving service by ID', error);
    next(error);
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

//! Route to add a new booking:
router.post('/services/newbooking', async (req, res, next) => {
  const { user, massage, date, time } = req.body;

  try {
    const newBooking = new Booking({
      user: user,
      massage: massage,
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

//! Route to delete a specific booking from a specific user:
router.delete(
  '/services/users/:userId/bookings/:bookingId',
  async (req, res, next) => {
    const userId = req.params.userId;
    const bookingId = req.params.bookingId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const booking = await Booking.findOne({ _id: bookingId, user: userId });
      if (!booking) {
        return res
          .status(404)
          .json({ message: 'Booking not found for this user' });
      }

      await Booking.findByIdAndDelete(bookingId);

      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.log('Error deleting booking', error);
      next(error);
    }
  }
);

module.exports = router;
