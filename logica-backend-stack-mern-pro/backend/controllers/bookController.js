const Book = require('../models/book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name bio');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'name bio');
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books by author
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.authorId }).populate('author');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book completely
const updateBook = async (req, res) => {
  try {
    const updated = await Book.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book partially
const patchBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByAuthor,
  createBook,
  updateBook,
  patchBook,
  deleteBook
}; 