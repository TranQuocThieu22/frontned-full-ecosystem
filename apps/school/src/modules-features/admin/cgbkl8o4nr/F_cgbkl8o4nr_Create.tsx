'use client';

import { MyButtonCreate, MyDateInput, MyNumberInput, MySelect, MyTextArea, MyTextInput, } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface I_cgbkl8o4nr_Create {
    maSuKien: string;
    tenSuKien: string;
    ngayToChuc?: Date;
    gioBatDau: string;
    thoiGian: string;
    soLuongDuKien?: number;
    ngayBatDauDangKy?: Date;
    ngayKetThucDangKy?: Date;
    trangThai: string;
    lePhi?: number;
    ghiChu: string;
}


export default function F_cgbkl8o4nr_Create() {
    const disclosure = useDisclosure();

    const form = useForm<I_cgbkl8o4nr_Create>({
        initialValues: {
            maSuKien: "",
            tenSuKien: "",
            ngayToChuc: undefined,
            gioBatDau: "",
            thoiGian: "",
            soLuongDuKien: undefined,
            ngayBatDauDangKy: undefined,
            ngayKetThucDangKy: undefined,
            trangThai: "",
            lePhi: undefined,
            ghiChu: "",
        },
        validate: {
            maSuKien: (value) => value ? null : 'Không được để trống',
            tenSuKien: (value) => value ? null : 'Không được để trống',
            ngayKetThucDangKy: (_, values) => {
                if (!values.ngayBatDauDangKy || !values.ngayKetThucDangKy) return null;
                if (new Date(values.ngayKetThucDangKy) < new Date(values.ngayBatDauDangKy)) {
                    return "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu";
                }
                return null;
            },
        }
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                modalSize="40%"
                disclosure={disclosure}
                crudType='create'
                title={"Chi tiết sự kiện"}
                onSubmit={() => { }}
            >
                <MyTextInput label="Mã sự kiện" {...form.getInputProps("maSuKien")} required />
                <MyTextInput label="Tên sự kiện" {...form.getInputProps("tenSuKien")} required />
                <MyDateInput label="Ngày tổ chức" {...form.getInputProps("ngayToChuc")} />
                <MyTextInput label="Giờ bắt đầu" {...form.getInputProps("gioBatDau")} />
                <MyTextInput label="Thời gian" {...form.getInputProps("thoiGian")} />
                <MyDateInput label="Ngày bắt đầu đăng ký" {...form.getInputProps("ngayBatDauDangKy")} />
                <MyDateInput label="Ngày kết thúc đăng ký" {...form.getInputProps("ngayKetThucDangKy")} />
                <MySelect data={["Sắp diễn ra", "Đã hoàn thành", "Đã hủy"]} label="Trạng thái" {...form.getInputProps("trangThai")} />
                <MyNumberInput min={0} label="Số lượng dự kiến" {...form.getInputProps("soLuongDuKien")} hideControls />
                <MyNumberInput min={0} label="Lệ phí" {...form.getInputProps("lePhi")} hideControls />
                <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
            </MyButtonCreate>
        </>
    );
}