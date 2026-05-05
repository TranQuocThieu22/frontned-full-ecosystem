'use client';

import type Keycloak from 'keycloak-js';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { keycloak } from '../lib/keycloak';

interface AuthContextType {
    keycloak: Keycloak;
    authenticated: boolean;
    initialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initializedRef = useRef(false);
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        keycloak
            .init({
                onLoad: 'login-required',
                pkceMethod: 'S256',
                checkLoginIframe: false,
            })
            .then(auth => {
                setAuthenticated(auth);
                setInitialized(true);
            })
            .catch(err => {
                console.error(err);
                setInitialized(true);
            });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                keycloak: keycloak,
                authenticated,
                initialized,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return ctx;
}
