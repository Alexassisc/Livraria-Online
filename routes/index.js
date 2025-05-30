const express = require('express');
const router = express.Router();
const bookController = require('../src/controllers/bookController');

router.get('/', bookController.index);
router.get('/search', bookController.searchBooks);

router.post('/add', bookController.addBook);

router.get('/delete/:id', bookController.deleteBook);

router.get('/edit/:id', bookController.editBookForm);
router.post('/edit/:id', bookController.editBook);

module.exports = router;
