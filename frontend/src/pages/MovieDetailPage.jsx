import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Star, Clock, User, Trash2, Send, ChevronLeft, Edit2 } from 'lucide-react';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [movieRes, commentsRes] = await Promise.all([
                    api.get(`/movies/${id}`),
                    api.get(`/movies/${id}/comments`)
                ]);
                setMovie(movieRes.data.data);
                setComments(commentsRes.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieData();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await api.post(`/movies/${id}/comments`, {
                content: newComment,
                rating
            });
            setComments([...comments, { ...res.data.data, user: { username: user.username } }]);
            setNewComment('');
            setRating(5);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(c => c.id !== commentId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteMovie = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta película?')) return;
        try {
            await api.delete(`/movies/${id}`);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar la película.');
        }
    };

    if (loading) return <div className="text-center mt-20 text-2xl animate-pulse text-red-500">Analizando datos de la película...</div>;
    if (!movie) return <div className="text-center mt-20 text-xl">Película no encontrada.</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
                Volver a la cartelera
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                    <div className="rounded-2xl shadow-2xl border border-gray-700 overflow-hidden bg-gray-800">
                        <img
                            src={movie.poster === 'no-photo.jpg' ? 'https://via.placeholder.com/600x900?text=No+Poster' : movie.poster}
                            alt={movie.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-5xl font-black mb-2 text-white">{movie.title}</h1>
                        <div className="flex items-center gap-4 text-gray-400">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {movie.year}</span>
                            <span className="flex items-center gap-1 font-medium text-red-500 italic"><User className="w-4 h-4" /> {movie.director}</span>
                        </div>
                    </div>

                    <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-red-600 pl-6 py-2 bg-gray-800/30 rounded-r-lg">
                        {movie.description}
                    </p>

                    <div className="flex items-center justify-between gap-2 text-sm text-gray-500 italic">
                        <span>Publicado por: <span className="text-gray-300 font-semibold">{movie.user?.username || 'Sistema'}</span></span>

                        {user && movie.user && user.id === movie.user.id && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-movie/${movie.id}`}
                                    className="flex items-center gap-2 bg-yellow-600/10 text-yellow-500 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-lg transition font-bold border border-red-600/20"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Editar Película
                                </Link>
                                <button
                                    onClick={handleDeleteMovie}
                                    className="flex items-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition font-bold border border-red-600/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar Película
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-12 space-y-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Star className="text-yellow-500 fill-current w-8 h-8" />
                    Valoraciones y Críticas ({comments.length})
                </h2>

                {user ? (
                    <form onSubmit={handleAddComment} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-bold text-gray-400 uppercase">Valoración:</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className={`transition ${num <= rating ? 'text-yellow-500' : 'text-gray-600'} hover:scale-125`}
                                        >
                                            <Star className={`w-6 h-6 ${num <= rating ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <textarea
                            placeholder="Escribe tu crítica aquí..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition h-32"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition flex items-center gap-2 ml-auto shadow-lg shadow-red-900/20"
                        >
                            <Send className="w-5 h-5" />
                            Publicar Crítica
                        </button>
                    </form>
                ) : (
                    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl text-center">
                        Debes <Link to="/login" className="text-red-500 font-bold hover:underline">iniciar sesión</Link> para dejar un comentario.
                    </div>
                )}

                <div className="space-y-6">
                    {comments.map(c => (
                        <div key={c.id} className="bg-gray-800/40 p-6 rounded-xl border border-gray-800 hover:bg-gray-800/60 transition group relative">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-lg">
                                        {c.user.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{c.user.username}</h4>
                                        <div className="flex gap-0.5 text-yellow-500">
                                            {[...Array(c.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                        </div>
                                    </div>
                                </div>

                                {user && (user.id === c.user.id || user.id === movie.user?.id) && (
                                    <button
                                        onClick={() => handleDeleteComment(c.id)}
                                        className="text-gray-600 hover:text-red-500 transition p-2 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-400 italic">"{c.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
