const express = require('express');
const router = express.Router();

const controller = require('../controllers/library');

router.get('/api/library/anime', controller.getAllAnime);

module.exports = router;