import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AuthorForm from './components/AuthorForm';
import AuthorDetails from './components/AuthorDetails';
import Toast from './components/Toast';
import { useState } from 'react';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<BookList onToast={showToast} />} />
            <Route path="/books/new" element={<BookForm onToast={showToast} />} />
            <Route path="/books/:id/edit" element={<BookForm onToast={showToast} />} />
            <Route path="/authors/new" element={<AuthorForm onToast={showToast} />} />
            <Route path="/authors/:id" element={<AuthorDetails onToast={showToast} />} />
          </Routes>
        </main>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </Router>
  );
}

export default App;
