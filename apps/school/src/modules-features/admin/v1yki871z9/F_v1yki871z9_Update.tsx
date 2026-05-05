'use client';

import { MyActionIconUpdate, MySelect, MyTextInput } from "aq-fe-framework/components";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { chuKyLapLaiSelectData, F_v1yki871z9_Read, loaiDoiTuongSelectData, loaiNghiepVuSelectData } from "./F_v1yki871z9_Read";
import { utils_converter_enumToSelectOptions } from "@/utils/converter";

export default function F_v1yki871z9_Update({ data }: { data: F_v1yki871z9_Read }) {
    const modalName = "Chi tiết bộ đếm";

    const form = useForm<F_v1yki871z9_Read>({
        initialValues: {
            id: data.id,
            maBoDem: data.maBoDem,
            tenBoDem: data.tenBoDem,
            loaiNghiepVu: data.loaiNghiepVu,
            loaiDoiTuong: data.loaiDoiTuong,
            chuKyLapLai: data.chuKyLapLai,
            tienTo: data.tienTo,
            hauTo: data.hauTo,
            chieuDai: data.chieuDai,
            coDungSo0: data.coDungSo0
        },
        validate: {
            maBoDem: (value) => value ? null : 'Không được để trống',
            tenBoDem: (value) => value ? null : 'Không được để trống',
            tienTo: (value) => value ? null : 'Không được để trống',
            hauTo: (value) => value ? null : 'Không được để trống',
            chieuDai: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <MyActionIconUpdate
            crudType='update'
            title={modalName}
            form={form}
            onSubmit={() => { }}
        >
            <MyTextInput label="Tên bộ đếm" {...form.getInputProps("tenBoDem")} />
            <MyTextInput label="Mã bộ đếm" {...form.getInputProps("maBoDem")} />
            <MySelect
                data={utils_converter_enumToSelectOptions(loaiNghiepVuSelectData)}
                label="Loại nghiệp vụ"
                {...form.getInputProps("loaiNghiepVu")} />
            <MySelect
                data={loaiDoiTuongSelectData}
                label="Loại đối tượng"
                {...form.getInputProps("loaiDoiTuong")} />
            <MySelect data={chuKyLapLaiSelectData}
                label="Chu kỳ lập lại"
                {...form.getInputProps("chuKyLapLai")} />
            <MyTextInput label="Tiền tố" {...form.getInputProps("tienTo")} />
            <MyTextInput label="Hậu tố" {...form.getInputProps("hauTo")} />
            <MyTextInput label="Chiều dài" {...form.getInputProps("chieuDai")} />
            <Checkbox label="Có dùng số 0" defaultChecked={form.values.coDungSo0} {...form.getInputProps("coDungSo0")} />
        </MyActionIconUpdate>
    )
}