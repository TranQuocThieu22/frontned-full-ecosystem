'use client';

import { MyActionIconUpdate, MyDateInput, MyNumberInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { I_F_cgbkl8o4nr_Read } from "./F_cgbkl8o4nr_Read";


export default function F_cgbkl8o4nr_Update({ data }: { data: I_F_cgbkl8o4nr_Read }) {
    const modalName = "Chi tiết sự kiện";

    const form = useForm<I_F_cgbkl8o4nr_Read>({
        initialValues: {
            id: data.id,
            maSuKien: data.maSuKien,
            tenSuKien: data.tenSuKien,
            ngayToChuc: data.ngayToChuc,
            gioBatDau: data.gioBatDau,
            thoiGian: data.thoiGian,
            soLuongDuKien: data.soLuongDuKien,
            ngayBatDauDangKy: data.ngayBatDauDangKy,
            ngayKetThucDangKy: data.ngayKetThucDangKy,
            trangThai: data.trangThai,
            lePhi: data.lePhi,
            ghiChu: data.ghiChu
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
        <MyActionIconUpdate
            modalSize="40%"
            crudType='update'
            title={modalName}
            form={form}
            onSubmit={() => { }}
        >
            <MyTextInput label="Mã sự kiện" {...form.getInputProps("maSuKien")} required disabled />
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
        </MyActionIconUpdate>
    )
}
