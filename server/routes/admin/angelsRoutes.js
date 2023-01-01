const express = require('express');
const { handleFileUpload, addAngel, removeAngel, editAngel, getAngels, deleteAngelImage, activateAnAngel, deactivateAnAngel } = require('../../controllers/admin/angelsController');
const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

// Ensure all controller functions and 'upload' middleware are defined and exported correctly
router.post('/uploadImage', upload.array('avatars', 10), handleFileUpload);
router.post('/add', addAngel);
router.put('/edit/:id', editAngel);
router.get('/get', getAngels);
router.delete('/remove/:id', removeAngel);
router.put('/deleteImage/:id', deleteAngelImage);
router.put('/activate/:id', activateAnAngel);
router.put('/deactivate/:id', deactivateAnAngel);

module.exports = router;