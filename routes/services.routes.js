const Service = require('../models/Services.model');
const router = require('express').Router();
const mongoose = require('mongoose');

router.post('/service', async (req, res, next) => {
  console.log(req.headers);
  const { serviceName, adress, serviceType, price } = req.body;

  try {
    const newService = await Service.create({
      serviceName,
      adress,
      serviceType,
      price,
    });

    console.log('New service', newService);
    res.status(201).json(newService);
  } catch (error) {
    console.log('An error occured creating the new service', error);
    next(error);
  }
});

module.exports = router;
