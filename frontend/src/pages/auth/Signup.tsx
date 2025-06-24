// src/components/LoginPage.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_URL;

type Role = 'user' | 'admin' | 'superadmin';

const SignUpPage: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<Role>();

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // 🔄 loading state

    const navigate = useNavigate(); // 🧭 navigation

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password || !userName) {
            setError('Please enter the required fields.');
            toast.error('Please enter the required fields.');
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${API}/auth/signup`, { email, password, username: userName, role });

            toast.success('User Created Successfully! Redirecting...');

            setEmail('');
            setPassword('');
            setError('');

            // Redirect to login using navigate
            navigate('/login');

        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Login failed. Please try again.';

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
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            // id="username"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            // id="username"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">
                            Role
                        </label>
                        <select
                            id="role"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            value={role}
                            onChange={(e) => setRole(e.target.value as Role)}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            } text-white font-semibold`}
                    >
                        {loading ? 'Creating...' : 'Signup'}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;