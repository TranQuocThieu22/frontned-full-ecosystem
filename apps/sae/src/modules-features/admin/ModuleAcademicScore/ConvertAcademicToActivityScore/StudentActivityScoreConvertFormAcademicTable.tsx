'use client'
import { serviceAQDataSynchronization } from "@/api/services/serviceAQDataSynchronization";
import { EnumScoreTransform, EnumScoreTransformLabel } from "@/enum/ScoreTransformType";
import { StudentActivityScore } from "@/interfaces/studentActivityScore";
import StudentActivityScoreConvertFormAcademicExport from "@/modules-features/admin/ModuleAcademicScore/ConvertAcademicToActivityScore/StudentActivityScoreConvertFormAcademicExport";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import SyncDataStudentActivityScoreButton from "./SyncDataStudentActivityScoreButton";
import { PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";

export default function StudentActivityScoreConvertFormAcademicTable() {
    const filterStore = useS_Shared_ActivityPlan();
    const paginationState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30
    });
    // State to manage the selected score transform type
    const [selectedScoreTransform, setSelectedScoreTransform] = useState<number>(
        EnumScoreTransform.AverageScore10
    );

    const scoreTransformQuery = useCustomReactQuery({
        queryKey: [
            'Q_StudentActivityScoreConvertFormAcademic_List',
            filterStore.state.ActivityPlan?.id,
            paginationState[0]
        ],
        axiosFn: () => {
            return serviceAQDataSynchronization.GetScoreTransformFilter({
                activityPlanId: filterStore.state.ActivityPlan?.id,
                // pageNumber: paginationState[0].pageIndex + 1,
                // pageSize: paginationState[0].pageSize
            })
        }
    });

    const columns = useMemo<MRT_ColumnDef<StudentActivityScore>[]>(() => [
        {
            accessorKey: "user.code",
            header: "Mã sinh viên",
        },
        {
            accessorKey: "user.fullName",
            header: "Họ tên",
        },
        {
            accessorKey: "user.classCode",
            header: "Mã lớp",
        },
        {
            accessorKey: "user.facultyCode",
            header: "Mã khoa",
        },
        {
            accessorKey: "semesterCredit",
            header: "Số tín chỉ ĐK trong học kỳ",
        },
        {
            accessorKey: "semesterGPA10",
            header: "Điểm trung bình HK hệ 10",
        },
        {
            accessorKey: "cumulativeGPA10",
            header: "Điểm trung bình tích lỹ hệ 10",
        },
        {
            accessorKey: "semesterGPA4",
            header: "Điểm trung bình học kỳ hệ 4",
        },
        {
            accessorKey: "cumulativeGPA4",
            header: "Điểm trung bình tích lũy hệ 4",
        },
        {
            accessorKey: "point",
            header: "Điểm rèn luyện quy đổi",
        },
    ], [])

    return (
        <>
            <CustomSelect
                mb={10}
                w="25%"
                label="Nguồn dữ liệu dùng quy đổi"
                data={converterUtils.mapEnumToSelectData(EnumScoreTransform, EnumScoreTransformLabel)}
                value={selectedScoreTransform.toString()}
                onChange={(value) => {
                    if (value) {
                        setSelectedScoreTransform(parseInt(value));
                    }
                }}
            />
            <CustomFieldset title="Danh sách điểm rèn luyện quy đổi của sinh viên">
                <CustomDataTableAPI
                    query={scoreTransformQuery}
                    columns={columns}
                    enableRowSelection={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <SyncDataStudentActivityScoreButton
                                scoreTransformType={selectedScoreTransform}
                            />
                            <StudentActivityScoreConvertFormAcademicExport table={table} />
                        </Group>
                    )}
                />
            </CustomFieldset>
        </>
    );
}
