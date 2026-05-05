"use client"
import { BackgroundImage, Button, Center } from "@mantine/core";
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";
import { useStore_Permission } from "aq-fe-framework/stores"
import { useRef, useState, useEffect } from "react";
import { useWindowEvent } from "@mantine/hooks";

export default function Page() {
    const [module, setModule] = useState<string>("");
    const router = useRouter()
    const permissionStore = useStore_Permission()
    const loginButtonRef = useRef<HTMLButtonElement>(null);
    useWindowEvent('keydown', (event) => {
        if (event.code === 'Enter') {
            event.preventDefault();
            loginButtonRef.current?.focus();
            permissionStore.setProperty("isSuperAdmin", true)
            router.push("/admin/dashboard-type1")
        }
    });
    useEffect(() => {
        const fetchConfig = async () => {
            const response = await fetch('/config.json').then(res => res.json());
            setModule(response.module);
        }
        fetchConfig();
    }, []);

    if (module === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Feat_Authenticate_Login
                siteUrl={`/${module}`}
                showLoginButton={false}
                additionalActions={
                    <Button
                        ref={loginButtonRef}
                        onClick={() => {
                            permissionStore.setProperty("isSuperAdmin", true)
                            router.push("/admin/dashboard-type1")
                        }}
                    >
                        Đăng nhập
                    </Button>
                }
            />
        </>
    )
}

