const { getUsers, changePassword, changeProfilePic } = require('../../controllers/user/userController');
const express = require('express');
const { upload } = require('../../helpers/cloudinary');

const router = express.Router();


router.get('/get', getUsers);
// Route to edit username
router.put('/edit/:id',  changePassword);
// Route to change profile picture
router.post('/uploadProfilePic/:id', upload.single('user_avatar'), changeProfilePic);

module.exports = router;
