// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_Update.tsx
'use client';

import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextInput } from "aq-fe-framework/components";
import MyTextArea from "../../../components/Inputs/TextArea/MyTextArea";
import { F_lpoa7imbik_Read } from "./F_lpoa7imbik_Read";

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

interface I_lpoa7imbik_Update extends F_lpoa7imbik_Read {
    ghiChu: string;
}

export default function F_lpoa7imbik_Update({ data }: { data: F_lpoa7imbik_Read }) {
    const modalName = "Chi tiết tuyến xe";

    const form = useForm<I_lpoa7imbik_Update>({
        initialValues: {
            ...data,
            ghiChu: ""
        },
        validate: {
            maTuyenXe: (value) => value ? null : 'Không được để trống',
            tenTuyenXe: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <MyActionIconUpdate
            crudType='update'
            title={modalName}
            form={form}
            onSubmit={() => { }}
        >
            <MyTextInput label="Mã tuyến " {...form.getInputProps("maTuyenXe")} disabled />
            <MyTextInput label="Tên tuyến " {...form.getInputProps("tenTuyenXe")} />
            <MySelect
                data={trangThaiSelectData}
                label="Trạng thái"
                {...form.getInputProps("trangThai")}
            />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    );
}