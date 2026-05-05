'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Dùng MyDateInput thay cho MyDatePicker
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Group, SimpleGrid, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import SF7_1List from "../Tab1/SF7_1List";

interface I {
    id?: number,
    maSinhVien?: string,
    hoTen?: string,
    noiSinh?: string,
    ngaySinh?: Date,
    canCuocCongDan?: string,
    ngayCapCanCuocConDan?: Date,
    noiCapCanCuocCongDan?: string,
    maGiamGia?: string,
    chietKhau?: string,
    khoaHoc?: string
}

export default function F7_1Tab2Create() {
    const form = useForm<I>({
        initialValues: {
            id: undefined,
            maSinhVien: undefined,
            hoTen: "",
            noiSinh: "",
            ngaySinh: undefined,
            canCuocCongDan: "",
            ngayCapCanCuocConDan: undefined,
            noiCapCanCuocCongDan: "",
            maGiamGia: "",
            chietKhau: "",
            khoaHoc: "",
        },
    });
    const listKhoaHoc = useListState()
    return (
        <form>
            <MyFieldset title="Đăng ký khóa thi và thu phí" p={'md'}>
                <SimpleGrid cols={2}>
                    <MyFlexColumn>
                        <Group align="end">
                            <MySelect flex={1} data={['hv001', 'hv002', 'hv003']} label="Mã học viên" placeholder="Chọn sinh viên (liên kết edusoft)" {...form.getInputProps("maSinhVien")} />
                            <Button>Thêm mới</Button>
                        </Group>
                        <MyDateInput label="Ngày Sinh" {...form.getInputProps("ngaySinh")} />
                        <MyTextInput label="Căn Cước Công Dân" {...form.getInputProps("canCuocCongDan")} />
                        <MySelect data={['GG-01', 'GG-02', 'GG-03']} label="Mã Giảm Giá" {...form.getInputProps("maGiamGia")} />
                    </MyFlexColumn>
                    <MyFlexColumn>
                        <MyTextInput label="Họ và Tên" {...form.getInputProps("hoTen")} />
                        <MyTextInput label="Nơi Sinh" {...form.getInputProps("noiSinh")} />


                        <MyDateInput label="Ngày Cấp Căn Cước" {...form.getInputProps("ngayCapCanCuocConDan")} />
                        <MyTextInput label="Nơi Cấp Căn Cước" {...form.getInputProps("noiCapCanCuocCongDan")} />

                        <MySelect data={['CK-01', 'CK-02', 'CK-03']} label="Chiết Khấu" {...form.getInputProps("chietKhau")} />
                    </MyFlexColumn>
                </SimpleGrid>

                <SF7_1List listState={listKhoaHoc as any} />
                <MyFieldset mt="10" title="Học phí">
                    <MyFlexColumn>
                        <SimpleGrid cols={4}>
                            <Text>Học phí: 2.500.000</Text>
                            <Text>Mã giảm giá: 200.000</Text>
                            <Text>Chiết khấu: 150.000</Text>
                            <Text>Tổng miễn giảm: 350.000</Text>
                            <Text>Phải thu: 2.150.000</Text>
                            <MyFlexRow>
                                <Text>Đã thu</Text>
                                <TextInput onChange={() => { }} value={'2.150.000'} />
                            </MyFlexRow>
                        </SimpleGrid>
                    </MyFlexColumn>
                </MyFieldset>
                <MyFlexEnd>
                    <Button onClick={() => form.reset()} leftSection={<IconRefresh />}>Làm mới</Button>
                    <MyButton crudType="save" />
                    <Button>Lưu và in</Button>
                </MyFlexEnd>
            </MyFieldset>
        </form>
    )
}
