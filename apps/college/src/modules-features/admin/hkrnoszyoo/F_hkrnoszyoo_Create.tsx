'use client';

import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";



export interface I_hkrnoszyoo_Read {
    id?: number;
    code?: string;
    name?: string;
    khoa?: number;
    note?: string;
}

export default function F_hkrnoszyoo_Create() {
    const disc = useDisclosure(false)

    const form = useForm<I_hkrnoszyoo_Read>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"80%"}
            disclosure={disc}
            title="Chi tiết Danh mục lớp"
            onSubmit={() => {
            }}
        >
            <MyTextInput label="Mã lớp:" defaultValue={form.values.code} />

            <MyTextInput label="Tên lớp:" defaultValue={form.values.name} />

            <Select
                w={"100%"}
                label="Chương trình:"
                data={[
                    { value: "1", label: "IT2041" },
                    { value: "2", label: "IT2042" },
                ]}
                value={1?.toString()}
                onChange={(value) => form.setFieldValue('chuongTrinh', Number(value))}
            />



            <MyTextArea label="Ghi chú:" value={form.values.note} />

            <Button
                leftSection={<IconPlus />}
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}
            >
                Lưu
            </Button>

        </MyButtonModal>
    );
}


