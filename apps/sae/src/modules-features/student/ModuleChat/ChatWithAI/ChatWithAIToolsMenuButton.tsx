import { ActionIcon, Menu } from '@mantine/core';
import {
    IconMessageChatbot,
    IconMessageCircleCog
} from '@tabler/icons-react';
import { ChatBotStore_ResetSession } from './stores/ChatBotStore';

export default function ChatWithAIToolsMenuButton() {
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
                    leftSection={<IconMessageChatbot size={14} />}
                    onClick={ChatBotStore_ResetSession}>
                    Bắt đầu đoạn chat mới
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}