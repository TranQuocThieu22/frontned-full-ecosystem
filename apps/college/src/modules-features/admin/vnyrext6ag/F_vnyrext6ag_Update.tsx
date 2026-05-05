'use client';
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

export interface I_vnyrext6ag {
    id?: number;
    monHoc: string;
    hinhThucThi: string;
    soChiTiet: number;
    tinhChatPhong: string;
}

interface I_vnyrext6ag_Send {
    id?: number;
    maMonHoc?: string;
    tenMonHoc?: string;
    maHinhThucThi?: string;
    tenHinhThucThi?: string;
    soChiTiet?: string;
    tinhChatPhong?: string;
}

const dataMonHoc = [
    { value: "MH001", label: "Toán cao cấp" },
    { value: "MH002", label: "Lập trình C++" },
    { value: "MH003", label: "Xác suất thống kê" },
];

const dataHinhThucThi = [
    { value: "HT001", label: "Thi viết" },
    { value: "HT002", label: "Thi thực hành" },
];

const dataTinhChatPhong = [
    { value: "Phòng tiêu chuẩn", label: "Phòng tiêu chuẩn" },
    { value: "Phòng máy tính", label: "Phòng máy tính" },
];

export default function F_vnyrext6ag_Update({ data }: { data: I_vnyrext6ag_Send }) {
    const form = useForm<I_vnyrext6ag>({
        initialValues: {
            monHoc: data?.maMonHoc || "",
            hinhThucThi: data?.maHinhThucThi || "",
            soChiTiet: data?.soChiTiet ? Number(data.soChiTiet) : 2,
            tinhChatPhong: data?.tinhChatPhong || "",
        },
        validate: {},
    });

    return (
        <MyActionIconUpdate title="Tính chất thi môn học" form={form} onSubmit={() => { }}>
            <MySelect label='Môn học' defaultValue={dataMonHoc[0]} data={dataMonHoc} {...form.getInputProps("monHoc")} />
            <MySelect label='Hình thức thi' defaultValue={dataHinhThucThi[0]} data={dataHinhThucThi} {...form.getInputProps("hinhThucThi")} />
            <MyTextInput label='Số tiết thi'  {...form.getInputProps("soChiTiet")} />
            <MySelect label='Tính chất phòng' defaultValue={dataTinhChatPhong[0]} data={dataTinhChatPhong} {...form.getInputProps("tinhChatPhong")} />
        </MyActionIconUpdate>
    );
}