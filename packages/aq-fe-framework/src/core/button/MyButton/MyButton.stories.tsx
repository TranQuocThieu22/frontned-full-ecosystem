import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyButton } from "./MyButton";
const meta = {
    component: MyButton,
} satisfies Meta<typeof MyButton>;;

export default meta;

type Story = StoryObj<typeof MyButton>;

export const Default: Story = {
    args: {
        actionType: "default",
        children: undefined,
        isCheckPermission: true,
        loading: false,
    },
};