import baseAxios from "@/api/config/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { useForm } from "@mantine/form";

interface ICreate {
    id?: number;
    code?: string;
    name?: string;
    loaiNghiepVu?: string;
    loaiDoiTuong?: string;
    chuKyLapLai?: string;
    tienTo?: string;
    hauto?: string;
    chieuDai?: string;
    0?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

enum ENUM_BUSINESS_TYPE {
    "Danh sách học viên" = 1,
    "Danh sách phiếu thu" = 2,
}

enum ENUM_OBJECT_TYPE {
    "Toàn đơn vị" = 1,
    "Toàn bộ phòng" = 2,
}

enum ENUM_REPEAT_CYCLE {
    "Không lặp lại" = 1,
    "Hàng ngày" = 2,
    "Hàng tuần" = 3,
    "Hàng tháng" = 4,
    "Hàng năm" = 5,
}


export default function F_nxpspd6lwl_Create() {
    const form = useForm<ICreate>({
        initialValues: {
            code: "",
            name: "",
            loaiNghiepVu: "1",
            loaiDoiTuong: "1",
            chuKyLapLai: "1",
            tienTo: "",
            hauto: "",
            chieuDai: "",
            0: "Có",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            loaiNghiepVu: (value) => value ? null : 'Không được để trống',
            loaiDoiTuong: (value) => value ? null : 'Không được để trống',
            chuKyLapLai: (value) => value ? null : 'Không được để trống',
            tienTo: (value) => value ? null : 'Không được để trống',
            hauto: (value) => value ? null : 'Không được để trống',
            chieuDai: (value) => value ? null : 'Không được để trống',
        }
    })

    return (
        <MyButtonCreate
            objectName='bộ đếm'
            form={form}
            onSubmit={(value) => baseAxios.post("")}>
            <MyTextInput label="Mã bộ đếm" {...form.getInputProps("code")} ></MyTextInput>
            <MyTextInput label="Tên bộ đếm" {...form.getInputProps("name")} ></MyTextInput>
            <MySelect
                label="Loại nghiệp vụ"
                data={utils_converter_enumToOptions(ENUM_BUSINESS_TYPE)}
                {...form.getInputProps("loaiNghiepVu")}
            ></MySelect>
            <MySelect
                label="Loại đối tượng"
                data={utils_converter_enumToOptions(ENUM_OBJECT_TYPE)}
                {...form.getInputProps("loaiDoiTuong")}
            ></MySelect>
            <MySelect
                label="Chu kỳ lặp lại" {
                ...form.getInputProps("chuKyLapLai")}
                data={utils_converter_enumToOptions(ENUM_REPEAT_CYCLE)}
            ></MySelect>
            <MyTextInput label="Tiền tố" {...form.getInputProps("tienTo")} ></MyTextInput>
            <MyTextInput label="Hậu tố" {...form.getInputProps("hauto")} ></MyTextInput>
            <MyTextInput label="Chiều dài" {...form.getInputProps("chieuDai")} ></MyTextInput>
            <MyCheckbox label="Có dùng số 0" {...form.getInputProps("0")} ></MyCheckbox>
        </MyButtonCreate>
    );
}