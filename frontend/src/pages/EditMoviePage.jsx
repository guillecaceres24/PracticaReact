import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Save, Image as ImageIcon, Film, Calendar, FileText, ChevronLeft } from 'lucide-react';

const EditMoviePage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        year: '',
        description: '',
        poster: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await api.get(`/movies/${id}`);
                const movie = res.data.data;

                // Security check: only owner can edit
                if (movie.user && movie.user.id !== user?.id) {
                    navigate('/');
                    return;
                }

                setFormData({
                    title: movie.title,
                    director: movie.director,
                    year: movie.year,
                    description: movie.description,
                    poster: movie.poster
                });
            } catch (err) {
                console.error(err);
                setError('Error al cargar la película.');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchMovie();
        else navigate('/login');
    }, [id, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/movies/${id}`, formData);
            navigate(`/movies/${id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Error al actualizar la película.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center mt-20 text-2xl animate-pulse text-red-500">Cargando datos...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
                Volver
            </button>

            <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
                <div className="flex items-center gap-4 mb-8">
                    <Save className="w-10 h-10 text-blue-500" />
                    <h1 className="text-4xl font-black">Editar Película</h1>
                </div>

                {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            <Film className="w-4 h-4" /> Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            Director
                        </label>
                        <input
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            <Calendar className="w-4 h-4" /> Año
                        </label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            <ImageIcon className="w-4 h-4" /> URL del Póster
                        </label>
                        <input
                            type="text"
                            name="poster"
                            value={formData.poster}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            <FileText className="w-4 h-4" /> Sinopsis
                        </label>
                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className={`md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-900/30 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditMoviePage;
