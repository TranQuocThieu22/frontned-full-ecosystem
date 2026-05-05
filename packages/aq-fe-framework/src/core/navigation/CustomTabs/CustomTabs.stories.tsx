import { Button } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconReceipt } from "@tabler/icons-react";
import { CustomTabs } from "./CustomTabs";
const meta = {
    component: CustomTabs,
    parameters: {
        layout: "padded"
    }
} satisfies Meta<typeof CustomTabs>;;

export default meta;

type Story = StoryObj<typeof CustomTabs>;

export const Default: Story = {
    args: {
        defaultValue: "Tab 1",
        tabs: [
            {
                label: "Tab 1",
                children: <Button>Content tab 1</Button>,
                leftSection: <IconReceipt />
            },
            {
                label: "Tab 2",
                children: <Button>Content tab 2</Button>
            },
            {
                label: "Tab 3",
                children: <Button>Content tab 3</Button>,
            }
        ]
    },
};