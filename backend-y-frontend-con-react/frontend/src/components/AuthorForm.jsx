import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthorForm({ onToast }) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    name: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/authors', author);
      onToast('Autor creado correctamente');
      navigate('/');
    } catch (error) {
      onToast('Error al crear el autor', 'error');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <div className="page-header">
        <h1 className="page-title">Nuevo Autor</h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={author.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            Biografía
          </label>
          <textarea
            id="bio"
            name="bio"
            value={author.bio}
            onChange={handleChange}
            className="form-control"
            rows="4"
          />
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
            {loading ? 'Guardando...' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthorForm; 