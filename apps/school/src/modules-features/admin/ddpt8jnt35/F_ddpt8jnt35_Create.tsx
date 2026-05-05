'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Box, Checkbox, Flex, Grid, Group, Select ,Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import F_ddpt8jnt35_Calendar from './F_ddpt8jnt35_Calendar';
import { useEffect } from 'react';

export interface I_ddpt8jnt35 {
    id?: number;
    maHocSinh?: string; // Mã học sinh
    hoTen?: string // họ tên
    lop?: string // lớp
    gioiTinh?: string //Giới tính
    ngaySinh?: Date //Ngày sinh
    loaiDangKy?: string //loại đăng ký
    ngayAn?: string //Ngày ăn
    soNgay?: number //số ngày
    cheDoAn?: string //chế độ ăn
    yeuCauDacBiet?: string //yêu cầu đặc biệt
    thanhTien?: number //thành tiền

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_ddpt8jnt35_Create() {
    
    const form = useForm<I_ddpt8jnt35>({
        initialValues: {
            maHocSinh: '',
            hoTen: '',
            lop: '',
            ngaySinh: undefined,
            gioiTinh: '',
            loaiDangKy: '',
            ngayAn: '',
            soNgay: 0,
            cheDoAn: '',
            yeuCauDacBiet:'',
            thanhTien: 0,
        },
        validate:
        {
            maHocSinh: (value) => (value ? null : 'Học sinh là bắt buộc'),
        }
    });

     useEffect(() => {
        const selected = HOC_SINH_DATA.find(hs => hs.maHocSinh === form.values.maHocSinh);
        if (selected) {
        form.setValues({
        hoTen: selected.hoTen,
        lop: selected.lop,
        });
        }
        }, [form.values.maHocSinh]);
        const HOC_SINH_DATA = [
        { maHocSinh: 'HS001', hoTen: 'Tô Ngọc Lâm', lop: '11A6' },
        { maHocSinh: 'HS002', hoTen: 'Trần Thị B', lop: '10A2' },
        { maHocSinh: 'HS003', hoTen: 'Lê Văn C', lop: '10A3' },
        ];

    return (
        <MyButtonCreate modalSize={"40%"} form={form} onSubmit={() => { }} title='Chi tiết đăng ký suất ăn'>
            <MySelect
                label="Học sinh"

                withAsterisk
                data={HOC_SINH_DATA.map(hs => ({
                    value: hs.maHocSinh,
                    label: `${hs.hoTen} - ${hs.maHocSinh} - ${hs.lop}`
                }))}
                {...form.getInputProps("maHocSinh")}
                clearable
            />
            <MyTextInput disabled label='Nhóm học sinh' value={"Trung học"}  />
            <MySelect
                label="Chế độ ăn"
                data={["Bình thường", "Ăn chay", "Ăn kiêng"]}
                defaultValue={"Bình thường"}
                {...form.getInputProps("cheDoAn")}
                clearable
            />
            <Box>
            <Text fw={"500"}mb={5} fz={13}>Loại đăng ký</Text>
            <Flex
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                    >
                        {['Ngày', 'Tuần', 'Tháng'].map((type) => (
                        <MyButton
                            key={type}
                            crudType="default"
                            variant={form.values.loaiDangKy === type ? 'filled' : 'light'}
                            color={form.values.loaiDangKy === type ? 'blue' : 'gray'}
                            onClick={() => form.setFieldValue('loaiDangKy', type)}
                        >
                            {type}
                        </MyButton>
                        ))}
                        </Flex>
            </Box>
           
           
             <MySelect
                label="Ngày ăn"
                data={["02/02/2025-09/02/2025", "03/02/2025-07/02/2025", "13/02/2025-17/02/2025"]}
                defaultValue={"03/02/2025-07/02/2025"}
                {...form.getInputProps("ngayAn")}
                clearable
            />
            <Grid w="100%" gutter="md">
                <Grid.Col span={6}>
                <MyTextInput w={150} label='Số ngày' type="number" {...form.getInputProps("soNgay")} />
                </Grid.Col>
                <Grid.Col span={6}>
                <F_ddpt8jnt35_Calendar/>
                </Grid.Col>
                </Grid>

                    <Grid w="100%" gutter="md">
                    <Grid.Col span={6}>
                        <MyTextInput w={150} label="Thành tiền" type="number" {...form.getInputProps("thanhTien")} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <MyCheckbox
                        mt={28} 
                        label="Tự động gia hạn"
                        {...form.getInputProps("tuDongGiaHan")}
                        />
                    </Grid.Col>
                    </Grid>

            <MyTextArea label='Yêu cầu đặc biệt'{...form.getInputProps("yeuCauDacBiet")} />
            
        </MyButtonCreate>
    )
}