'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { I6_2_2ResearchGroupProjectOutline } from "./F6_2_2ReadResearchGroupProjectOutline";



export interface listOfMember {
    id?: number;
    code?: string;
    name?: string;
    academicTitle?: string;
    collaborationUnit?: string;
    role?: string;
}

export default function F6_2_2UpdateResearchGroupProjectOutline({ values }: { values: I6_2_2ResearchGroupProjectOutline; }) {
    const form = useForm<I6_2_2ResearchGroupProjectOutline>({
        initialValues: {
            id: values.id,
            code: values.code || "",
            topicName: values.topicName || "",
            field: values.field || "",
            groupName: values.groupName || "",
            leaderName: values.leaderName || "",
            telephone: values.telephone || "",
            email: values.email || "",
            expense: values.expense || 0,
            time: values.time || "",
        },
    });
    const query = useQuery<listOfMember[]>({
        queryKey: ["F6_3_5CreateReviewCommitteePayment"],
        queryFn: async () => data
    })
    const columns: MRT_ColumnDef<listOfMember>[] = [
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ và tên",
            accessorKey: "name",
        },
        {
            header: "Học hàm - Học vị",
            accessorKey: "academicTitle",
        },
        {
            header: "Đơn vị cộng tác",
            accessorKey: "collaborationUnit",
        },
        {
            header: "Vai trò",
            accessorKey: "role",
        },
        {
            header: "Lý lịch",
            accessorFn: () =>
                <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
        }
    ];

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize="80%">
            {/* Form thông tin dự án */}
            <MyTextInput label="Tên đề tài" defaultValue="Đổi mới phương pháp giáo dục" />
            <MyTextInput label="Thời gian thực hiện" placeholder="Nhập tên đề tài" />
            <MyTextInput label="Thời gian thực hiện" />
            <Flex>
                <MyDateInput label='Từ ngày' />
                <MyDateInput label='Đến ngày' />
            </Flex>
            <MyTextInput label='Đơn vị chủ trì' />
            <MyTextInput label='Mục tiêu nghiên cứu' />
            <MyTextInput label='Hướng ứng dụng' />
            <MyNumberInput label='Kinh phí dự kiến' />
            <MyFileInput label='Đính kèm file thuyết minh/Đề cương' />
            {/* Bảng danh sách thành viên */}
            <h3>Danh sách thành viên trong nhóm nghiên cứu</h3>
            <MyDataTable columns={columns} data={query.data!} />
        </MyActionIconUpdate>
    );
}

const data: listOfMember[] = [
    {
        id: 1,
        code: 'GV0001',
        name: 'Nguyễn Văn A',
        academicTitle: 'PGS TS',
        collaborationUnit: 'Phòng Hợp tác Quốc tế',
        role: 'Trưởng nhóm'
    },
    {
        id: 2,
        code: 'GV0002',
        name: 'Nguyễn Văn B',
        academicTitle: 'TS',
        collaborationUnit: 'Phòng Hợp tác Quốc tế',
        role: 'Thành Viên'
    }
]
