// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_Create.tsx
'use client';

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonCreate, MySelect, MyTextInput } from "aq-fe-framework/components";
import MyTextArea from "../../../components/Inputs/TextArea/MyTextArea";

interface I_lpoa7imbik_Create {
    maTuyenXe: string;
    tenTuyenXe: string;
    trangThai: string;
    ghiChu: string;
}

const trangThaiSelectData = [
    {
        label: "Đang hoạt động",
        value: "Đang hoạt động",
    },
    {
        label: "Dừng hoạt động",
        value: "Dừng hoạt động",
    }
];

export default function F_lpoa7imbik_Create() {
    const disclosure = useDisclosure();

    const form = useForm<I_lpoa7imbik_Create>({
        initialValues: {
            maTuyenXe: "",
            tenTuyenXe: "",
            trangThai: "Đang hoạt động",
            ghiChu: ""
        },
        validate: {
            maTuyenXe: (value) => value ? null : 'Không được để trống',
            tenTuyenXe: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                disclosure={disclosure}
                crudType='create'
                title={"Chi tiết tuyến xe"}
                onSubmit={() => { }}
            >
                <MyTextInput label="Mã tuyến " {...form.getInputProps("maTuyenXe")} />
                <MyTextInput label="Tên tuyến " {...form.getInputProps("tenTuyenXe")} />
                <MySelect
                    data={trangThaiSelectData}
                    label="Trạng thái"
                    {...form.getInputProps("trangThai")}
                />
                <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
            </MyButtonCreate>
        </>
    );
}