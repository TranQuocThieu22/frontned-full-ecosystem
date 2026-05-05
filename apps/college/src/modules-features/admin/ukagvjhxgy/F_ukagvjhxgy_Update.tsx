
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Select, SimpleGrid } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export interface I_ukagvjhxgy_Read {
    id?: number;
    courseCode?: string; // Course code
    courseName?: string; // Course name
    chuongTrinh?: number; // Course name
    bacHe?: number; // Course name
    NHHKVao?: string; // Course name
    NHHKRa?: string; // Course name
    nienKhoa?: string; // Course name
    ngonNguDaoTao?: number; // Course name
    chiNhanh?: number; // Course name
    note?: string; // Course name
}

export default function F_ukagvjhxgy_Update(
    { values }: { values: I_ukagvjhxgy_Read }
) {
    const disc = useDisclosure(false)
    const form = useForm<I_ukagvjhxgy_Read>({
        initialValues: {
            ...values
        },
    })

    return (
        <MyActionIconUpdate modalSize={"80%"} form={form}
            onSubmit={() => {
            }}
        >
            <MyTextInput disabled label="Mã khóa:" defaultValue={form.values.courseCode} />

            <MyTextInput label="Tên khóa:" defaultValue={form.values.courseName} />

            <Select
                w={"100%"}
                label="Chương trình:"
                data={[
                    { value: "1", label: "Công nghệ thông tin" },
                    { value: "2", label: "Ngoại ngữ" },
                ]}
                value={1?.toString()}
                onChange={(value) => form.setFieldValue('chuongTrinh', Number(value))}
            />

            <Select
                w={"100%"}
                label="Bậc hệ:"
                data={[
                    { value: "1", label: "Đại học" },
                    { value: "2", label: "Cao đẳng" },
                ]}
                value={1?.toString()}
                onChange={(value) => form.setFieldValue('bacHe', Number(value))}
            />
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyTextInput label="Năm học - Học kỳ vào:" defaultValue={form.values.NHHKVao} />
                <MyTextInput label="Năm học - Học kỳ ra:" defaultValue={form.values.NHHKRa} />
            </SimpleGrid>
            <MyTextInput label="Niên khóa:" defaultValue={form.values.nienKhoa} />

            <Select
                w={"100%"}
                label="Ngôn ngữ đào tạo:"
                data={[
                    { value: "1", label: "Tiếng Việt" },
                    { value: "2", label: "Tiếng Anh" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("loaITaoChungChi", parseInt(value?.toString()!))}
            />

            <Select
                w={"100%"}
                label="Chi nhánh:"
                data={[
                    { value: "1", label: "Thủ Đức" },
                    { value: "2", label: "Quận 1" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("loaITaoChungChi", parseInt(value?.toString()!))}
            />

            <MyTextArea label="Ghi chú:" value={form.values.note} />


        </MyActionIconUpdate>
    );
}

