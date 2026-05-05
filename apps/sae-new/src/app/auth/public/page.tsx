"use client";
import { SaeAuthenticateLogin } from "@/features/authenticate/SaeAuthenticateLogin";
import { authService } from "@aq-fe/aq-core-framework/shared/APIs/authService";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
    const route = useRouter()
    const authStore = useAuthenticateStore();
    const loginMutation = useMutation({
        mutationFn: (values: { username?: string, password?: string }) => {
            return authService.login(values);
        },
        onSuccess: (data) => {
            const result = data.data.results
            authStore.setProperty("token", result.accessToken)
            authStore.setProperty("tenantId", result.tenantId)
            localStorage.setItem("sae_user_subsystem", "public")
            route.push("/public/student/dashboard")
        },
        onError: (error) => {
            console.error("Login failed:", error);
            notifications.show({
                title: "Đăng nhập thất bại",
                message: "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.",
                color: "red",
                icon: <IconX size={18} />
            });
        },
    });

    return (
        <Box style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
            <SaeAuthenticateLogin
                brandName="SAE - MFE Public"
                brandTagline="Hệ thống quản lý hoạt động ngoại khóa dành cho Sinh viên, Giảng viên và Quản lý CLB."
                title="Đăng nhập MFE-PUBLIC"
                subtitle="Sử dụng tài khoản được cấp bởi Trường để truy cập hệ thống."
                onSubmit={async (values) => {
                    loginMutation.mutate(values);
                }}
            />
        </Box>
    );
}
