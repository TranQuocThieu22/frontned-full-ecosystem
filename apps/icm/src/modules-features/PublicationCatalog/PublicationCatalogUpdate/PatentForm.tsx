import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";

interface IPatentForm {
    patentNumber: string;
    patentDate: Date | null;
    patentAgency: string;
    patentScope: string;
}

const mockData: IPatentForm = {
    patentNumber: 'VN.2023.00123',
    patentDate: null,
    patentAgency: 'Cục Sở hữu Trí tuệ Việt Nam',
    patentScope: 'Quốc tế (US)',
}

export default function PatentForm() {
    const form = useForm<IPatentForm>({
        initialValues: mockData
    });

    return (
        <form onSubmit={form.onSubmit(() => { })}>
            <Stack gap={"md"}>
                <MyTextInput label="Số bằng độc quyền" {...form.getInputProps('patentNumber')} />
                <MyDateInput
                    label="Ngày cấp bằng"
                    valueFormat="DD/MM/YYYY"
                    {...form.getInputProps('patentDate')}
                />
                <MyTextInput label="Đơn vị cấp bằng" {...form.getInputProps('patentAgency')} />
                <MyTextInput label="Phạm vi bảo hộ" {...form.getInputProps('patentScope')} />
            </Stack>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Lưu</Button>
            </Group>

        </form>
    );
} 