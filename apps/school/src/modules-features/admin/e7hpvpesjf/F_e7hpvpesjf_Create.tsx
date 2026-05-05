'use client';

import { MyButtonCreate, MySelect, MyTextInput, MyNumberInput } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface I_e7hpvpesjf_Create {
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
}

const trangThaiSelectData = [
    {
        label: "Đang hoạt động",
        value: "Đang hoạt động",
    },
    {
        label: "Đang bảo trì",
        value: "Đang bảo trì",
    },
    {
        label: "Dừng hoạt động",
        value: "Dừng hoạt động",
    }
];

export default function F_e7hpvpesjf_Create() {
    const disclosure = useDisclosure();

    const form = useForm<I_e7hpvpesjf_Create>({
        initialValues: {
            bienSoXe: "",
            loaiXe: "",
            soGhe: 12,
            trangThai: "Đang hoạt động"
        },
        validate: {
            bienSoXe: (value) => value ? null : 'Không được để trống',
            loaiXe: (value) => value ? null : 'Không được để trống',
            soGhe: (value) => {
                if (value === undefined || value === null) return 'Không được để trống';
                if (value < 0) return 'Số chỗ phải lớn hơn hoặc bằng 0';
                return null;
            }
        }
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                disclosure={disclosure}
                crudType='create'
                title={"Thêm xe mới"}
                onSubmit={() => { }}
            >
                <MyTextInput label="Biển số xe" withAsterisk {...form.getInputProps("bienSoXe")} />
                <MyTextInput
                    label="Loại xe"
                    withAsterisk
                    {...form.getInputProps("loaiXe")}
                />
                <MyNumberInput label="Số chỗ" withAsterisk {...form.getInputProps("soGhe")} />
                <MySelect
                    data={trangThaiSelectData}
                    label="Trạng thái"
                    {...form.getInputProps("trangThai")}
                />
            </MyButtonCreate>
        </>
    );
}