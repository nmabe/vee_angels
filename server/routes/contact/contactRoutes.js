const express = require('express');
const { addMessage, getMessages, deleteMessage } = require('../../controllers/contact/messageController');
const { addReport, getReports, deleteReport } = require('../../controllers/contact/reportController');


const router = express.Router();

router.post('/', addMessage);
router.get('/', getMessages);
router.delete('/:id', deleteMessage);
router.post('/report', addReport);
router.get('/report', getReports);
router.delete('/report/:id', deleteReport);

module.exports = router;