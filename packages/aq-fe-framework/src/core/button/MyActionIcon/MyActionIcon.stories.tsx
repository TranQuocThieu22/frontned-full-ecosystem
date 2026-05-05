import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyActionIcon } from "./MyActionIcon";

const meta: Meta<typeof MyActionIcon> = {
    component: MyActionIcon,
};
export default meta;
type Story = StoryObj<typeof MyActionIcon>;

export const Default: Story = {
    args: {
        actionType: "update",
        isCheckPermission: true,
        loading: false,
        toolTipProps: {
            label: "Cập nhật đè lên mặc định(Tool tip)"
        }
    },
};


export const Update: Story = {
    args: {
        actionType: "update",
    },
};
