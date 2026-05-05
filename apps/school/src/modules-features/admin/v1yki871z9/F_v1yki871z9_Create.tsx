'use client';

import { MyButtonCreate, MySelect, MyTextInput, } from "aq-fe-framework/components";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { utils_converter_enumToSelectOptions } from "@/utils/converter";
import { chuKyLapLaiSelectData, loaiDoiTuongSelectData, loaiNghiepVuSelectData } from "./F_v1yki871z9_Read";

interface I_v1yki871z9_Create {
    maBoDem: string; // mã bộ đếm
    tenBoDem: string; // tên bộ đếm
    loaiNghiepVu: string; // loại nghiệp vụ
    loaiDoiTuong: string; // loại đối tượng
    chuKyLapLai: string; // Chu kỳ lập lại
    tienTo: string; // Tiền tố
    hauTo: string; // Hậu tố
    chieuDai: string; // Chiều dài
    coDungSo0: boolean; // Có dùng số 0
}

export default function F_v1yki871z9_Create() {
    const disclosure = useDisclosure();

    const form = useForm<I_v1yki871z9_Create>({
        initialValues: {
            maBoDem: "",
            tenBoDem: "",
            loaiNghiepVu: "1",
            loaiDoiTuong: "Toàn đơn vị",
            chuKyLapLai: "Không lặp lại",
            tienTo: "",
            hauTo: "",
            chieuDai: "",
            coDungSo0: false,
        },
        validate: {
            maBoDem: (value) => value ? null : 'Không được để trống',
            tenBoDem: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <>
            <MyButtonCreate
                form={form}
                disclosure={disclosure}
                crudType='create'
                title={"Chi tiết bộ đếm"}
                onSubmit={() => { }}
            >
                <MyTextInput label="Mã bộ đếm" {...form.getInputProps("maBoDem")} />
                <MyTextInput label="Tên bộ đếm" {...form.getInputProps("tenBoDem")} />
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
                <Checkbox label="Có dùng số 0" {...form.getInputProps("coDungSo0", { type: 'checkbox' })} />
            </MyButtonCreate>
        </>
    );
}
