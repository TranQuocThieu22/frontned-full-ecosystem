// MyButtonCreateUpdate.stories.tsx
import { MyTextInput } from "@/components";
import { useForm } from "@mantine/form";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyButtonCreateUpdate } from "./MyButtonCreateUpdate";

const meta = {
    component: MyButtonCreateUpdate,

} satisfies Meta<typeof MyButtonCreateUpdate>;

export default meta;

type Story = StoryObj<typeof MyButtonCreateUpdate>;

interface I {
    name?: string,
    code?: string
}
export const Default: Story = {
    render: (args) => {
        const form = useForm<I>({
            initialValues: { name: "", code: "" },
        });
        return (
            <MyButtonCreateUpdate
                form={form}
                onSubmit={() => { return false }}
            >
                <MyTextInput label="Nhập mã của bro" {...form.getInputProps("code")} />
                <MyTextInput label="Nhập tên bro" {...form.getInputProps("name")} />
            </MyButtonCreateUpdate>
        );
    },
    args: {
        modalProps: {
            title: "Tạo người dùng mới",
            size: "70vw"
        },
        onSubmit: (values) => {
            alert("Thông tin của bro: " + JSON.stringify(values))
        }
    }
};
