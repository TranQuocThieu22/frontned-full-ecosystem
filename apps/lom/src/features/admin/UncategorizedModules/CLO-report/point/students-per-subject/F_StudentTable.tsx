'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { ENUM_GENDER } from "@/data/enum/global";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import useS_CLOReportPointStudentsPerSubject from "./useS_CLOReportPointStudentsPerSubject";

export interface I_StudentTable {
    studentCode: string;
    studentFullName: string;
    studentDateOfBirth: Date | undefined;
    studentGender: number;
    totalCLOPoint: number;
    cloPoints: ICloPoint[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface ICloPoint {
    cloId: number;
    cloCode: string | null;
    cloName: string | null;
    cloDescription: string | null;
    point: number | null;
}

export default function F_StudentTable() {
    const store = useS_CLOReportPointStudentsPerSubject()
    const query = useQuery<I_StudentTable[]>({
        queryKey: ['I_fgmpowiqopData', store.state.gradeSubjectId, store.state.classId],
        queryFn: async () => {
            let url = `/COECourseSectionStudent/StudentPointResultReport?coeGradeSubjectId=${store.state.gradeSubjectId}`;
            const response = await baseAxios.post(url);
            return response.data.data;
        },
        enabled: !!store.state.gradeSubjectId && store.state.gradeSubjectId > 0,
        refetchOnWindowFocus: false,
    })


    const columns = useMemo<MRT_ColumnDef<I_StudentTable>[]>(() => [
        {
            header: "Mã Sinh Viên",
            accessorKey: "studentCode",

        },
        {
            header: "Họ và Tên",
            accessorKey: "studentFullName",

        },
        {
            header: "Ngày sinh",
            accessorKey: "studentDateOfBirth",
            accessorFn: (originalRow) => {
                return dateUtils.toDDMMYYYY(new Date(originalRow.studentDateOfBirth!));
            }
        },
        {
            header: "Giới tính",
            accessorKey: "studentGender",
            accessorFn: (originalRow) => {
                return originalRow.studentGender === ENUM_GENDER.Nam ? "Nam" : "Nữ";
            }
        },
        ...query.data?.[0]?.cloPoints?.map((clo: ICloPoint) => ({
            header: clo.cloCode ?? "Không có dữ liệu mã CLO",
            accessorFn: (row: I_StudentTable) => {
                const point = row.cloPoints?.find(p => p.cloId === clo.cloId)?.point
                return point?.toFixed(2) ?? '-'
            },
        })) ?? [],
        {
            header: "Tổng kết CLO",
            accessorKey: "totalCLOPoint",
            accessorFn: (originalRow) => {
                return originalRow.totalCLOPoint.toFixed(2);
            }
        },
    ], [query.data]);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <CustomFlexColumn>
            <MyDataTable
                enableRowSelection={false}
                enableRowNumbers={true}
                columns={columns}
                data={query.data ?? []}
                initialState={{
                    columnOrder: [
                        "studentCode",
                        "studentFullName",
                        "studentDateOfBirth",
                        "studentGender",
                        ...(query.data?.[0]?.cloPoints?.map(clo => clo.cloCode ?? "Không có dữ liệu mã CLO") ?? []),
                        "totalCLOPoint"
                    ]
                }}
            />
        </CustomFlexColumn>
    );
}