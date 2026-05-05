'use client';

import { useAuth } from "@/shared/providers/AuthProvider";


export default function LoginPage() {
    const { keycloak, initialized } = useAuth();

    if (!initialized) {
        return <p>Đang khởi tạo...</p>;
    }

    const login = () => {
        keycloak.login({
            redirectUri:
                'http://localhost:3008/srm-internal/admin/accountManagement',
        });
    };

    return <button onClick={login}>Đăng nhập</button>;
}