"use client";

import {
    Box,
    Button,
    Flex,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    Title,
    rem
} from "@mantine/core";
import { useRouter } from "next/navigation";
import {
    IconUsers,
    IconBuildingSkyscraper,
    IconShieldCheckered,
    IconChevronRight,
    IconAlertTriangle
} from "@tabler/icons-react";

interface Subsystem {
    id: "public" | "operation" | "admin";
    name: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    badge?: string;
    badgeColor?: string;
    targetUsers: string[];
    environment: string;
}

const subsystems: Subsystem[] = [
    {
        id: "public",
        name: "MFE-PUBLIC",
        description: "Dành cho Sinh viên, Giảng viên và Quản lý CLB. Truy cập công khai qua Internet.",
        icon: <IconUsers size={28} stroke={1.5} />,
        href: "/auth/public",
        badge: "Public",
        badgeColor: "blue",
        targetUsers: ["Sinh viên", "Giảng viên / CVHT", "Quản lý CLB"],
        environment: "Public Internet + SSO"
    },
    {
        id: "operation",
        name: "MFE-OPERATION",
        description: "Dành cho Phòng CTCT & QLSV, Khoa và Hội đồng. Truy cập nội bộ.",
        icon: <IconBuildingSkyscraper size={28} stroke={1.5} />,
        href: "/auth/operation",
        badge: "Internal",
        badgeColor: "teal",
        targetUsers: ["Phòng CTCT & QLSV", "Khoa", "Hội đồng"],
        environment: "Internal LAN"
    },
    {
        id: "admin",
        name: "MFE-ADMIN",
        description: "Dành cho Super Admin. Thiết lập khung điểm, danh mục, tham số hệ thống.",
        icon: <IconShieldCheckered size={28} stroke={1.5} />,
        href: "/auth/admin",
        badge: "Admin Only",
        badgeColor: "red",
        targetUsers: ["Super Admin"],
        environment: "Internal LAN"
    }
];

