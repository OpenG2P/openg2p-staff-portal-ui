'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';


interface AuthContextType {
    isLoggedIn: boolean;
    user: any | null;
    logout: () => void;
    handleUnauthorized: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorCode, setErrorCode] = useState<string | null>(null);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/api/logout';
    }, []);

    const handleUnauthorized = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = `/api/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }, []);

    useEffect(() => {
        async function initAuth() {
            try {
                const res = await fetch("/api/me");

                if (res.status === 401) {
                    let error: any = {};
                    try {
                        error = await res.json();
                    } catch { }

                    const errorObj = error?.errors?.[0] || {};
                    const code = errorObj.code;
                    const message = (errorObj.message || "").toLowerCase();

                    if (
                        message.includes("expired") ||
                        message.includes("invalid jwt") ||
                        message.includes("inactive token") ||
                        code === 'G2P-AUT-LOGIN-REQUIRED'
                    ) {
                        handleUnauthorized();
                        return;
                    }

                    setErrorCode("AUTH_GENERIC_ERROR");
                    return;
                }

                if (res.status === 413) {
                    setErrorCode('G2P-AUT-413');
                    return;
                }

                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                    setIsLoggedIn(true);
                } else {
                    console.log(data);
                }

            } catch (err) {
                console.error("Request failed:", err);
            } finally {
                setIsLoading(false);
            }
        }

        initAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/loading.gif"
                        alt="Loading"
                        className="w-12 h-12"
                    />
                    <p className="text-black/50 text-[20px]">Loading the admin UI</p>
                </div>
            </div>
        );
    }

    if (errorCode === 'AUTH_GENERIC_ERROR') {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white drop-shadow-lg rounded-lg p-10 max-w-150 w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-semibold text-black">Something went wrong</h1>
                    <p className="text-black mt-4 text-lg leading-relaxed">
                        An unexpected error occurred. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    if (errorCode === 'G2P-AUT-413') {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-[#ffffff] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-[10px] p-10 max-w-180 w-full text-center">

                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-semibold text-black">
                        Token Size Limit Exceeded
                    </h1>

                    <p className="text-black mt-4 text-lg leading-relaxed">
                        The access token exceeds the maximum allowed size (4KB cookie limit) and cannot be processed.
                    </p>

                    <p className="text-black mt-2 text-base leading-relaxed">
                        Root cause: excessive role claims included in the token payload.
                    </p>

                    <div className="mt-6 text-left bg-white border border-black/20 rounded-[10px] p-5">
                        <p className="text-base font-semibold text-black mb-3">
                            Required Action (Admin)
                        </p>

                        <ol className="space-y-3">
                            {[
                                'Reduce the number of roles assigned to the user',
                                'Optimize token claims (remove unnecessary data)',
                                'Reissue the token after role adjustment',
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-base text-black">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <p className="text-[16px] font-bold text-black mt-4">
                        Error Code: <span className="font-mono">G2P-AUT-413</span>
                    </p>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) return null;

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logout, handleUnauthorized }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}