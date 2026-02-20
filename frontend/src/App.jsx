import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminPage from './pages/AdminPage';
import CreateMoviePage from './pages/CreateMoviePage';
import EditMoviePage from './pages/EditMoviePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/create-movie" element={<CreateMoviePage />} />
            <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