export default function LoginSelectPage() {
    const router = useRouter();

    return (
        <Box
            style={{
                position: "fixed",
                inset: 0,
                background: "linear-gradient(135deg, #0f2744 0%, #1c3d6e 50%, #0f2744 100%)",
                overflow: "hidden"
            }}
        >
            {/* Decorative circles */}
            <Box
                style={{
                    position: "absolute",
                    top: "-15%",
                    left: "-10%",
                    width: "50vw",
                    height: "50vw",
                    maxWidth: rem(500),
                    maxHeight: rem(500),
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    filter: "blur(2px)",
                    pointerEvents: "none"
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    right: "-10%",
                    width: "60vw",
                    height: "60vw",
                    maxWidth: rem(600),
                    maxHeight: rem(600),
                    borderRadius: "50%",
                    background: "rgba(100, 160, 255, 0.06)",
                    pointerEvents: "none"
                }}
            />

            {/* Main content */}
            <Flex
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}
                direction="column"
                align="center"
                justify="center"
                py="lg"
                px="sm"
            >
                {/* Header */}
                <Stack gap={4} align="center" mb={{ base: "md", sm: "lg" }}>
                    <Flex
                        align="center"
                        gap="xs"
                        px="md"
                        py="sm"
                        style={{
                            borderRadius: rem(12),
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(12px)"
                        }}
                    >
                        <IconShieldCheckered size={28} color="white" stroke={1.5} />
                        <Title order={2} c="white" fw={800} style={{ letterSpacing: "-0.02em" }}>
                            SAE Platform
                        </Title>
                    </Flex>
                    <Text c="white" size="sm" ta="center" px="sm">
                        Chọn phân hệ để đăng nhập
                    </Text>
                    <Text c="rgba(255,255,255,0.7)" size="xs" ta="center" px="sm">
                        1 Backend IAM — 3 Giao diện nghiệp vụ
                    </Text>
                </Stack>

                {/* Subsystem Cards */}
                <Box
                    style={{
                        width: "100%",
                        maxWidth: rem(1000),
                        paddingLeft: rem(8),
                        paddingRight: rem(8)
                    }}
                >
                    <Grid gutter="md">
                        {subsystems.map((subsystem) => (
                            <Grid.Col key={subsystem.id} span={{ base: 12, xs: 12, md: 4 }}>
                                <Paper
                                    radius="xl"
                                    p="lg"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.12)",
                                        backdropFilter: "blur(24px) saturate(140%)",
                                        WebkitBackdropFilter: "blur(24px) saturate(140%)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                                        cursor: "pointer",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        height: "100%"
                                    }}
                                    onClick={() => router.push(subsystem.href)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                                        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.25)";
                                        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.3)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)";
                                        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
                                    }}
                                >
                                    <Stack gap="sm" style={{ height: "100%" }}>
                                        {/* Icon & Badge */}
                                        <Group justify="space-between" align="flex-start">
                                            <Flex
                                                align="center"
                                                justify="center"
                                                w={rem(48)}
                                                h={rem(48)}
                                                style={{
                                                    borderRadius: rem(12),
                                                    background: "rgba(255, 255, 255, 0.15)",
                                                    backdropFilter: "blur(12px)",
                                                    WebkitBackdropFilter: "blur(12px)",
                                                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                                                    border: "1px solid rgba(255, 255, 255, 0.25)"
                                                }}
                                            >
                                                <Box c="white">{subsystem.icon}</Box>
                                            </Flex>
                                            {subsystem.badge && (
                                                <Text
                                                    size="xs"
                                                    fw={700}
                                                    style={{
                                                        background: subsystem.id === "public"
                                                            ? "rgba(59, 130, 246, 0.4)"
                                                            : subsystem.id === "operation"
                                                            ? "rgba(20, 184, 166, 0.4)"
                                                            : "rgba(239, 68, 68, 0.4)",
                                                        backdropFilter: "blur(8px)",
                                                        WebkitBackdropFilter: "blur(8px)",
                                                        padding: `${rem(4)} ${rem(10)}`,
                                                        borderRadius: rem(6),
                                                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                                                        color: "white",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {subsystem.badge}
                                                </Text>
                                            )}
                                        </Group>

                                        {/* Title & Description */}
                                        <Box style={{ flex: 1 }}>
                                            <Title order={4} fw={700} mb={4} c="white" style={{ letterSpacing: "-0.01em" }}>
                                                {subsystem.name}
                                            </Title>
                                            <Text size="xs" c="rgba(255,255,255,0.75)" lh={1.5} lineClamp={2}>
                                                {subsystem.description}
                                            </Text>
                                        </Box>

                                        {/* Target Users */}
                                        <Box>
                                            <Text size="xs" fw={600} c="rgba(255,255,255,0.85)" mb={4}>
                                                Đối tượng:
                                            </Text>
                                            <Flex gap={4} wrap="wrap">
                                                {subsystem.targetUsers.map((user) => (
                                                    <Text
                                                        key={user}
                                                        size="xs"
                                                        c="rgba(255,255,255,0.8)"
                                                        style={{
                                                            background: "rgba(255, 255, 255, 0.15)",
                                                            backdropFilter: "blur(8px)",
                                                            WebkitBackdropFilter: "blur(8px)",
                                                            padding: `${rem(2)} ${rem(6)}`,
                                                            borderRadius: rem(4),
                                                            border: "1px solid rgba(255, 255, 255, 0.15)"
                                                        }}
                                                    >
                                                        {user}
                                                    </Text>
                                                ))}
                                            </Flex>
                                        </Box>

                                        {/* Environment */}
                                        <Text size="xs" c="rgba(255,255,255,0.6)">
                                            Môi trường: <Text span fw={500} c="rgba(255,255,255,0.9)">{subsystem.environment}</Text>
                                        </Text>

                                        {/* CTA Button */}
                                        <Button
                                            fullWidth
                                            rightSection={<IconChevronRight size={14} />}
                                            radius="md"
                                            size="sm"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.9)",
                                                backdropFilter: "blur(10px)",
                                                WebkitBackdropFilter: "blur(10px)",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                color: "#0f2744",
                                                fontWeight: 600,
                                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)"
                                            }}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Box>

                {/* Footer note */}
                <Stack gap={4} align="center" mt={{ base: "md", sm: "lg" }} pb="md">
                    <Group gap={4}>
                        <IconAlertTriangle size={12} color="rgba(255,255,255,0.4)" />
                        <Text size="xs" c="rgba(255,255,255,0.4)">
                            Bạn cần có tài khoản được cấp phát bởi Trường để đăng nhập.
                        </Text>
                    </Group>
                    <Text size="xs" c="rgba(255,255,255,0.3)">
                        Hệ thống IAM — SAE SaaS Multi-tenant Platform
                    </Text>
                </Stack>
            </Flex>
        </Box>
    );
}
