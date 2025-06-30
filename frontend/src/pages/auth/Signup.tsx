import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import type { Role, Position } from '../../types/auth';

const API = import.meta.env.VITE_API_URL;

const positions: Position[] = [
    'Software Developer',
    'Data Analyst',
    'QA Engineer',
    'Designer',
    'Manager',
];

const SignUpPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role | ''>('');
    const [position, setPosition] = useState<Position | ''>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password || !userName || !role || !position) {
            setError('Please fill in all required fields.');
            toast.error('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${API}/auth/signup`, {
                email,
                password,
                username: userName,
                role,
                position,
            });

            toast.success('🎉 User created successfully!');
            setEmail('');
            setPassword('');
            setUserName('');
            setRole('');
            setPosition('');

            navigate('/login');
        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Signup failed. Please try again.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h1>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                        <label htmlFor='role' className="block text-gray-700 text-sm font-semibold mb-2">
                            Role
                        </label>
                        <select
                            id='role'
                            className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    {/* Position */}
                    <div className="mb-4">
                        <label htmlFor='position' className="block text-gray-700 text-sm font-semibold mb-2">
                            Position
                        </label>
                        <select
                            id='position'
                            className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position}
                            onChange={(e) => setPosition(e.target.value as Position)}
                            required
                        >
                            <option value="">Select a position</option>
                            {positions.map((pos) => (
                                <option key={pos} value={pos}>
                                    {pos}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Password */}
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-10"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // type="password"
                            // className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200 ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Creating...' : 'Signup'}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;