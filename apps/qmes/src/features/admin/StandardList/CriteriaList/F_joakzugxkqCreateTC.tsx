'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { Select } from '@mantine/core';
import { useForm } from "@mantine/form";

interface I {
    maTieuChuan?: string;
    maTieuChi?: string;
    tenTieuChi?: string;
    tenTieuChiEg?: string;
    ghiChu?: string;
    documentType?: number
}

interface ICreateUserViewModel {
    id?: number;
    maTieuChuan?: string;
    tenTieuChuan?: string;
    tenTieuChuanEg?: string;
    ghiChu?: string;
    thaoTac?: string;
}

export default function F_joakzugxkqCreateTC(
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            tenTieuChi: "",
            tenTieuChiEg: "",
            maTieuChi: ""
        },
        validate: {
            tenTieuChi: (value) => value ? null : 'Không được để trống',
            tenTieuChiEg: (value) => value ? null : 'Không được để trống'

        }
    })
    return (
        <MyButtonCreate objectName="Danh sách tiêu chí" form={form} onSubmit={(values) => baseAxios.post("/DocumentAttribute/Create", values)}>
            <Select label="Tiêu chuẩn" {...form.getInputProps("maTieuChuan")} defaultValue={`${mockData1[0]?.maTieuChuan}-${mockData1[0]?.tenTieuChuan}`} data={mockData1.map(item => ({
                label: `${item.maTieuChuan}-${item.tenTieuChuan}`, value: `${item.maTieuChuan}-${item.tenTieuChuan}`
            }))}
            />
            <MyTextInput label="Mã tiêu chí" {...form.getInputProps("maTieuChi")} />
            <MyTextInput label="Tên tiêu chí " {...form.getInputProps("tenTieuChi")} />
            <MyTextInput label="Tên tiêu chí Eg" {...form.getInputProps("tenTieuChiEg")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    )
}


const mockData1: ICreateUserViewModel[] = [
    {
        id: 1,
        maTieuChuan: "TC01",
        tenTieuChuan: "Tổ chức và quản trị",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 2,
        maTieuChuan: "TC02",
        tenTieuChuan: "Giảng viên",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 3,
        maTieuChuan: "TC03",
        tenTieuChuan: "Cơ sở vật chất",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 4,
        maTieuChuan: "TC04",
        tenTieuChuan: "Tài chính",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 5,
        maTieuChuan: "TC05",
        tenTieuChuan: "Tuyển sinh và đào tạo",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 6,
        maTieuChuan: "TC06",
        tenTieuChuan: "Nghiên cứu và đổi mới sáng tạo",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    },
    {
        id: 7,
        maTieuChuan: "TC07",
        tenTieuChuan: "Phục vụ khảo sát người học",
        tenTieuChuanEg: "",
        ghiChu: "",
        thaoTac: "Sửa/ Xóa"
    }
];