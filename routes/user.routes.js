const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Add Service to the cart of a specific user
router.post('/user/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;
    const { serviceId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Push the service ID into the user's cart
    user.cart.push(serviceId);

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'Service added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove service from specific user
router.delete('/user/:userId/cart/:serviceId', async (req, res) => {
  try {
    const { userId, serviceId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the service exists in the user's cart
    const index = user.cart.indexOf(serviceId);
    if (index === -1) {
      return res.status(404).json({ message: 'Service not found in the cart' });
    }

    // Remove the service ID from the user's cart
    user.cart.splice(index, 1);

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'Service removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
