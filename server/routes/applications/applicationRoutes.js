const express = require('express');
const { addApplication, getApplications, approveApplication, rejectApplication } = require('../../controllers/applications/applicationsController');

const router = express.Router();

router.post('/apply', addApplication);
router.get('/get', getApplications);
router.put('/approve/:id', approveApplication);
router.delete('/reject/:id', rejectApplication);

module.exports = router;