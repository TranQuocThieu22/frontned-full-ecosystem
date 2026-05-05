import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";

interface IBookInfoForm {
    totalPages: string;
    edition: string;
}

const mockData: IBookInfoForm = {
    totalPages: '350',
    edition: 'Lần 1',
};

export default function BookInfoForm() {
    const form = useForm<IBookInfoForm>({
        initialValues: mockData
    });

    return (
        <form onSubmit={form.onSubmit(() => { })}>
            <Stack gap="md">
                <MyTextInput label="Tổng số trang" {...form.getInputProps('totalPages')} />
                <MyTextInput label="Phiên bản/ Lần xuất bản" {...form.getInputProps('edition')} />
            </Stack>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Lưu</Button>
            </Group>
        </form>
    );
} 