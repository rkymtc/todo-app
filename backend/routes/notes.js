const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.post('/', notesController.createNote);
router.get('/', notesController.getAllNotes);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);
router.patch('/:id/complete', notesController.markAsComplete);

module.exports = router;
