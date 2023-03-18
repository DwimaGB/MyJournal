
const express = require('express');
const router = express.Router();
const journals = require('../controllers/journals');

router.get('/', journals.posts);

router.get('/new', journals.new);

router.get('/:id', journals.show);

router.get('/:id/edit', journals.edit);

router.post('/', journals.create);

router.patch('/:id', journals.update);

router.delete('/:id', journals.delete);

module.exports = router;