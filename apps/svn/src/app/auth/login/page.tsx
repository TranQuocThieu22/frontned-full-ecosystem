"use client";
import { Button } from "@mantine/core";
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <Feat_Authenticate_Login
            backgroundImage="/imgs/authBackground.png"
            showLoginButton={false}
            additionalActions={(
                <Button
                    onClick={() => {
                        router.replace("/admin/dashboard");
                    }}
                >Đăng nhập</Button>
            )}
            onSuccess={(data) => {
                if (data?.data?.roleIds?.[0] == 7) {
                    router.replace("/admin/dashboard");
                }
            }}
        />
    );
}
