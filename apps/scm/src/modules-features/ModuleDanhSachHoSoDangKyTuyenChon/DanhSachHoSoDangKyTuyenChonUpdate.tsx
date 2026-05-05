import { Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyFileInput, MyNumberInput, MySelect, MyTab, MyTextInput } from "aq-fe-framework/components";
import ThanhVienTable from "./CURDThanhVien/ThanhVienTable";
import { HoSoDangKyTuyenChonViewModel, ThanhVienViewModel } from "./interfaces/HoSoDangKyTuyenChonViewModel";

interface I extends HoSoDangKyTuyenChonViewModel {
    file?: File
}

export default function DanhSachHoSoDangKyTuyenChonUpdate({ data }: { data: HoSoDangKyTuyenChonViewModel }) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.path?.split("/")[data.path.split("/").length - 1]!),
        }
    })

    const tabsList = [
        { label: "Thông tin chung", value: "Thông tin chung" },
        { label: "Thành viên", value: "Thành viên" },
    ]

    return (
        <MyActionIconUpdate
            title="Chi tiết hồ sơ đăng ký tuyển chọn"
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
                    <ThanhVienTable data={mockDataThanhVien} />
                </Tabs.Panel>
            </MyTab>
        </MyActionIconUpdate>
    )
}


const mockDataThanhVien: ThanhVienViewModel[] = [
    {
        id: 1,
        code: "NV001",
        name: "Trần Văn Khang",
        birthDate: "20/05/1988",
        gender: "Nam",
        department: "Khoa Công nghệ thông tin",
        position: "Giảng viên chính",
        role: "Chủ nhiệm đề tài"
    },
    {
        id: 2,
        code: "NV002",
        name: "Lê Thị Minh Nguyệt",
        birthDate: "12/11/1990",
        gender: "Nữ",
        department: "Khoa Công nghệ thông tin",
        position: "Giảng viên",
        role: "Thành viên nghiên cứu"
    },
    {
        id: 3,
        code: "NV003",
        name: "Phạm Gia Bảo",
        birthDate: "03/02/1992",
        gender: "Nam",
        department: "Phòng Thí nghiệm AI",
        position: "Nghiên cứu viên",
        role: "Thành viên kỹ thuật"
    },
    {
        id: 4,
        code: "NV004",
        name: "Nguyễn Thu Hà",
        birthDate: "25/08/1985",
        gender: "Nữ",
        department: "Khoa Kinh tế",
        position: "Giảng viên",
        role: "Thành viên tư vấn"
    },
    {
        id: 5,
        code: "NV005",
        name: "Đặng Hoàng An",
        birthDate: "08/04/1991",
        gender: "Nam",
        department: "Phòng Kế hoạch Tài chính",
        position: "Chuyên viên",
        role: "Thành viên hỗ trợ"
    }
]
