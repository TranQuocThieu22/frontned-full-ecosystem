'use client'

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable"
import { canUpdateCLOConfiguration } from "@/features/auth/PageAuthorization/CLO-configuration.auth"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Button, Flex, Group, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import ConfigCLOAssessmentModalContent from "./ConfigCLOAssessmentModalContent"
import { IGradeSubject } from "./Interfaces/Interfaces"

export default function GradeSubjectTable({ gradeId, gradeData, programData }: { gradeId: number | undefined | null, gradeData: any, programData: any }) {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const discConfigCLOAssessmentModal = useDisclosure(false)
    const currentValues = useState<IGradeSubject>({})
    const SelectedSubject = useState<IGradeSubject[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const allGradeSubjectsByGradeId = useQuery<IGradeSubject[]>({
        queryKey: ["GradeSubjectTable", gradeId],
        queryFn: async () => {
            if (!gradeId || gradeId === null) return []
            let cols = "COEGrade,ActivityPlan,COESubject,COEGradeSubjectAssessments,COEGradeSubjectAssessments.COEAssessment"
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${gradeId}&cols=${cols}`)
            return res.data.data
        },
        refetchOnWindowFocus: false,
        select: (data) => data.sort((subjectA, subjectB) => (subjectA.order ?? 0) - (subjectB.order ?? 0)),
    })

    const columns = useMemo<MRT_ColumnDef<IGradeSubject>[]>(() => [
        {
            header: "Mã môn học",
            accessorKey: "coeSubject.code"
        },
        {
            header: "Tên môn học",
            accessorKey: "coeSubject.name"
        },
        {
            header: "Thứ tự",
            accessorKey: "order"
        },
        {
            header: "Năm học Học kỳ",
            accessorKey: "activityPlan.name",
        },
        {
            header: "Số tín chỉ",
            accessorKey: "coeSubject.numberCredit"
        },
        {
            header: "Số tiết",
            accessorKey: "coeSubject.numberPeriod"
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "modifiedBy",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "modifiedWhen",
        //     accessorFn(originalRow) {
        //         return U0FormatToDateTimetring(new Date(originalRow.modifiedWhen!));
        //     },
        // }
    ], []);

    const handleOnClickConfigCLOAssessmentButton = (row: IGradeSubject) => {
        discConfigCLOAssessmentModal[1].open()
        currentValues[1](row)
    }

    const handleOnCloseConfigCLOAssessmentModal = () => {
        discConfigCLOAssessmentModal[1].close()
        currentValues[1]({})
    }

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGradeSubjectsByGradeId.data || []}
                state={{
                    isLoading: allGradeSubjectsByGradeId.isFetching,
                    rowSelection: rowSelection
                }}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                // enableRowSelection={true}
                setSelectedRow={SelectedSubject[1]}
                onRowSelectionChange={setRowSelection}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        {/* {canExportCLOConfiguration(userStore, userPermissionStore) &&
                            <Button leftSection={<IconTableExport />} color="teal" size="sm" radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message: "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    })
                                }
                                }
                            >Export
                            </Button>
                        } */}
                    </Group>
                )}
                renderRowActions={({ row }: any) => {
                    return (
                        <CustomCenterFull>
                            {canUpdateCLOConfiguration(userStore, userPermissionStore) &&
                                <Button
                                    color="indigo"
                                    onClick={() => handleOnClickConfigCLOAssessmentButton(row.original)}>
                                    Cập nhật
                                </Button>
                            }
                        </CustomCenterFull>
                    );
                }}>
            </MyDataTable >
            <Modal
                size={"100%"}
                centered={false}
                fullScreen={false}
                title={
                    <>
                        <Text fw={700} fz={18}>Chi tiết chuẩn đầu ra môn học</Text>
                    </>
                }
                opened={discConfigCLOAssessmentModal[0]}
                onClose={handleOnCloseConfigCLOAssessmentModal}
            >
                <Flex h={"80vh"} w={'80vw'} direction={"column"} gap={"md"} mt={5}>
                    <ConfigCLOAssessmentModalContent
                        gradeSubjectValues={currentValues[0]}
                        programData={programData}
                        gradeData={gradeData}
                    />
                </Flex>
            </Modal>
        </>
    )
}