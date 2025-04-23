import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthorDetails({ onToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorAndBooks();
  }, [id]);

  const fetchAuthorAndBooks = async () => {
    try {
      const [authorResponse, booksResponse] = await Promise.all([
        axios.get(`http://localhost:3000/authors/${id}`),
        axios.get(`http://localhost:3000/authors/${id}/books`)
      ]);
      
      setAuthor(authorResponse.data);
      setAuthorBooks(booksResponse.data);
      setLoading(false);
    } catch (error) {
      onToast('Error al cargar los datos del autor', 'error');
      navigate('/');
    }
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">{author.name}</h1>
        {author.bio && (
          <p className="text-muted">{author.bio}</p>
        )}
      </div>

      <div className="card">
        <h2 className="card-title">Libros del Autor</h2>
        {authorBooks.length > 0 ? (
          <div className="card-grid">
            {authorBooks.map((book) => (
              <div key={book._id} className="card">
                <h3 className="card-title">{book.title}</h3>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">Este autor aún no tiene libros registrados</p>
        )}
      </div>

      <div className="card-actions" style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default AuthorDetails; 