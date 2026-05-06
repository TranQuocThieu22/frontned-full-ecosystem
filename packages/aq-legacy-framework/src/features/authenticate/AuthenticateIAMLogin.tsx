"use client";


import { authService } from "@aq-fe/aq-legacy-framework/shared/APIs/authService";
import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/shared/stores/useAuthenticateStore";
import { CustomLoginPage } from "@aq-fe/core-ui/shared/components/page/CustomLoginPage";
import { Badge, Box, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconShieldCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AuthenticateIAMLogin() {
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
            route.push("/admin/tenants")
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
            <CustomLoginPage
                brandName="SAE - Admin"
                brandTagline="Hệ thống quản trị dành cho Super Admin. Thiết lập khung, danh mục và theo dõi hệ thống."
                title="Đăng nhập MFE-ADMIN"
                subtitle="Khu vực quản trị hệ thống. Chỉ dành cho Administrator."
                header={
                    <Flex gap="xs" mb="xs" align="center">
                        <Badge
                            size="lg"
                            variant="light"
                            color="red"
                            leftSection={<IconShieldCheck size={14} />}
                        >
                            Super Admin Only
                        </Badge>
                    </Flex>
                }
                onSubmit={async (values) => {
                    loginMutation.mutate(values);
                }}
            />
        </Box>
    );
}
