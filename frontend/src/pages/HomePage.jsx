import { useState, useEffect } from 'react';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import { Search } from 'lucide-react';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get('/movies');
                setMovies(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.director.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-center mt-20 text-2xl animate-pulse">Cargando cartelera...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-4xl font-extrabold text-white">Cartelera</h1>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por título o director..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    />
                </div>
            </div>

            {filteredMovies.length === 0 ? (
                <div className="text-center mt-10 text-gray-400 text-xl">No se encontraron películas.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
