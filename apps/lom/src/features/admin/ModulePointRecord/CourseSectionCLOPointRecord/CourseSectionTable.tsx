'use client'

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable"
import { canUpdateCLOGradingForCourseSection } from "@/features/auth/PageAuthorization/CLO-grading-for-course-section.auth"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Button, Group, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconSquareRoundedPercentage } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import CourseSectionPointRecordContent from "./CourseSectionPointRecordContent"
import { questionType } from "./Interfaces/Enum"
import {
    ICourseSectionInfoViewModel
} from "./Interfaces/Interfaces"

interface ICourseSectionTableProps {
    gradeId?: number | null;
    formulaType?: number | null;
}

export default function CourseSectionTable(
    { gradeId, formulaType }: ICourseSectionTableProps
) {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const [isSummarizingPoint, setIsSummarizingPoint] = useState(false);

    const discPointRecordByCourseSection = useDisclosure(false)
    let [currentCourseSection, setCurrentCourseSection] = useState<ICourseSectionInfoViewModel | null>(null)
    const [tableSelectionState, setTableSelectionState] = useState<MRT_RowSelectionState>({});
    // let [selectedCourseSectionAndAssessmentInfo, setSelectedCourseSectionAndAssessmentInfo] = useState<ICourseSectionInfoViewModel[]>([]);


    const allCourseSectionByGradeAndByFormulaType = useQuery<ICourseSectionInfoViewModel[]>({
        queryKey: [`CourseSectionByGrade${gradeId}AndFormulaType${formulaType}`],
        queryFn: async () => {
            if (gradeId === null || formulaType === null) return []
            const res = await baseAxios.get(`COECourseSection/GetCOECourseSectionForCreatePoint?COEGradeId=${gradeId}&formulaType=${formulaType}`)
            return res.data.data || []
        },
        refetchOnWindowFocus: false
    })

    const getGradeSubjectIdList = (selectedCourseSectionAndAssessmentInfo: ICourseSectionInfoViewModel[]) => {
        let gradeSubjectIdList: number[] = [];
        selectedCourseSectionAndAssessmentInfo.forEach((courseSection: ICourseSectionInfoViewModel) => {
            if (!gradeSubjectIdList.find((id) => id === courseSection.coeGradeSubjectId)) {
                gradeSubjectIdList.push(courseSection.coeGradeSubjectId!);
            }
        });
        return gradeSubjectIdList;
    }

    const callAPISummaryCLOPoint = async (selectedCourseSectionAndAssessmentInfo: ICourseSectionInfoViewModel[]) => {
        setIsSummarizingPoint(true);
        let gradeSubjectIdList = getGradeSubjectIdList(selectedCourseSectionAndAssessmentInfo);
        if (gradeSubjectIdList.length === 0) {
            setIsSummarizingPoint(false);
            notifications.show({
                title: "Thông báo",
                message: "Chưa chọn đối tượng để tổng kết điểm.",
                color: "yellow",
                autoClose: 5000,
            });
            return;
        }

        try {
            let res = await baseAxios.post(`COECourseSectionStudent/StudentPointResult`, gradeSubjectIdList);
            if (res.data.isSuccess === 1) {
                allCourseSectionByGradeAndByFormulaType.refetch();
                setTableSelectionState({});
                notifications.show({
                    title: "Thông báo",
                    message: "Tổng kết điểm thành công.",
                    color: "green",
                    autoClose: 5000,
                });
            } else {
                throw new AxiosError('Lỗi tổng kết điểm');
            }

        } catch (error: any) {
            notifications.show({
                title: "Thông báo",
                message: "Hệ thống thực hiện tổng kết điểm không thành công. Vui lòng kiểm tra và thử lại.",
                color: "red",
                autoClose: 7000,
            });
        }
        setIsSummarizingPoint(false);
    }

    const columns = useMemo<MRT_ColumnDef<ICourseSectionInfoViewModel>[]>(() => [
        {
            header: "Năm học",
            accessorKey: "semesterName",
        },
        // {
        //     header: "Thứ tự",
        //     accessorFn(originalRow) {
        //         return "Chưa có dữ liệu"
        //     },
        // },
        {
            header: "Mã môn học",
            accessorKey: "subjectCode",
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName",
        },
        {
            header: "Nhóm học",
            accessorKey: "courseSectionCode",
        },
        {
            header: "Số tiết",
            accessorKey: "numberPeriod",
        },
        {
            header: "Nội dung đánh giá",
            accessorKey: "subjectAssessmentName",
        },
        {
            header: "Phương pháp đánh giá",
            accessorFn(originalRow) {
                return questionType[originalRow.subjectAssessmentQuestiontype!]
            },
        },
        {
            header: "Số lượng sinh viên",
            accessorKey: "totalStudent",
        },
        {
            header: "Số lượng điểm",
            accessorKey: "pointQuantity",
        },
        {
            header: "Số lượng điểm đã nhập",
            accessorKey: "pointQuantityActual",
        },
        // {
        //     header: "Đã tổng kết",
        //     accessorFn(originalRow) {
        //         return (
        //             <>
        //                 <Checkbox
        //                     readOnly
        //                     checked={false}
        //                 />
        //             </>
        //         )
        //     }
        // },

        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedFullName",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], []);


    return (
        <>
            <MyDataTable
                // setSelectedRow={setSelectedCourseSectionAndAssessmentInfo}
                columns={columns}
                data={allCourseSectionByGradeAndByFormulaType.data || []}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                    columnPinning: {
                        right: ['mrt-row-actions'],
                    },
                }}
                enableRowSelection={true}
                onRowSelectionChange={setTableSelectionState}
                state={{ rowSelection: tableSelectionState }}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {/* <PrototypeImportButton />
                        <PrototypeExportButton /> */}
                        <Button
                            loading={isSummarizingPoint}
                            leftSection={<IconSquareRoundedPercentage />} size="sm" color="indigo" radius="sm"
                            onClick={() => {
                                callAPISummaryCLOPoint(table.getSelectedRowModel().rows.map((row) => row.original));
                            }}>
                            Tổng kết điểm
                        </Button>
                        {/* <SyncDataEdusoftButton /> */}
                    </Group>
                )}
                renderRowActions={({ row, table }) => (
                    <>
                        <CustomFlexColumn>
                            {
                                canUpdateCLOGradingForCourseSection(userStore, userPermissionStore) && <Button
                                    variant="light"
                                    color="pink"
                                    size="xs"
                                    onClick={() => {
                                        setCurrentCourseSection(row.original);
                                        discPointRecordByCourseSection[1].open();
                                    }}
                                >
                                    Xem | Cập nhật
                                </Button>
                            }
                        </CustomFlexColumn>
                    </>
                )}
            >
            </MyDataTable >

            <Modal
                title={`Danh sách sinh viên đăng ký môn học: ${currentCourseSection?.subjectCode} - ${currentCourseSection?.subjectName}`}
                size={"100%"}
                opened={discPointRecordByCourseSection[0]}
                onClose={discPointRecordByCourseSection[1].close}
            >
                <CourseSectionPointRecordContent
                    courseSectionData={currentCourseSection}
                />
            </Modal>
        </>
    )
}