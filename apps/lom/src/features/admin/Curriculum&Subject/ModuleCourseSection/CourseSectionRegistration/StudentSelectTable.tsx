'use client';
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { StudentActivityPlan, studentActivityPlanStatusEnum, studentActivityPlanStatusLabel } from "@aq-fe/core-ui/shared/interfaces/StudentActivityPlan";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MRT_RowSelectionState, MRT_TableInstance } from "mantine-react-table";
import { useMemo, useState } from "react";

interface StudentSelectTableProps {
    semesterId?: number;
    currentSelectedStudentId?: number | null;
    onSelect?: (table: MRT_TableInstance<any>, selectedRows: any) => void;
}

export const StudentSelectTable = ({
    semesterId,
    currentSelectedStudentId,
    onSelect
}: StudentSelectTableProps) => {

    const studentsBySemester = useCustomReactQuery({
        queryKey: ["StudentsBySemester", semesterId],
        axiosFn: async () => {
            return axiosInstance.get<CustomApiResponse<any[]>>(`/StudentActivityPlan/FindbyActivityPlanForCOE?activityPlanId=${semesterId}`);
        },
        options: {
            enabled: !!semesterId,
            refetchOnWindowFocus: false,
        }
    })

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({
        [currentSelectedStudentId?.toString() ?? ""]: true
    });

    /**
     * Todo: Need to add type COEStudentActivityPlan extend from StudentActivityPlan
     */
    const studentsBySemesterMRTColumns = useMemo<CustomColumnDef<StudentActivityPlan>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "user.code",
        },
        {
            header: "Họ",
            accessorFn(originalRow) {
                return textUtils.splitFullName(originalRow.user?.fullName).lastName
            },
        },
        {
            header: "Tên",
            accessorFn(originalRow) {
                const names = originalRow.user?.fullName?.split(" ") ?? [];
                return textUtils.splitFullName(originalRow.user?.fullName).firstName
            },
        },
        {
            header: "Họ và tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
            type: "gender"
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            type: "ddMMyyyy"
        },
        {
            header: "Trạng thái",
            accessorFn(originalRow) {
                return studentActivityPlanStatusLabel[originalRow.status!]
                // return originalRow.status ? studentActivityPlanStatusEnum[originalRow.status] : "";
            },
        },
        {
            header: "Mã lớp",
            accessorKey: "user.class.code"
        },
        {
            header: "Mã cố vấn học tập",
            accessorFn(originalRow) {
                return ""
            }
        },
        {
            header: "Mã giáo viên chủ nhiệm",
            accessorFn(originalRow) {
                return ""
            }
        },
        {
            header: "Mã khóa",
            accessorKey: "user.class.coeGrade.code"
        },
        {
            header: "Mã chương trình",
            accessorKey: "user.class.coeGrade.codeProgram.code"
        },
        {
            header: "Mã khoa",
            accessorKey: "user.class.coeGrade.codeProgram.department.code"
        },
        {
            header: "Năm học - học kỳ vào",
            accessorKey: "user.class.coeGrade.activityPlanStart.name"
        },
        {
            header: "Năm học - học kỳ ra",
            accessorKey: "user.class.coeGrade.activityPlanEnd.name"
        },
    ], []);

    const handleOnClickSelectButton = (table: MRT_TableInstance<any>, selectedRows: any) => {
        onSelect && onSelect(table, selectedRows);
    }

    return (
        <>
            <CustomDataTableAPI
                mantineTableContainerProps={{
                    style: { height: '60vh' }
                }}
                enableRowSelection
                getRowId={(originalRow) => originalRow.id}
                enableMultiRowSelection={false}
                onRowSelectionChange={setRowSelection}
                state={{
                    rowSelection
                }}
                query={studentsBySemester}
                columns={studentsBySemesterMRTColumns}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <Button
                            leftSection={<IconPlus />}
                            color="blue"
                            onClick={() => handleOnClickSelectButton(table, table.getSelectedRowModel().rows.map(row => row.original))}
                        >
                            Chọn
                        </Button>
                    </Group>
                )}
            />
        </>
    )
}

