import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar usuario.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 mt-10">
            <div className="flex flex-col items-center mb-6">
                <UserPlus className="w-12 h-12 text-red-500 mb-2" />
                <h2 className="text-3xl font-bold">Crear Cuenta</h2>
            </div>

            {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 rounded-lg transition shadow-lg shadow-red-900/20"
                >
                    Registrarse
                </button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
                ¿Ya tienes cuenta? <Link to="/login" className="text-red-500 hover:underline">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
