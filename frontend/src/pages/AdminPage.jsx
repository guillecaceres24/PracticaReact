import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Edit2, Trash2, Eye, Layout } from 'lucide-react';

const AdminPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserMovies = async () => {
            try {
                const res = await api.get('/movies');
                // Filter movies belonging to the user
                const userMovies = res.data.data.filter(m => m.user?.id === user?.id);
                setMovies(userMovies);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchUserMovies();
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta película?')) return;
        try {
            await api.delete(`/movies/${id}`);
            setMovies(movies.filter(m => m.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-center mt-20 text-2xl text-red-500">Cargando tu colección...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Layout className="w-10 h-10 text-red-500" />
                    <h1 className="text-4xl font-black">Mi Panel</h1>
                </div>
                <Link
                    to="/create-movie"
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
                >
                    <Edit2 className="w-5 h-5" /> Nueva Película
                </Link>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-700/50 text-gray-400 uppercase text-xs font-bold tracking-widest">
                            <th className="px-6 py-4">Póster</th>
                            <th className="px-6 py-4">Título</th>
                            <th className="px-6 py-4">Año</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {movies.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    No has añadido ninguna película todavía.
                                </td>
                            </tr>
                        ) : (
                            movies.map(movie => (
                                <tr key={movie.id} className="hover:bg-gray-700/30 transition group">
                                    <td className="px-6 py-4">
                                        <img
                                            src={movie.poster === 'no-photo.jpg' ? 'https://via.placeholder.com/100x150?text=No+Poster' : movie.poster}
                                            alt={movie.title}
                                            className="w-12 h-16 object-cover rounded shadow"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">{movie.title}</td>
                                    <td className="px-6 py-4 text-gray-400">{movie.year}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition">
                                            <Link
                                                to={`/edit-movie/${movie.id}`}
                                                className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/40 transition"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(movie.id)}
                                                className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
