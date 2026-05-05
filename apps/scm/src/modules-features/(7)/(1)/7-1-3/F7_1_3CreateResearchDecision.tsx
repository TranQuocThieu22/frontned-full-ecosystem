'use client';

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import MySelectAPIGet from "@/components/RESTAPIComponents/SelectAPIGet/MySelectAPIGet";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import MySelect from "@/components/Combobox/Select/MySelect";
import F7_1_3UpdateResearchDecision from "./F7_1_3UpdateResearchDecision";
import F7_1_3DeleteResearchDecision from "./F7_1_3DeleteResearchDecision";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import F7_1_3UpdateResearchDecisionInCreate from "./F7_1_3UpdateResearchDecisionInCreate";

interface I7_1_3ResearchDecision {
    decisionNumber?: string;
    decisionDate?: Date;
    decisionName?: string;
    decisionFile?: string;
}

// Interface for payment member data
export interface I7_1_3ResearchDecisionData  {
    id: number;
    researchName?: string;
    field?: string;
    studentName?: string;
    department?: string;
    class?: string;
    estimateCost?: string;
    estimateTime?: string;
    addFile?: string;
    councilOpinion?: string;
    resultOfApproval?: boolean;
}

// Sample member data for the data table
const memberData: I7_1_3ResearchDecisionData[] = [
    {
        id: 1,
        researchName: "Nghiên cứu trí tuệ nhân tạo trong giáo dục",
        field: "Công nghệ thông tin",
        studentName: "Nguyen Van A",
        department: "Khoa Công nghệ thông tin",
        class: "CNTT01",
        estimateCost: "10,000,000 VND",
        estimateTime: "6 tháng",
        addFile: "evidence1.pdf",
        councilOpinion: "Đồng ý với các sửa đổi nhỏ",
        resultOfApproval: true,
    },
    {
        id: 2,
        researchName: "Ứng dụng blockchain trong quản lý tài sản",
        field: "Khoa học máy tính",
        studentName: "Le Thi B",
        department: "Khoa Khoa học máy tính",
        class: "KHMT02",
        estimateCost: "12,000,000 VND",
        estimateTime: "9 tháng",
        addFile: "evidence2.pdf",
        councilOpinion: "Cần bổ sung thêm tài liệu tham khảo",
        resultOfApproval: false,
    },
    {
        id: 3,
        researchName: "Phát triển ứng dụng học trực tuyến",
        field: "Công nghệ thông tin",
        studentName: "Pham Thi D",
        department: "Khoa Kỹ thuật phần mềm",
        class: "KTPM01",
        estimateCost: "15,000,000 VND",
        estimateTime: "12 tháng",
        addFile: "evidence3.pdf",
        councilOpinion: "Ứng dụng rất hữu ích, cần thêm kế hoạch triển khai chi tiết",
        resultOfApproval: true,
    },
    {
        id: 4,
        researchName: "Phân tích dữ liệu lớn trong marketing",
        field: "Kinh tế",
        studentName: "Nguyen Thi E",
        department: "Khoa Quản trị kinh doanh",
        class: "QTKD02",
        estimateCost: "20,000,000 VND",
        estimateTime: "8 tháng",
        addFile: "evidence4.pdf",
        councilOpinion: "Nên đưa thêm ví dụ thực tế trong ngành marketing",
        resultOfApproval: false,
    },
];

export default function F7_1_3CreateResearchDecision() {
    const disc = useDisclosure(false)
    const form = useForm<I7_1_3ResearchDecision>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Thêm"
            modalSize={"100%"}
            disclosure={disc}
            title="Quyết định Danh mục đề tài nghiên cứu khoa học định hướng"
            // form={form}
            onSubmit={() => {
            }}
        >
            <MyFlexRow>
                <TextInput
                    label="Số quyết định"
                    {...form.getInputProps("decisionNumber")}
                    style={{ flex: 1 }}
                />
                <MyDateInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decisionDate")}
                    style={{ flex: 1 }}
                />
            </MyFlexRow>
            <TextInput
                label="Tên quyết định"
                {...form.getInputProps("decisionName")}
            />
            <MyFileInput label="File quyết định" {...form.getInputProps("decisionFile")} />

            <MyDataTable
                columns={[
                    { header: "Tên đề tài", accessorKey: "researchName", size: 300 },
                    { header: "Lĩnh vực", accessorKey: "field" },
                    { header: "Sinh viên đăng ký", accessorKey: "studentName", size: 240 },
                    { header: "Khoa", accessorKey: "department", size: 240 },
                    {
                        header: "Lớp",
                        accessorKey: "class"
                    },
                    {
                        header: "Kinh phí dự kiến",
                        accessorKey: "estimateCost"
                    },
                    {
                        header: "Thời gian dự kiến",
                        accessorKey: "estimateTime"
                    },
                    {
                        header: "File minh chứng",
                        accessorKey: "addFile",
                        Cell: ({ cell }) => {
                            return <MyButtonViewPDF />;
                        },
                    },
                    {
                        header: "Ý kiến của hội đồng",
                        accessorKey: "councilOpinion"
                    },
                    {
                        header: "Kết quả phê duyệt",
                        accessorKey: "resultOfApproval",
                        Cell: ({ cell }) => {
                            return <Checkbox
                                checked={cell.row.original.resultOfApproval || false}
                                onChange={(event) => console.log(event.currentTarget.checked)}
                            />
                        },
                    }
                ]}
                data={memberData} // Fixed data binding (removed nested array)
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_1_3UpdateResearchDecisionInCreate values={row.original} />
                            <F7_1_3DeleteResearchDecision id={row.original.id} />
                        </MyCenterFull>
                    );
                }}
            ></MyDataTable>
            <Button
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Lưu thành công",
                    });
                }}>
                Lưu
            </Button>
        </MyButtonModal>
    );
}
