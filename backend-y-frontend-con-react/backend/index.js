const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Book = require('./models/book');
const Author = require('./models/author')

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// Lo de arriba es la forma en la que se arranca un index o server.js, se crean las constantes y se hace uso del cors y express.json
// Ademas de que se inicializa la base de datos

//res.status().json() MAS COMUNES:
// 200 OK: La solicitud fue exitosa y el servidor ha respondido correctamente.
// 201 Created: La solicitud fue exitosa y resultó en la creación de un recurso.
// 400 Bad Request: La solicitud es incorrecta o mal formada (por ejemplo, falta algún parámetro obligatorio).
// 401 Unauthorized: La solicitud requiere autenticación y no se proporcionó o es incorrecta.
// 403 Forbidden: El servidor entiende la solicitud, pero se niega a autorizarla.
// 404 Not Found: El recurso solicitado no se pudo encontrar en el servidor.
// 500 Internal Server Error: El servidor encontró un error inesperado mientras procesaba la solicitud.

// GET all books
app.get('/books', async (req, res) => {
  const books = await Book.find().populate('author', 'name bio');
  res.json(books);
});

// GET book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'name bio');     //El .populate es un metodo q nos permite q su contenido 'author' haga referencia al campo del esquema que hace referencia a otro documento (author es un ObjectId del documento Author). Lo que venga despues de la , especifica los campos del documento a obtener
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all authors
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET author by ID
app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET books by author
app.get('/authors/:id/books', async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.id }).populate('author');      // Se especifica en el metodo find, el campo donde author sea igual al req.params.id, y hace uso del metodo populate
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------DOS FORMAS DE HACER UN POST, LA PRIMERA MAS LIMPIA Y ESTRUCTURADA-----------------
// app.post('/books', async (req, res) => {
//   try {
//     const {title, author, year} = req.body ---------------> Esta es la forma MAS COMUN de ingresar
//     const newBook = new Book({title, author, year})
//     await newBook.save()
//     res.status(201).json(newBook)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// POST book
app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST author
app.post('/authors', async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = new Author({ name, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT book (reemplazo completo)
app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findOneAndReplace(     //Metodo comun en PUT
      { _id: req.params.id },     //1. Filtro: buscar por ID. Figura como _id ya que MongoDB crea la id de manera automatica
      req.body,                   //2. Nuevo contenido completo.
      { new: true }               //3. Devuelve el documento actualizado
    );
    if (!updated) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH book (actualización parcial)
app.patch('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(     //Metodo comun en PATCH
      req.params.id,            //1. El id del documento que se desea actualizar
      { $set: req.body },       //2. Los campos que se desean modificar. Gracias a '$set' solo se modifican los datos pasados en req.body
      { new: true }             //3. Opciones: 'new: True' devuelve el documento actualizado
    );
    if (!updated) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE book
app.delete('/books/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);          //Metodo comun en DELETE, busca por la id y lo elimina
    if (!deleted) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log(`🚀 Servidor corriendo en http://localhost:3000`));
