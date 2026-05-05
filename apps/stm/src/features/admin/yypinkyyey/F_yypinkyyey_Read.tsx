'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import useS_Shared_FilterExam from "@/features/shared/FilterExam/useS_Shared_FilterExam";
import { examService } from "@/shared/APIs/examService";
import { programDetailService } from "@/shared/APIs/programDetailService";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Checkbox } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function F_yypinkyyey_Read() {
    const store = useS_Shared_FilterExam()
    const programDetailQuery = useCustomReactQuery({
        queryKey: ["programDetail", store.state.programId],
        axiosFn: () =>
            programDetailService.getDetail({
                params: "?programId=" + store.state.programId,
            }),
    })

    const query = useCustomReactQuery({
        queryKey: ["examStudents", store.state.examId],
        axiosFn: () =>
            examService.getStudent({
                pageNumber: 0,
                pageSize: 0,
                examIds: [store.state.examId!],
            }),
        options: {
            enabled: !!store.state?.examId && store.state.examId !== 0,
            placeholderData: [],
        },
    })
    const columns = useMemo<MRT_ColumnDef<CourseSection>[]>(() => {
        const dynamicScoreColumns: MRT_ColumnDef<CourseSection>[] =
            programDetailQuery.data?.scoreConfigs
                ?.filter(item => item.scoreType === 2)
                .map(scoreConfigItem => ({
                    header: scoreConfigItem.name!,
                    accessorFn: (row) => {
                        if (row == undefined) return
                        return row.user?.courseSectionStudentPoints?.find(p => p.scoreConfigId === scoreConfigItem.id)?.point;
                    }
                })) ?? [];

        // Create the base columns first
        const baseColumns: MRT_ColumnDef<CourseSection>[] = [
            {
                header: "Mã học viên",
                accessorKey: "user.code",
            },
            {
                header: "Họ tên",
                accessorKey: "user.fullName"
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
                Cell: ({ cell }) => ENUM_GENDER[cell.getValue<number>()]
            },
            {
                header: "Ngày sinh",
                accessorKey: "user.dateOfBirth",
                Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
            },
            {
                header: "Trạng thái học viên",
            },
            {
                header: "Mã khóa thi",
                accessorKey: "exam.code"
            },
            {
                header: "Mã nhóm thi",
                accessorKey: "courseSection.code"

            },
            {
                header: "Ngày thi",
                accessorKey: "exam.officialExamDate",
                Cell: ({ cell }) => {
                    return utils_date_dateToDDMMYYYString(new Date(cell.getValue<any>()))
                }
            },

            {
                header: "Đối tượng",
            },
        ];

        // These are the columns that should appear after the dynamic columns
        const endColumns: MRT_ColumnDef<CourseSection>[] = [
            {
                header: "Điểm tổng kết",
                accessorFn: (row) => {
                    return row?.totalPoint
                }

            },
            {
                header: "Đạt",
                accessorKey: "isPass",
                accessorFn: (row) => {
                    return <Checkbox checked={row?.isPass} readOnly />
                }
            },
        ];

        // Combine the arrays in the order: baseColumns + dynamicScoreColumns + endColumns
        return [...baseColumns, ...dynamicScoreColumns, ...endColumns];
    }, [programDetailQuery.data]);

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyFieldset title="Danh sách điểm thi">
            <MyDataTable
                columns={columns}
                data={query.data![0] == null ? [] : query.data!}
                exportAble
            />
        </MyFieldset>
    );
}
