'use client';
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Box, Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MRT_RowSelectionState, MRT_TableInstance } from "mantine-react-table";
import { useMemo, useState } from "react";

interface CourseSectionSelectTableProps {
    semesterId?: number;
    currentSelectedCourseSectionId?: number | null;
    onSelect?: (table: MRT_TableInstance<any>, selectedRows: any) => void;
}

export const CourseSectionSelectTable = ({
    semesterId,
    currentSelectedCourseSectionId,
    onSelect
}: CourseSectionSelectTableProps) => {
    const courseSections = useCustomReactQuery({
        queryKey: ["CourseSectionRegistrations", semesterId],
        axiosFn: async () => {
            return axiosInstance.get<CustomApiResponse<any[]>>(`/COECourseSection/FindByActivityPlanId?activityPlanId=${semesterId}`);
        },
        options: {
            refetchOnWindowFocus: false,
        },
    })

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({
        [currentSelectedCourseSectionId?.toString() ?? ""]: true
    });

    const courseSectionRegistrationMRTColumns = useMemo<CustomColumnDef<any>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "subjectCode",
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName"
        },
        {
            header: "Nhóm học",
            accessorKey: "code",
        },
        {
            header: "Mã lớp",
            accessorFn(originalRow) {
                return (originalRow.coeCourseSection?.coeCourseSectionClass === null || originalRow.coeCourseSection?.coeCourseSectionClass.length === 0) ?
                    ""
                    :
                    originalRow.coeCourseSection?.coeCourseSectionClass.map((item: any) => item.code).join("\n");
            }
        },
        {
            header: "Mã giảng viên nhập điểm",
            accessorKey: "pointRecordUser.code"
        },
        {
            header: "Tên giảng viên nhập điểm",
            accessorKey: "pointRecordUser.name"
        },

        {
            header: "Số lượng sinh viên đăng ký",
            accessorKey: "studentQuantity"
        },
        {
            header: "Số tiết",
            accessorKey: "subjectNumberPeriod"
        }
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
                query={courseSections}
                columns={courseSectionRegistrationMRTColumns}
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