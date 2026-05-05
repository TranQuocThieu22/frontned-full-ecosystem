'use client'

import { COECourseSectionService } from "@/api/services/service_COECourseSection";
import { service_grade } from "@/api/services/service_grade";
import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Checkbox, Group, Loader, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
export enum enum_formulaType {
    attendace = 1,
    progress = 2,
    final = 3
}

export const enumLabel_formulaType: Record<enum_formulaType, string> = {
    [enum_formulaType.attendace]: "Chuyên cần",
    [enum_formulaType.progress]: "Quá trình",
    [enum_formulaType.final]: "Cuối kỳ"
};
export default function PointDistributeRead() {
    const [selectedGrade, setSelectedGrade] = useState<COEGrade>({})
    const queryClient = useQueryClient();
    // Fetch grades data
    const gradeQuery = useCustomReactQuery({
        queryKey: ['gradeQuery'],
        axiosFn: () => service_grade.getAll(),
        options: {
            refetchOnWindowFocus: false,
        }
    })

    // Set default selected grade when grades are loaded
    useEffect(() => {
        if (gradeQuery.data && gradeQuery.data.length > 0 && !selectedGrade.id) {
            setSelectedGrade(gradeQuery.data[0]!);
        }
    }, [gradeQuery.data, selectedGrade.id]);

    // Fetch course sections based on selected grade
    const courseSectionQuery = useCustomReactQuery({
        queryKey: ['CourseSectionBySplitPoint', 'ByGrade', selectedGrade.id],
        axiosFn: () => COECourseSectionService.getCOECourseSectionBySplitPoint({ COEGradeId: selectedGrade?.id || 0 }),
        options: {
            enabled: !!selectedGrade.id,
            refetchOnWindowFocus: false
        }
    })

    const columns = useMemo<MRT_ColumnDef<COECourseSection>[]>(() => [
        {
            header: "Năm học học kỳ",
            accessorKey: "coeGradeSubject.activityPlan.name",
        },
        {
            header: "Mã môn học",
            accessorKey: "coeGradeSubject.coeSubject.code",
        },
        {
            header: "Môn học",
            accessorKey: "coeGradeSubject.coeSubject.name",
        },
        {
            header: "Nhóm học",
            accessorKey: "name",
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeGradeSubject.coeSubject.numberCredit",
        },
        {
            header: "Số tiết",
            accessorKey: "coeGradeSubject.coeSubject.numberPeriod",
        },
        {
            header: "Số lượng sinh viên",
            accessorKey: "studentQuantity",
        },
        {
            header: enumLabel_formulaType[enum_formulaType.attendace], // "Chuyên cần"
            accessorFn: (row) => (
                <Checkbox
                    readOnly
                    checked={row.coeGradeSubject?.coeSubjectFomulas?.some(
                        (f) => f.formulaType === enum_formulaType.attendace
                    )}
                />
            )
        },
        {
            header: enumLabel_formulaType[enum_formulaType.progress], // "Quá trình"
            accessorFn: (row) => (
                <Checkbox
                    readOnly
                    checked={row.coeGradeSubject?.coeSubjectFomulas?.some(
                        (f) => f.formulaType === enum_formulaType.progress
                    )}
                />
            )
        },
        {
            header: enumLabel_formulaType[enum_formulaType.final], // "Cuối kỳ"
            accessorFn: (row) => (
                <Checkbox
                    readOnly
                    checked={row.coeGradeSubject?.coeSubjectFomulas?.some(
                        (f) => f.formulaType === enum_formulaType.final
                    )}
                />
            )
        },
        // {
        //     header: "Tách điểm CLO",
        //     accessorFn(originalRow) {
        //         return (
        //             <>
        //                 <Checkbox
        //                     readOnly
        //                     checked={!!originalRow.isSplitPoint}
        //                 />
        //             </>
        //         )
        //     }
        // },
    ], []);

    return (
        <>
            <Group mb={12}>
                <Select
                    size="sm"
                    w={{ base: '100%', md: '40%', }}
                    placeholder={"Chọn khóa"}
                    label="Khóa"
                    data={gradeQuery.data?.map((item: COEGrade) => ({
                        value: item.id!.toString(),
                        label: `${item.code} - ${item.name}`
                    })) || []}
                    value={selectedGrade.id ? selectedGrade.id.toString() : null}
                    onChange={(value) => {
                        if (value && gradeQuery.data) {
                            const selected = gradeQuery.data.find((grade: COEGrade) =>
                                grade.id?.toString() === value
                            );
                            if (selected) {
                                setSelectedGrade(selected);
                            }
                        }
                    }}
                    rightSection={gradeQuery.isLoading ? <Loader size="xs" /> : undefined}
                />
            </Group>
            <CustomFieldset title="Danh sách nhóm học">

                <CustomDataTable
                    isLoading={courseSectionQuery.isLoading}
                    isError={courseSectionQuery.isError}
                    columns={columns}
                    data={courseSectionQuery.data || []}
                    initialState={{
                        density: "md",
                        pagination: { pageIndex: 0, pageSize: 30 },
                    }}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <Button
                                size="sm" color="indigo" radius="sm"
                                // onClick={async () => {
                                //     const selectedIds = table
                                //         .getSelectedRowModel()
                                //         .flatRows
                                //         .map(row => row.original.id)
                                //         .filter((id): id is number => typeof id === 'number');

                                //     if (selectedIds.length === 0) {
                                //         notifications.show({
                                //             title: "Thông báo",
                                //             message: "Vui lòng chọn ít nhất một nhóm học.",
                                //             color: "yellow",
                                //             autoClose: 3000,
                                //         });
                                //         return;
                                //     }

                                //     try {
                                //         await service_COECourseSectionStudent.StudentSplitPoint({ body: selectedIds });

                                //         await queryClient.invalidateQueries(); // Invalidate and wait if needed

                                //         notifications.show({
                                //             title: "Thông báo",
                                //             message: "Thành công!",
                                //             color: "green",
                                //             autoClose: 5000,
                                //         });
                                //     } catch (error: any) {
                                //         console.error("SplitPoint error:", error);

                                //         notifications.show({
                                //             title: "Lỗi",
                                //             message: error?.response?.data?.message || "Đã xảy ra lỗi trong quá trình xử lý.",
                                //             color: "red",
                                //             autoClose: 5000,
                                //         });
                                //     }
                                // }}
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }}
                            >Tách điểm
                            </Button>
                        </Group>
                    )}
                >
                </CustomDataTable >
            </CustomFieldset>

        </>
    )
}