import { ActionIcon, Menu } from '@mantine/core';
import {
    IconMessageCircleCog,
    IconMessageCircleX
} from '@tabler/icons-react';
import { ChatBotStore_ResetSession } from '../stores/ChatBotStore';

export default function ToolsMenuButton() {
    return (
        <Menu shadow="md" width={210} position="top-start">
            <Menu.Target>
                <ActionIcon variant="transparent">
                    <IconMessageCircleCog style={{ width: "3.5rem", height: "3.5rem" }} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Công cụ</Menu.Label>
                <Menu.Item
                    leftSection={<IconMessageCircleX size={14} />}
                    onClick={ChatBotStore_ResetSession}>
                    Xoá lịch sử trò chuyện
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}