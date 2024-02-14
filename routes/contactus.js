const express = require('express');

const contactController = require('../controllers/contactus')

const router = express.Router();

router.use('/contactus',contactController.getContact);

router.post('/success',contactController.postContact)

module.exports=router;
