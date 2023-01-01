const express = require('express');
const { fetchFilteredAngels, likeAngel, unlikeAngel, getLikes, getComments, addComment, getAllLikes, setView } = require('../../controllers/angels/angelsController');

const router = express.Router();

router.get('/get', fetchFilteredAngels);
router.post('/like/:id', likeAngel);
router.post('/unlike/:id', unlikeAngel);
router.get('/likes/:id', getLikes);
router.get('/comments/:id', getComments);
router.post('/comments/:id', addComment);
router.get('/allLikes', getAllLikes);
router.post('/setView/:id', setView);

module.exports = router;