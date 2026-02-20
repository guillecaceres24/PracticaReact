import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { PlusCircle, Image as ImageIcon, Film, Calendar, FileText } from 'lucide-react';

const CreateMoviePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        year: new Date().getFullYear(),
        description: '',
        poster: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/movies', formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al crear la película.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
            <div className="flex items-center gap-4 mb-8">
                <PlusCircle className="w-10 h-10 text-red-500" />
                <h1 className="text-4xl font-black">Añadir Película</h1>
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
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none transition"
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
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none transition"
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
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none transition"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                        <ImageIcon className="w-4 h-4" /> URL del Póster (Opcional)
                    </label>
                    <input
                        type="text"
                        name="poster"
                        placeholder="https://ejemplo.com/poster.jpg"
                        value={formData.poster}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none transition"
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
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none transition"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-red-900/30 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Subiendo...' : 'Publicar Película'}
                </button>
            </form>
        </div>
    );
};

export default CreateMoviePage;
