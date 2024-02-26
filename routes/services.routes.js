const Service = require('../models/Services.model');
const router = require('express').Router();
const mongoose = require('mongoose');

router.post('/service', async (req, res, next) => {
  console.log(req.headers);
  const {
    serviceName,
    adress,
    serviceType,
    serviceDuration,
    contact,
    website,
    description,
    imgURL,
    price,
  } = req.body;

  try {
    const newService = await Service.create({
      serviceName,
      adress,
      serviceType,
      serviceDuration,
      contact,
      website,
      description,
      imgURL,
      price,
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

router.get('/services/:id', async (req, res, next) => {
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
});

module.exports = router;
