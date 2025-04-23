const Author = require('../models/author');

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new author
const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = new Author({ name, bio });
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an author
const updateAuthor = async (req, res) => {
  try {
    const updated = await Author.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Autor no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an author
const deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Autor no encontrado' });
    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
}; 