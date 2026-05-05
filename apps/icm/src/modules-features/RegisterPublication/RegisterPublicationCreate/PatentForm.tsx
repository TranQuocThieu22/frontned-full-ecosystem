import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput, MyTextInput } from "aq-fe-framework/components";

interface IPatentForm {
    patentNumber: string;
    patentDate: Date | null;
    patentAgency: string;
    patentScope: string;
}


export default function PatentForm() {
    const form = useForm<IPatentForm>({
        initialValues: {
            patentNumber: '',
            patentDate: null,
            patentAgency: '',
            patentScope: '',
        }
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