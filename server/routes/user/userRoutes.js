const { getUsers, changePassword, changeProfilePic } = require('../../controllers/user/userController');
const express = require('express');
const router = express.Router();
const { upload } = require('../../helpers/cloudinary');


router.get('/get', getUsers);
// Route to edit username
router.put('/edit/:id',  changePassword);
// Route to change profile picture
router.post('/uploadProfilePic/:id', upload.single('user_avatar'), changeProfilePic);

module.exports = router;
