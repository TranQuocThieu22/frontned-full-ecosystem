'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"; // Dùng MyDateInput thay cho MyDatePicker
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, SimpleGrid, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import SF7_1List from "./SF7_1List";

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

interface I {
  id?: number,
  maKhoaHoc?: number, // LTB2401
  tenKhoaHoc?: string, // Lập trình web khóa 2024
  tenChuongTrinh?: string, // Lập trình web
  loaiChuongTrinh?: string, // Đào tạo ngắn hạn
  ngayKhaiGiang?: string, // 12/01/2024
  ngayThi?: Date, // Ngày thi dự kiến 12/05/2024
  coToChucThi?: boolean,
  tongSoTiet?: number, // 120
  tongSoGio?: number, // 90
  hocPhi?: number,//9500000
  cumThoiGian?: string // Tối thứ 2 4 6
  soLuongHocViendangKy?: string // 35
  soLuongDaXepLop?: number // 35
}
export default function F7_1Tab1Create() {
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
  const ListState = useListState()
  return (
    <form>
      <MyFieldset title="Đăng ký khóa thi và thu phí" p={'md'}>
        <SimpleGrid cols={2}>
          <MyFlexColumn>
            <MySelect required data={['207pm65483', '207pm652231', '201pm22123']} label="Mã Sinh Viên" placeholder="Chọn sinh viên (liên kết edusoft)" {...form.getInputProps("maSinhVien")} />
            <MyDateInput required label="Ngày Sinh" {...form.getInputProps("ngaySinh")} />
            <MyTextInput required label="CCCD" {...form.getInputProps("canCuocCongDan")} />
            <MySelect data={['GG-01', 'GG-02', 'GG-03']} label="Mã Giảm Giá" {...form.getInputProps("maGiamGia")} />
          </MyFlexColumn>
          <MyFlexColumn>
            <MyTextInput required label="Họ và Tên" {...form.getInputProps("hoTen")} />
            <MyTextInput required label="Nơi Sinh" {...form.getInputProps("noiSinh")} />


            <MyDateInput required label="Ngày Cấp CCCD" {...form.getInputProps("ngayCapCanCuocConDan")} />
            <MyTextInput required label="Nơi Cấp CCCD" {...form.getInputProps("noiCapCanCuocCongDan")} />

            <MySelect data={['CK-01', 'CK-02', 'CK-03']} label="Chiết Khấu" {...form.getInputProps("chietKhau")} />
          </MyFlexColumn>
        </SimpleGrid>


        <SF7_1List listState={ListState as any} />
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
