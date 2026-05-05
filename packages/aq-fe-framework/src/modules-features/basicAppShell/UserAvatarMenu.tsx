import { useStore_Authenticate } from "@/modules-features";
import { Avatar, Divider, Group, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { KeyRound } from "lucide-react";
import User_ForgotPasswordModal from "./ForgotPassword/User_ForgotPasswordModal";

export function UserAvatarMenu() {
    const disc = useDisclosure();
    const authenticateStore = useStore_Authenticate();

    const fullName = authenticateStore.state.fullName || null;
    const code = authenticateStore.state.code || null;

    // Fallback cho avatar chữ cái
    const avatarLabel =
        fullName?.[0]?.toUpperCase() || code?.[0]?.toUpperCase() || "U";




    return (
        <>
            <Menu shadow="md" width={240} position="bottom-end" offset={8}>
                <Menu.Target>
                    <Avatar
                        radius="xl"
                        color="green"
                        style={{
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                    >
                        {avatarLabel}
                    </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>
                        <Group gap="xs">
                            <Avatar size="sm" radius="xl" color="green">
                                {avatarLabel}
                            </Avatar>
                            <div>
                                <Text fw={500} size="sm">
                                    {fullName}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Tài khoản: {code}
                                </Text>
                            </div>
                        </Group>
                    </Menu.Label>

                    <Divider my="xs" />

                    <Menu.Item
                        leftSection={<KeyRound size={16} />}
                        onClick={disc[1].open}
                    >
                        Đổi mật khẩu
                    </Menu.Item>

                </Menu.Dropdown>
            </Menu>

            <User_ForgotPasswordModal disc={disc} />
        </>
    );
}
