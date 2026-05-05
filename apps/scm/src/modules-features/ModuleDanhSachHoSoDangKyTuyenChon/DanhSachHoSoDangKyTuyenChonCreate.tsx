import { Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyFileInput, MyNumberInput, MySelect, MyTab, MyTextInput } from "aq-fe-framework/components";
import ThanhVienTable from "./CURDThanhVien/ThanhVienTable";
import { HoSoDangKyTuyenChonViewModel } from "./interfaces/HoSoDangKyTuyenChonViewModel";

export default function DanhSachHoSoDangKyTuyenChonCreate() {
    const form = useForm<HoSoDangKyTuyenChonViewModel>({
    })

    const tabsList = [
        { label: "Thông tin chung", value: "Thông tin chung" },
        { label: "Thành viên", value: "Thành viên" },
    ]

    return (
        <MyButtonCreate
            form={form}
            title="Thêm hồ sơ đăng ký tuyển chọn"
            modalSize="70%"
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <MyTab tabList={tabsList} variant="outline" defaultValue="Thông tin chung">
                <Tabs.Panel value="Thông tin chung">
                    <Stack>
                        <Grid columns={12}>
                            <Grid.Col span={6}>
                                <MyTextInput label="Tên đề tài" {...form.getInputProps('name')} />
                                <MyTextInput label="Thời gian thực hiện" {...form.getInputProps('duration')} />
                                <MyNumberInput label="Tổng kinh phí thực hiện" {...form.getInputProps('budget')} />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <MySelect
                                    label="Lĩnh vực"
                                    {...form.getInputProps('codeField')}
                                    data={[
                                        { value: "CNTT", label: "Công nghệ thông tin" },
                                        { value: "NN", label: "Nông nghiệp" },
                                        { value: "KTMT", label: "Kỹ thuật, Môi trường" },
                                        { value: "MT", label: "Môi trường" },
                                    ]}
                                />
                                <MyFileInput
                                    label="File hồ sơ đăng ký"
                                    {...form.getInputProps('file')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <ThanhVienTable  />
                </Tabs.Panel>
            </MyTab>
        </MyButtonCreate>
    )
}
