import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Film, LogOut, User, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-red-500">
                    <Film className="w-8 h-8" />
                    CinemaApp
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-red-400 transition">Películas</Link>

                    {user ? (
                        <>
                            <Link to="/create-movie" className="flex items-center gap-1 hover:text-red-400 transition">
                                <PlusCircle className="w-5 h-5" />
                                Nueva
                            </Link>
                            <Link to="/admin" className="flex items-center gap-1 hover:text-red-400 transition">
                                <User className="w-5 h-5" />
                                Mi Panel
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-red-400 transition">Login</Link>
                            <Link to="/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">Registro</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
