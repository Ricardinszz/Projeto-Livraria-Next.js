'use client';

import { useState } from 'react';
import Login from '../components/login';


export default function TelaDeLogin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        if (status) {
            window.location.href = '/';
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : (
                <p>Você já está logado!</p>
            )}
        </div>
    );
}
