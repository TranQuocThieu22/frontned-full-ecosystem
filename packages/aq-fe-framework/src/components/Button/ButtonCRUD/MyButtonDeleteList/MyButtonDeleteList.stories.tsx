import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyButtonDeleteList } from "./MyButtonDeleteList";

const meta: Meta<typeof MyButtonDeleteList> = {
    title: "component/Button/MyButtonDeleteList",
    component: MyButtonDeleteList,
};
export default meta;
type Story = StoryObj<typeof MyButtonDeleteList>;

export const Default: Story = {
    args: {

    },
};

