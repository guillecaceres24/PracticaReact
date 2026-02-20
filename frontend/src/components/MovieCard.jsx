import { Link } from 'react-router-dom';
import { Star, Calendar, User } from 'lucide-react';

const MovieCard = ({ movie }) => {
    console.log(`Cargando imagen para: ${movie.title} -> ${movie.poster}`);

    return (
        <Link
            to={`/movies/${movie.id}`}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all group shadow-lg flex flex-col h-full"
        >
            <div className="relative h-96 w-full bg-gray-900 overflow-hidden">
                <img
                    src={movie.poster === 'no-photo.jpg' ? 'https://via.placeholder.com/300x450?text=No+Poster' : movie.poster}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        console.error(`Error cargando imagen de ${movie.title}:`, movie.poster);
                        e.target.src = 'https://via.placeholder.com/300x450?text=Error+Carga';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {movie.year}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition line-clamp-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 italic">"{movie.director}"</p>

                <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{movie.user?.username || 'Anónimo'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Ver detalles</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
