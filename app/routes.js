const express = require('express');
const router = express.Router();
const PatientController = require('./Controllers/PatientController');

// ...existing routes...

// Define the route for updating the appointment
router.put('/users/updateAppointment/:id', PatientController.updateAppointment);

// ...existing routes...

module.exports = router;
