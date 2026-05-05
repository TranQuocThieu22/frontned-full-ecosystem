import { Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyFileInput, MySelect, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import DangKyTuyenChonTable from "./CURDDangKyTuyenChon/DangKyTuyenChonTable";
import ThanhVienTable from "./CURDThanhVien/ThanhVienTable";
import { IThanhLapToThamDinhKinhPhiViewModel } from "./interfaces/ThanhLapToThamDinhKinhPhiViewModel";

export default function ThanhLapToThamDinhKinhPhiCreate() {
    const form = useForm<IThanhLapToThamDinhKinhPhiViewModel>()

    const tabsList = [
        { label: "Thông tin chung", value: "Thông tin chung" },
        { label: "Thành viên", value: "Thành viên" },
        { label: "Danh sách đăng ký tuyển chọn", value: "Danh sách đăng ký tuyển chọn" },
    ]

    return (
        <MyButtonCreate
            title="Thêm hội đồng xét duyệt"
            form={form}
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
                                <MyTextInput label="Mã tổ thẩm định" {...form.getInputProps('code')} />
                                <MyTextInput label="Tên tổ thẩm định" {...form.getInputProps('name')} />
                                <MySelect
                                    label="Trạng thái tổ"
                                    {...form.getInputProps('status')}
                                    data={[
                                        { value: "Đang thẩm định", label: "Đang thẩm định" },
                                        { value: "Đã thành lập", label: "Đã thành lập" },
                                    ]}
                                />
                                <MyTextArea label="Ghi chú" {...form.getInputProps('note')} />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <MyDateInput label="Ngày họp" {...form.getInputProps('meetingDate')} />
                                <MyTextInput label="Thời gian họp" {...form.getInputProps('time')} />
                                <MyTextInput label="Địa điểm họp" {...form.getInputProps('location')} />
                                <MyFileInput
                                    label="File quyết định thành lập tổ thẩm định kinh phí"
                                    {...form.getInputProps('file')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <ThanhVienTable />
                </Tabs.Panel>
                <Tabs.Panel value="Danh sách đăng ký tuyển chọn">
                    <DangKyTuyenChonTable />
                </Tabs.Panel>
            </MyTab>
        </MyButtonCreate>
    )
}
