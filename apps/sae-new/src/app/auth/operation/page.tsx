"use client";

import { SaeAuthenticateLogin } from "@/features/authenticate/SaeAuthenticateLogin";
import { authService } from "@aq-fe/aq-core-framework/shared/APIs/authService";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { Box, Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBuilding, IconSchool, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
    const authStore = useAuthenticateStore();
    const route = useRouter()
    const loginMutation = useMutation({
        mutationFn: (values: { username?: string, password?: string }) => {
            return authService.login(values);
        },
        onSuccess: (data) => {
            const result = data.data.results
            authStore.setProperty("token", result.accessToken)
            authStore.setProperty("tenantId", result.tenantId)
            localStorage.setItem("sae_user_subsystem", "operation")
            route.push("/operation/ctsv/dashboard")
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
                brandName="SAE - MFE Operation"
                brandTagline="Hệ thống quản lý nghiệp vụ dành cho Phòng CTCT & QLSV, Khoa và Hội đồng."
                title="Đăng nhập MFE-OPERATION"
                subtitle="Truy cập nội bộ. Sử dụng tài khoản được phân quyền."
                header={
                    <Flex gap="md" mb="sm">
                        <Text
                            size="sm"
                            fw={500}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                background: "rgba(28, 61, 110, 0.08)"
                            }}
                        >
                            <IconBuilding size={16} color="#1c3d6e" />
                            CTSV / Khoa
                        </Text>
                        <Text
                            size="sm"
                            fw={500}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                background: "rgba(28, 61, 110, 0.08)"
                            }}
                        >
                            <IconSchool size={16} color="#1c3d6e" />
                            Hội đồng
                        </Text>
                    </Flex>
                }
                onSubmit={async (values) => {
                    loginMutation.mutate(values);
                }}
            />
        </Box>
    );
}
