const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getBooksByAuthor,
  createBook,
  updateBook,
  patchBook,
  deleteBook
} = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.get('/author/:authorId', getBooksByAuthor);
router.post('/', createBook);
router.put('/:id', updateBook);
router.patch('/:id', patchBook);
router.delete('/:id', deleteBook);

module.exports = router; 