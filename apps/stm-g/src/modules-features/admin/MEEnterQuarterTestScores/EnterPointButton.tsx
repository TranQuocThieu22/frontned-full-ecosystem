'use client'
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { MyButton, MyDataTable, MyNumberInput } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayStudentStatus, DisplayStudentStatusMap } from "../MEEnterMonthlyTestScores/DisplayStudentStatus";

export interface StudentScore {
    studentCode: string;
    fullName: string;
    parentPhone: string;
    status: string;
    note: string;
    avgT7: number;
    avgT8: number;
    avgT9: number;
    examQuarter3: number;
}


export default function EnterPointButton() {
    const dics = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<StudentScore>[]>(
        () => [
            {
                accessorKey: 'studentCode',
                header: 'Mã học sinh',
            },
            {
                accessorKey: 'fullName',
                header: 'Họ và tên HS',
            },
            {
                accessorKey: 'parentPhone',
                header: 'SĐT Phụ huynh',
            },
            {
                accessorKey: 'status',
                header: 'Trạng thái HS',
                Cell: ({ row }) => <DisplayStudentStatus statuss={DisplayStudentStatusMap[row.original.status] ?? -1} />
            },
            {
                accessorKey: 'note',
                header: 'Ghi chú chung HS',
                size: 500
            },
            {
                accessorKey: 'avgT7',
                header: 'TB T7/2024',
            },
            {
                accessorKey: 'avgT8',
                header: 'TB T8/2024',
            },
            {
                accessorKey: 'avgT9',
                header: 'TB T9/2024',
            },
            {
                accessorKey: 'examQuarter3',
                header: 'Kiểm tra Quý 3/2024',
                size: 230,
                Cell: ({ row }) => <MyNumberInput defaultValue={row.original.examQuarter3} />
            },
        ], []
    );

    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách học sinh",
                size: "100%"
            }}
            buttonProps={{
                leftSection: <IconPencil />,
                variant: "outline",
                children: "Chấm điểm"
            }}
        >
            <MyDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={studentScoreData}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="save" />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
            />
        </MyButtonModal>
    )
}

export const studentScoreData: StudentScore[] = [
    {
        studentCode: "CG23-01030",
        fullName: "Nguyễn Ngọc Trang Anh",
        parentPhone: "0974681988",
        status: "Đang học",
        note: "Chưa làm bài tập thường xuyên",
        avgT7: 8.5,
        avgT8: 7.8,
        avgT9: 8.2,
        examQuarter3: 8.0,
    },
    {
        studentCode: "CG23-01040",
        fullName: "Mẫn Vũ Minh Anh",
        parentPhone: "0912378252",
        status: "Đang học",
        note: "Nghỉ buổi 2",
        avgT7: 7.0,
        avgT8: 7.5,
        avgT9: 6.8,
        examQuarter3: 7.2,
    },
    {
        studentCode: "CG24-01159",
        fullName: "Nguyễn Quốc Minh Châu",
        parentPhone: "0964252508",
        status: "Đang học",
        note: "",
        avgT7: 9.2,
        avgT8: 8.9,
        avgT9: 9.5,
        examQuarter3: 9.3,
    },
    {
        studentCode: "CG23-00685",
        fullName: "Phạm Ngô Khánh Diệp",
        parentPhone: "0969170484",
        status: "Đang học",
        note: "Cần cải thiện tốc độ",
        avgT7: 7.8,
        avgT8: 7.2,
        avgT9: 7.0,
        examQuarter3: 7.0,
    },
    {
        studentCode: "CG24-01157",
        fullName: "Phạm Hoàng Hải",
        parentPhone: "0348689937",
        status: "Đang học",
        note: "",
        avgT7: 8.0,
        avgT8: 8.5,
        avgT9: 7.9,
        examQuarter3: 8.1,
    },
];
