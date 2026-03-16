'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';


interface AuthContextType {
    isLoggedIn: boolean;
    user: any | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/api/logout';
    }, []);

    useEffect(() => {
        function onUnauthorized() {
            setIsLoggedIn(false);
            setUser(null);
            window.location.href = `/api/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`;
        }

        window.addEventListener('auth:unauthorized', onUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
    }, []);

    useEffect(() => {
        async function initAuth() {
            try {
                const res = await fetch('/api/me');

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    setIsLoggedIn(true);
                } else {
                    window.location.href = `/api/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`;
                }
            } catch {
                window.location.href = `/api/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`;
            } finally {
                setIsLoading(false);
            }
        }

        initAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#E9BC19] border-t-transparent rounded-full animate-spin" />
                    <p className="text-white text-sm">Authenticating...</p>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) return null;

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}