"use client";

import {
    Anchor,
    Box,
    Button,
    Checkbox,
    Flex,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconKey, IconLock, IconSparkles, IconUser } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

export interface SaeLoginCredentials {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface SaeAuthenticateLoginProps {
    /** Tên hiển thị trên panel trái */
    brandName?: string;
    /** Dòng mô tả ngắn dưới brand */
    brandTagline?: string;
    title?: string;
    subtitle?: string;
    header?: ReactNode;
    onSubmit?: (credentials: SaeLoginCredentials) => void | Promise<void>;
    showRememberMe?: boolean;
    showForgotPassword?: boolean;
}

/**
 * Form đăng nhập SAE: username + password. Xử lý sau đăng nhập qua `onSubmit`.
 */
export function SaeAuthenticateLogin({
    brandName = "SAE",
    brandTagline = "Hệ thống quản trị tập trung, an toàn và dễ sử dụng.",
    title = "Chào mừng trở lại",
    subtitle = "Đăng nhập bằng tài khoản được cấp để tiếp tục.",
    header,
    onSubmit,
    showRememberMe = true,
    showForgotPassword = true
}: SaeAuthenticateLoginProps) {
    const [busy, setBusy] = useState(false);

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
            rememberMe: false
        },
        validate: {
            username: (v) => (v.trim() ? null : "Không được để trống"),
            password: (v) => (v ? null : "Không được để trống")
        }
    });

    async function handleSubmit(values: typeof form.values) {
        const credentials: SaeLoginCredentials = {
            username: values.username.trim(),
            password: values.password,
            rememberMe: values.rememberMe
        };
        if (!onSubmit) return;
        setBusy(true);
        try {
            await Promise.resolve(onSubmit(credentials));
        } finally {
            setBusy(false);
        }
    }

    const glassFormCard = {
        root: {
            position: "relative" as const,
            isolation: "isolate" as const,
            overflow: "hidden" as const,
            background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.48) 48%, rgba(255, 255, 255, 0.4) 100%)",
            backdropFilter: "blur(22px) saturate(1.2)",
            WebkitBackdropFilter: "blur(22px) saturate(1.2)",
            border: "2px solid rgba(255, 255, 255, 0.92)",
            boxShadow:
                "0 0 0 1px rgba(15, 39, 68, 0.07), 0 16px 40px rgba(15, 39, 68, 0.09), 0 6px 16px rgba(15, 39, 68, 0.06), 0 1px 4px rgba(15, 39, 68, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.98), inset 0 -1px 0 rgba(15, 39, 68, 0.035)",
            "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background:
                    "linear-gradient(125deg, rgba(255, 255, 255, 0.55) 0%, transparent 40%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 0
            }
        }
    };

    const inputStyles = {
        input: {
            borderRadius: rem(10),
            backgroundColor: "rgba(255, 255, 255, 0.62)",
            borderColor: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.72)"
        }
    };

    return (
        <Flex
            h="100dvh"
            direction={{ base: "column", md: "row" }}
            style={{ overflow: "hidden" }}
        >
            {/* Panel thương hiệu */}
            <Box
                pos="relative"
                flex={{ base: "0 0 auto", md: "0 0 46%" }}
                mih={{ base: rem(200), md: "100dvh" }}
                py={{ base: "xl", md: 0 }}
                px="xl"
                style={{
                    background:
                        "linear-gradient(145deg, #1c3d6e 0%, #0f2744 45%, #152a4a 100%)",
                    overflow: "hidden"
                }}
            >
                {/* vòng tròn trang trí */}
                <Box
                    pos="absolute"
                    top="-20%"
                    left="-15%"
                    w={rem(380)}
                    h={rem(380)}
                    style={{
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        filter: "blur(1px)"
                    }}
                />
                <Box
                    pos="absolute"
                    bottom="-25%"
                    right="-20%"
                    w={rem(420)}
                    h={rem(420)}
                    style={{
                        borderRadius: "50%",
                        background: "rgba(100, 180, 255, 0.08)"
                    }}
                />
                <Flex
                    direction="column"
                    justify="center"
                    align={{ base: "center", md: "flex-start" }}
                    h="100%"
                    mih={{ base: rem(180), md: "100dvh" }}
                    pos="relative"
                    style={{ zIndex: 1 }}
                    ta={{ base: "center", md: "left" }}
                >
                    <Flex align="center" gap="sm" mb="md">
                        <Flex
                            align="center"
                            justify="center"
                            w={rem(48)}
                            h={rem(48)}
                            style={{
                                borderRadius: rem(12),
                                background: "rgba(255,255,255,0.12)",
                                backdropFilter: "blur(8px)"
                            }}
                        >
                            <IconLock size={26} color="white" stroke={1.5} />
                        </Flex>
                        <Title order={2} c="white" fw={700} style={{ letterSpacing: "-0.02em" }}>
                            {brandName}
                        </Title>
                    </Flex>
                    <Text
                        c="rgba(255,255,255,0.85)"
                        size="lg"
                        maw={rem(400)}
                        lh={1.6}
                        mb="xl"
                    >
                        {brandTagline}
                    </Text>
                    <Flex gap="xs" wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                        <Flex
                            align="center"
                            gap={6}
                            px="sm"
                            py={6}
                            style={{
                                borderRadius: rem(8),
                                background: "rgba(255,255,255,0.1)"
                            }}
                        >
                            <IconSparkles size={16} color="rgba(255,255,255,0.9)" />
                            <Text size="sm" c="rgba(255,255,255,0.95)">
                                Bảo mật đa lớp
                            </Text>
                        </Flex>
                        <Flex
                            align="center"
                            gap={6}
                            px="sm"
                            py={6}
                            style={{
                                borderRadius: rem(8),
                                background: "rgba(255,255,255,0.1)"
                            }}
                        >
                            <IconKey size={16} color="rgba(255,255,255,0.9)" />
                            <Text size="sm" c="rgba(255,255,255,0.95)">
                                Phiên làm việc an toàn
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            {/* Form — nền xanh-xám nhạt + họa tiết đồng điệu panel trái */}
            <Box
                pos="relative"
                flex={1}
                style={{
                    overflow: "hidden",
                    background:
                        "linear-gradient(115deg, rgba(28, 61, 110, 0.09) 0%, #e4eaf3 14%, #eef2f8 45%, #e8edf6 100%)"
                }}
            >
                <Box
                    pos="absolute"
                    top="-12%"
                    right="-8%"
                    w={rem(340)}
                    h={rem(340)}
                    style={{
                        borderRadius: "50%",
                        background: "rgba(28, 61, 110, 0.07)",
                        filter: "blur(2px)"
                    }}
                />
                <Box
                    pos="absolute"
                    bottom="-18%"
                    left="-5%"
                    w={rem(380)}
                    h={rem(380)}
                    style={{
                        borderRadius: "50%",
                        background: "rgba(100, 160, 220, 0.12)"
                    }}
                />
                <Box
                    pos="absolute"
                    inset={0}
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,255,255,0.5) 0%, transparent 55%)",
                        pointerEvents: "none"
                    }}
                />
                <Flex
                    pos="relative"
                    align="center"
                    justify="center"
                    py={{ base: "xl", md: "xl" }}
                    px="md"
                    mih={{ base: undefined, md: "100dvh" }}
                    style={{ zIndex: 1 }}
                >
                    <Paper
                        radius="xl"
                        p={{ base: "lg", sm: "xl" }}
                        maw={rem(440)}
                        w="100%"
                        withBorder={false}
                        shadow="none"
                        styles={glassFormCard}
                    >
                        <Stack gap="lg" pos="relative" style={{ zIndex: 1 }}>
                            {header}
                            <Box>
                                <Title order={2} fw={800} style={{ letterSpacing: "-0.03em" }}>
                                    {title}
                                </Title>
                                <Text c="dimmed" size="sm" mt="xs" maw={rem(360)} lh={1.55}>
                                    {subtitle}
                                </Text>
                            </Box>
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Stack gap="md">
                                    <TextInput
                                        {...form.getInputProps("username")}
                                        label="Tài khoản"
                                        placeholder="ten.dangnhap"
                                        withAsterisk
                                        autoComplete="username"
                                        size="md"
                                        leftSection={<IconUser size={18} stroke={1.5} />}
                                        styles={inputStyles}
                                    />
                                    <PasswordInput
                                        {...form.getInputProps("password")}
                                        label="Mật khẩu"
                                        placeholder="••••••••"
                                        withAsterisk
                                        autoComplete="current-password"
                                        size="md"
                                        leftSection={<IconLock size={18} stroke={1.5} />}
                                        styles={inputStyles}
                                    />
                                    <Group justify="space-between" wrap="nowrap" mt={4}>
                                        {showRememberMe && (
                                            <Checkbox
                                                {...form.getInputProps("rememberMe", {
                                                    type: "checkbox"
                                                })}
                                                label="Ghi nhớ đăng nhập"
                                                size="sm"
                                            />
                                        )}
                                        {showForgotPassword && (
                                            <Anchor
                                                size="sm"
                                                fw={500}
                                                component="button"
                                                type="button"
                                                variant="transparent"
                                                onClick={() => {
                                                    /* nối flow sau */
                                                }}
                                            >
                                                Quên mật khẩu?
                                            </Anchor>
                                        )}
                                    </Group>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="md"
                                        radius="md"
                                        loading={busy}
                                        mt="sm"
                                        styles={{
                                            root: {
                                                fontWeight: 600,
                                                boxShadow: "0 8px 20px rgba(28, 61, 110, 0.25)"
                                            }
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </Flex>
            </Box>
        </Flex>
    );
}
