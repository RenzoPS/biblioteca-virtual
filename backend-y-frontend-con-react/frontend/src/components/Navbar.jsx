import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Biblioteca
        </Link>
        <div className="navbar-actions">
          <Link to="/books/new" className="btn btn-primary">
            Nuevo Libro
          </Link>
          <Link to="/authors/new" className="btn btn-secondary">
            Nuevo Autor
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 