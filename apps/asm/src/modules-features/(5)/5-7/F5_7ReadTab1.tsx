'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Fieldset, NumberInput, Textarea, TextInput } from '@mantine/core';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { YearPickerInput } from '@mantine/dates';

interface I_F5_7ReadTab1 {
    certificateNumber?: number; // Số chứng từ
    increaseDate?: Date | null; // Ngày ghi tăng
    assetCode?: string; // Mã tài sản
    assetName?: string //Tên tài sản
    assestType?: string; // Loại tài sản
    supplier?: string; // Nhà cung cấp
    warreantyTime?: string; // Thời gian bảo hành
    unit?: string; // Đơn vị sử dụng
    manufacturer?: string; // Nhà sản xuất
    yearOfManufacture?: Date | undefined; // Năm sản xuất
    countryOfManufacture?: string; // Nước sản xuất
    status?: string; // Tình trạng
    quality?: string; // Chất lượng
    quantity?: number; // Số lượng
    warrantyCondition?: string; // Điều kiện bảo hành
}

export default function F5_7ReadTab1() {
    const formThongTin = useForm({
        initialValues: {}
    });

    return (
        <form>
            <Fieldset>
                <MyFlexColumn>
                    <MyFlexRow>
                        <div style={{ flex: "1" }}>
                            <MyTextInput label='Số chứng từ' type="number" {...formThongTin.getInputProps("certificateNumber")} />
                            <MyDateInput label='Ngày ghi tăng' {...formThongTin.getInputProps("increaseDate")} />
                            <MyTextInput label='Mã tài sản'  {...formThongTin.getInputProps("assetCode")} />
                            <MyTextInput label='Tên tài sản'  {...formThongTin.getInputProps("assetName")} />
                            <MySelect
                                label='Loại tài sản' defaultValue={"Phòng kế toán"}
                                data={[
                                    'Phòng kế toán',
                                    'Phòng đào tạo',
                                    'Phòng tin học',
                                    'Khoa CNTT',
                                    'Khoa QTKD'
                                ]} />
                            <MySelect data={['Công ty Anh Quân']} label='Nhà cung cấp' defaultValue="Công ty Anh Quân"  {...formThongTin.getInputProps("supplier")} />
                            <MyTextInput label='Thời gian bảo hành'  {...formThongTin.getInputProps("warreantyTime")} />
                        </div>
                        <div style={{ flex: "1" }}>
                            <MySelect
                                label='Loại tài sản' defaultValue={"Phòng kế toán"}
                                data={[
                                    'Phòng kế toán',
                                    'Phòng đào tạo',
                                    'Phòng tin học',
                                    'Khoa CNTT',
                                    'Khoa QTKD'
                                ]}
                                {...formThongTin.getInputProps("unit")} />
                            <MyTextInput label='Nhà sản xuất' placeholder='Nhập tên nhà sản xuất'  {...formThongTin.getInputProps("manufacturer")} />
                            <YearPickerInput clearable label='Năm sản xuất' placeholder='Chọn năm sản xuất' {...formThongTin.getInputProps("yearOfManufacture")} />
                            <TextInput label='Nước sản xuất' placeholder='Nhập tên nước sản xuất' {...formThongTin.getInputProps("countryOfManufacture")} />
                            <MySelect data={['Mới', 'Cũ']} label='Tình trạng' defaultValue="Mới" {...formThongTin.getInputProps("status")} />
                            <MySelect data={['Hoạt động tốt']} label='Chất lượng' defaultValue="Hoạt động tốt" {...formThongTin.getInputProps("quality")} />
                            <NumberInput label='Số lượng' placeholder='Nhập số lượng tài sản' {...formThongTin.getInputProps("quantity")} />
                        </div>
                    </MyFlexRow>


                    <Textarea
                        label='Điều kiện bảo hành'
                        placeholder='Nhập thông tin điều kiện bảo hành'
                        minRows={6}
                        {...formThongTin.getInputProps("warrantyCondition")} />
                    <MyButton crudType="save" />
                </MyFlexColumn>
            </Fieldset>
        </form>
    );
}
