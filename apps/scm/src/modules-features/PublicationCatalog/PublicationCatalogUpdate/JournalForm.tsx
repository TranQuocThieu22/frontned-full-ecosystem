import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect, MyTextInput } from "aq-fe-framework/components";

interface IJournalForm {
    journal: string;
    issn: string;
    indexDb: string;
    impactFactor: string;
}

const journalOptions = [
    { value: 'IEEE Transactions on Evolutionary Computation', label: 'IEEE Transactions on Evolutionary Computation' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Science', label: 'Science' },
    { value: 'Springer', label: 'Springer' },
    { value: 'Elsevier', label: 'Elsevier' },
];

const mockData: IJournalForm = {
    journal: '',
    issn: '0162-8828 (ISSN)',
    indexDb: 'Q1 (CS)',
    impactFactor: 'SJR',
};

export default function JournalForm() {
    const form = useForm<IJournalForm>({
        initialValues: mockData
    });

    return (
        <form onSubmit={form.onSubmit(() => { })}>
            <Stack gap="md">
                <MySelect
                    label="Tạp chí/ Nhà xuất bản"
                    data={journalOptions}
                    placeholder="Chọn tạp chí/nhà xuất bản"
                    {...form.getInputProps('journal')}
                />
                <MyTextInput label="ISSN/ISBN" {...form.getInputProps('issn')} />
                <MyTextInput label="Cơ sở dữ liệu chỉ mục" {...form.getInputProps('indexDb')} />
                <MyTextInput label="Chỉ số tác động (Impact Factor)" {...form.getInputProps('impactFactor')} />
            </Stack>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Lưu</Button>
            </Group>
        </form>
    );
} 