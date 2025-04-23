const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"},  //RELACION, Author es un objeto, que hace referencia (ref) a la clase Author
  year: Number,
  isPublished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);
