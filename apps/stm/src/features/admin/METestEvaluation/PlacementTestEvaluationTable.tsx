'use client'

import { mockData_TestResult } from "./mockDatas";
import { MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table"; // Assuming this is used for column definitions
import { useMemo } from "react";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { useQuery } from "@tanstack/react-query";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import PlacementTestEvaluationUpdateModal from "./PlacementTestEvaluationUpdateModal";
import { I_TestResult } from "./interfaces";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";

export default function PlacementTestEvaluationTable() {
    // const query = useMyReactQuery({
    //     queryKey: [`PlacementTestEvaluationRead`],
    //     axiosFn: async () => 
    // })

    const query = useQuery<I_TestResult[]>({
        queryKey: ["PlacementTestEvaluationRead"],
        queryFn: async () => mockData_TestResult
    })

    const columns = useMemo<MRT_ColumnDef<I_TestResult>[]>(() => [
        { header: "Mã Kết quả Test", accessorKey: "testResultCode", size: 150 },
        { header: "Mã Lịch hẹn Test", accessorKey: "testScheduleCode", size: 150 },
        { header: "Mã Học sinh/Khách hàng tiềm năng", accessorKey: "studentCode", size: 150 },
        { header: "Chương trình Test", accessorKey: "program", size: 150 },
        {
            header: "Ngày Test",
            accessorFn: row => {
                if (!row.testDate) return "";
                return utils_date_dateToDDMMYYYString(row.testDate)
            },
            accessorKey: "testDate", size: 150
        },
        { header: "Điểm số tổng quan", accessorKey: "overallScore" },
        { header: "Chi tiết điểm số/Đánh giá khía cạnh", accessorKey: "detailedScores" },
        { header: "Nhận xét của Giáo viên/Chuyên viên", accessorKey: "teacherComment", size: 350 },
        { header: "Đề xuất cấp độ/Chương trình", accessorKey: "suggestedLevel", size: 250 },
        { header: "Người đánh giá", accessorKey: "evaluator" },
        {
            header: "Trạng thái Kết quả", accessorKey: "status",
            accessorFn(row) {
                return (
                    <MyCenterFull>
                        <MyCheckbox readOnly checked={row.status === 2} />
                    </MyCenterFull>
                )
            },
        },
    ], []);

    return (
        <MyFieldset title={"Danh sách kết quả test"}>
            <MyDataTable
                columns={columns}
                data={query.data || []}
                enableRowSelection
                enableColumnPinning
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                    columnPinning: {
                        right: ["mrt-row-actions"]
                    }
                }}
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <Button
                            leftSection={<IconTableExport />}
                            color="teal"
                            size="sm"
                            radius="sm"
                            onClick={() => {
                                notifications.show({
                                    title: "Thông báo",
                                    message:
                                        "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                    color: "blue",
                                    autoClose: 5000,
                                });
                            }}
                        >
                            Export
                        </Button>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => {
                    return (<PlacementTestEvaluationUpdateModal values={row.original} />)
                }}
            />
        </MyFieldset>
    )
}
