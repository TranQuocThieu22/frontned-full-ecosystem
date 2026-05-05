import { Grid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MySelect, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import DangKyTuyenChonTable from "./CURDDangKyTuyenChon/DangKyTuyenChonTable";
import ThanhVienTable from "./CURDThanhVien/ThanhVienTable";
import { DangKyTuyenChonViewModel, IThanhLapToThamDinhKinhPhiViewModel, ThanhVienViewModel } from "./interfaces/ThanhLapToThamDinhKinhPhiViewModel";

interface I extends IThanhLapToThamDinhKinhPhiViewModel {
    file?: File
}

export default function ThanhLapToThamDinhKinhPhiUpdate({ data }: { data: IThanhLapToThamDinhKinhPhiViewModel }) {
    const form = useForm<I>({
        initialValues: {
            ...data,
            file: new File([], data.fileUrl?.split("/")[data.fileUrl.split("/").length - 1]!),
        }
    })

    const tabsList = [
        { label: "Thông tin chung", value: "Thông tin chung" },
        { label: "Thành viên", value: "Thành viên" },
        { label: "Danh sách đăng ký tuyển chọn", value: "Danh sách đăng ký tuyển chọn" },
    ]

    return (
        <MyActionIconUpdate
            title="Chi tiết hội đồng xét duyệt"
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
                    <ThanhVienTable data={mockData} />
                </Tabs.Panel>
                <Tabs.Panel value="Danh sách đăng ký tuyển chọn">
                    <DangKyTuyenChonTable data={dangKyTuyenChonData} />
                </Tabs.Panel>
            </MyTab>
        </MyActionIconUpdate>
    )
}


export const dangKyTuyenChonData: DangKyTuyenChonViewModel[] = [    
    {
        id: 1,
        code: "DKTC2025001",
        name: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        field: "Vật liệu tiên tiến",
        leader: "Nguyễn Văn A",
        suitability: "Phù hợp",
        score: 4,
        comment: "Đề tài có tính khả thi cao, cần bổ sung thêm kế hoạch truyền thông",
    },
    {
        id: 2,
        code: "DKTC2025002",
        name: "Ứng dụng AI trong phân tích dữ liệu y tế",
        field: "Công nghệ thông tin; Y sinh",
        leader: "Trần Thị B",
        suitability: "Phù hợp",
        score: 3,
        comment: "Mô hình ứng dụng rõ ràng, cần làm rõ thêm về nguồn lực triển khai",
    },
    {
        id: 3,
        code: "DKTC2025003",
        name: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        field: "Kinh tế; Tâm lý học",
        leader: "Phạm Thị D",
        suitability: "Phù hợp",
        score: 5,
        comment: "Nghiên cứu có tính đột phá, tiềm năng ứng dụng cao",
    },
    {
        id: 4,
        code: "DKTC2025004",
        name: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        field: "Nông nghiệp; Công nghệ thông tin",
        leader: "Hoàng Minh E",
        suitability: "Phù hợp",
        score: 4,
        comment: "Hồ sơ đầy đủ; cần chi tiết hơn về công nghệ IoT cụ thể sẽ sử dụng",
    },
    {
        id: 5,
        code: "DKTC2025005",
        name: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        field: "Nông nghiệp; Công nghệ thông tin",
        leader: "Hoàng Minh E",
        suitability: "Không phù hợp",
        score: 4,
        comment: "Hồ sơ đầy đủ; cần chi tiết hơn về công nghệ IoT cụ thể sẽ sử dụng",
    }
];

const mockData: ThanhVienViewModel[] = [
    {
        id: 1,
        code: "NVTC001",
        name: "Lê Văn An",
        department: "Phòng Kế hoạch - Tài chính",
        position: "Trưởng phòng",
        role: "Tổ trưởng"
    },
    {
        id: 1,
        code: "NVTC005",
        name: "Trần Thị Bình",
        department: "Phòng Khoa học & Công nghệ",
        position: "Chuyên viên",
        role: "Thư ký"
    },
    {
        id: 1,
        code: "NVTC010",
        name: "Hoàng Minh Đức",
        department: "Khoa Kế toán - Kiểm toán",
        position: "Giảng viên cao cấp",
        role: "Thành viên"
    },
    {
        id: 1,
        code: "NVTC002",
        name: "Nguyễn Thị Mai",
        department: "Phòng Kế hoạch - Tài chính",
        position: "Phó trưởng phòng",
        role: "Tổ trưởng"
    },
    {
        id: 1,
        code: "NVTC006",
        name: "Bùi Văn Cường",
        department: "Khoa Công nghệ thông tin",
        position: "Giảng viên",
        role: "Thành viên"
    }
];