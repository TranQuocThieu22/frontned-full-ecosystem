import { useDisclosure } from "@mantine/hooks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyButtonModal } from "./MyButtonModal";

const meta = {
    component: MyButtonModal,
} satisfies Meta<typeof MyButtonModal>;

export default meta;

type Story = StoryObj<typeof MyButtonModal>;

export const Default: Story = {
    render: (args) => {
        const disclosure = useDisclosure(); // hook phải dùng trong function component
        return <MyButtonModal {...args} disclosure={disclosure} />;
    },
    args: {
        isActionIcon: true,
        actionIconProps: {
            actionType: "validate",
            toolTipProps: {
                label: "My tooltip"
            }
        },
        modalProps: {
            title: "Title bro",
            size: "70vw"
        }
    },
};
