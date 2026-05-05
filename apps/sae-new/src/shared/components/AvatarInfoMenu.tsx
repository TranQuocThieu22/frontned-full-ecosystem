"use client";

import { CustomSwitchTheme } from "@aq-fe/core-ui/shared/components/button/CustomSwitchTheme";
import { Avatar, Box, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { APP_CONFIG } from "../configs/appConfig";

export type AvatarUserInfo = {
    fullName: string;
    email: string;
};

const FALLBACK_USER: AvatarUserInfo = {
    fullName: "Người dùng",
    email: "user@sae.local",
};

export function readUserInfoFromStorage(): AvatarUserInfo {
    const parseStoredJson = (raw: string | null): Record<string, unknown> | null => {
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw) as unknown;
            if (parsed && typeof parsed === "object") return parsed as Record<string, unknown>;
        } catch {
            return null;
        }
        return null;
    };

    const session =
        parseStoredJson(localStorage.getItem("authenticate")) ??
        parseStoredJson(sessionStorage.getItem("authenticate"));

    const fullName =
        (typeof session?.fullName === "string" && session.fullName.trim()) ||
        (typeof session?.name === "string" && session.name.trim()) ||
        FALLBACK_USER.fullName;

    const email =
        (typeof session?.email === "string" && session.email.trim()) ||
        (typeof session?.username === "string" && session.username.trim()) ||
        (typeof session?.code === "string" && session.code.trim()) ||
        FALLBACK_USER.email;

    return { fullName, email };
}

export interface AvatarInfoMenuProps {
    /** Width của dropdown menu (px). Mặc định 220. */
    menuWidth?: number;
}

export function AvatarInfoMenu({ menuWidth = 220 }: AvatarInfoMenuProps) {
    const [user, setUser] = useState<AvatarUserInfo>(FALLBACK_USER);
    const pathname = usePathname();

    const handleLogout = () => {
        const authKeys = [
            "token",
            "accessToken",
            "refreshToken",
            "idToken",
            "sae_iam_refresh_token",
            "authenticate",
        ];

        authKeys.forEach((key) => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });

        // Determine subsystem based on current path
        let subsystem = "admin";
        if (pathname.includes("/operation")) {
            subsystem = "operation";
        } else if (pathname.includes("/public")) {
            subsystem = "public";
        }

        window.location.href = `${APP_CONFIG.alias}/auth/${subsystem}`;
    };

    useEffect(() => {
        setUser(readUserInfoFromStorage());
    }, []);

    return (
        <Menu shadow="sm" width={menuWidth} position="bottom-end" radius="md">
            <Menu.Target>
                <UnstyledButton
                    type="button"
                    aria-label="User menu"
                    style={{
                        borderRadius: rem(6),
                        padding: `${rem(4)} ${rem(8)}`,
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    <Group gap={rem(8)} wrap="nowrap" align="center">
                        <Avatar
                            size={28}
                            radius="xl"
                            color="blue"
                            style={{
                                border: "1.5px solid var(--mantine-color-gray-3)",
                                flexShrink: 0,
                            }}
                        >
                            <IconUser size={14} />
                        </Avatar>
                        <Text
                            size="sm"
                            fw={500}
                            lineClamp={1}
                            style={{
                                lineHeight: 1.2,
                                color: "var(--mantine-color-dark)",
                                maxWidth: rem(140),
                            }}
                        >
                            {user.fullName}
                        </Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                {/* User info */}
                <Box px="xs" py={rem(10)}>
                    <Text size="sm" fw={600} lineClamp={2} style={{ lineHeight: 1.3 }}>
                        {user.fullName}
                    </Text>
                    <Text size="xs" c="dimmed" lineClamp={1} mt={2}>
                        {user.email}
                    </Text>
                </Box>

                <Menu.Divider />

                {/* Theme toggle */}
                <Menu.Item
                    component="div"
                    closeMenuOnClick={false}
                    style={{ cursor: "default", padding: `${rem(6)} ${rem(10)}` }}
                >
                    <Group justify="space-between" wrap="nowrap">
                        <Text size="sm" c="dimmed">
                            Giao diện
                        </Text>
                        <CustomSwitchTheme />
                    </Group>
                </Menu.Item>

                <Menu.Divider />

                {/* Logout */}
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                    style={{ padding: `${rem(6)} ${rem(10)}` }}
                >
                    <Text size="sm">Đăng xuất</Text>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
