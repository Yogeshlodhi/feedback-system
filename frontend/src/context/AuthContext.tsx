import React, { createContext, useEffect, useState } from 'react';

import type { AuthContextTypeProps, User } from '../types/auth';

export const AuthContext = createContext<AuthContextTypeProps>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    token: null, 
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
