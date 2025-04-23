import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookList({ onToast }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      onToast('Error al cargar los libros', 'error');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
        onToast('Libro eliminado correctamente');
      } catch (error) {
        onToast('Error al eliminar el libro', 'error');
      }
    }
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <h2>No hay libros registrados</h2>
        <p>Comienza agregando un nuevo libro</p>
        <Link to="/books/new" className="btn btn-primary">
          Agregar Libro
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Biblioteca</h1>
      </div>

      <div className="card-grid">
        {books.map((book) => (
          <div key={book._id} className="card">
            <h3 className="card-title">{book.title}</h3>
            {book.author && (
              <p className="card-subtitle">
                por{' '}
                <Link 
                  to={`/authors/${book.author._id}`}
                  className="author-link"
                >
                  {book.author.name}
                </Link>
              </p>
            )}
            {book.year && (
              <p className="card-subtitle">Año: {book.year}</p>
            )}
            <div className="card-actions">
              <Link
                to={`/books/${book._id}/edit`}
                className="btn btn-secondary"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList; 