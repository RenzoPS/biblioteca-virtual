import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookForm({ onToast }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    isPublished: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/authors');
      setAuthors(response.data);
    } catch (error) {
      onToast('Error al cargar los autores', 'error');
    }
  };

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      setBook({
        ...response.data,
        author: response.data.author?._id || ''
      });
    } catch (error) {
      onToast('Error al cargar el libro', 'error');
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await axios.patch(`http://localhost:3000/books/${id}`, book);
        onToast('Libro actualizado correctamente');
      } else {
        await axios.post('http://localhost:3000/books', book);
        onToast('Libro creado correctamente');
      }
      navigate('/');
    } catch (error) {
      onToast('Error al guardar el libro', 'error');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="form-container">
      <div className="page-header">
        <h1 className="page-title">
          {id ? 'Editar Libro' : 'Nuevo Libro'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Autor
          </label>
          <select
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecciona un autor</option>
            {authors.map(author => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year" className="form-label">
            Año
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={book.year}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <input
              type="checkbox"
              name="isPublished"
              checked={book.isPublished}
              onChange={handleChange}
            />
            {' '}Publicado
          </label>
        </div>

        <div className="card-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm; 