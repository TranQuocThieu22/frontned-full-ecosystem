import { Stack, Text } from "@mantine/core";
import { MyDataTable } from "aq-fe-framework/components";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { genderEnum, genderLabel } from "aq-fe-framework/shared";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface TeacherDomain extends IBaseEntity {
    teacherCode?: string, // Mã giảng viên
    teacherName?: string, // Họ tên
    educationLevel?: string // Bậc học
    gender?: genderEnum, // Giới tính
    branchsCanTeach?: string[], // Chi nhánh có thể dạy
    programsCanTeach?: string[] // Chương trình có thể dạy
    skills?: string[] // Kỹ năng
}


interface Usecase_TeacherTableProps {
    data?: TeacherDomain[],
    isLoading?: boolean,
    visibleColumns?: (keyof TeacherDomain)[]
}
export default function Usecase_TeacherTable({
    data,
    isLoading,
    visibleColumns
}: Usecase_TeacherTableProps) {
    const columns = useMemo<MRT_ColumnDef<TeacherDomain>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "teacherCode"
        },
        {
            header: "Họ tên",
            accessorKey: "teacherName"
        },
        {
            header: "Bậc học",
            accessorKey: "educationLevel"
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => row.gender && genderLabel[row.gender as genderEnum]
        },
        {
            header: "Chi nhánh có thể dạy",
            accessorKey: "branchsCanTeach",
            accessorFn: (row) => (
                <Stack>
                    {row.branchsCanTeach?.map((item, idx) => (<Text key={idx}>{item}</Text>))}
                </Stack>
            )
        },
        {
            header: "Chương trình có thể dạy",
            accessorKey: "programsCanTeach",
            accessorFn: (row) => (
                <Stack>
                    {row.programsCanTeach?.map((item, idx) => (<Text key={idx}>{item}</Text>))}
                </Stack>
            )
        },
        {
            header: "Kỹ năng",
            accessorKey: "skills",
            accessorFn: (row) => (
                <Text>{row.skills?.join(", ")}</Text>
            )
        },
    ], [])

    const filteredColumns = useMemo(() => {
        if (!visibleColumns?.length) return [];
        return columns.filter((col) => {
            const key = "accessorKey" in col ? col.accessorKey : col.id;
            return visibleColumns.includes(key as keyof TeacherDomain);
        });
    }, [columns, visibleColumns]);

    return (
        <MyDataTable
            columns={filteredColumns}
            data={data || []}
            isLoading={isLoading}
        />
    )
}
