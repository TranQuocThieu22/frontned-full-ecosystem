'use client'

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable"
import { canSaveCLOGradingForStudent } from "@/features/auth/PageAuthorization/CLO-grading-for-student.auth"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Button, Center, Group, Modal, NumberInput, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconTableMinus } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef } from "mantine-react-table"
import { useEffect, useMemo, useState } from "react"
import { IGSAssessment } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigCLOAssessment/TabAssessment/Interfaces"
import { useResponsiveModalSize } from "../CourseSectionCLOPointRecord/Hooks/useResponsiveModalSize"
import {
    COECourseSectionStudentPointInfoViewModel,
    COECourseSectionStudentPointMappedViewModel,
    IGSMethodByGSAssessmentId
} from "./Interfaces/Interfaces"

interface CLOPointRecordPerStudentTableProps {
    GSAssessmentId?: number | null,
    GSAssessmentInfo?: IGSAssessment
    studentId?: number | null,
    courseSectionId?: number | null,
    courseSectionStudentId?: number | null
}

export default function CLOPointRecordPerStudentTable(
    { GSAssessmentId, GSAssessmentInfo, studentId, courseSectionId, courseSectionStudentId }: CLOPointRecordPerStudentTableProps
) {

    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;

    const [mappedCLOPoint, setMappedCLOPoint] = useState<COECourseSectionStudentPointMappedViewModel[]>([])
    const [editedMappedCLOPoint, setEditedMappedCLOPoint] = useState<COECourseSectionStudentPointMappedViewModel[]>([]);
    const [selectedCLOPoints, setSelectedCLOPoints] = useState<COECourseSectionStudentPointMappedViewModel[]>([]);

    const modalSize = useResponsiveModalSize();
    let deleteAllCLOPointsPromptDisclosure = useDisclosure(false);

    const allCLOPointByStudent = useQuery<COECourseSectionStudentPointInfoViewModel[]>({
        queryKey: [`CLOPointByStudent${studentId}${courseSectionId}`],
        queryFn: async () => {
            if (studentId === null || courseSectionId === null) return []
            const res = await baseAxios.get(`/COECourseSectionStudent/GetCourseSectionStudentPoint?coeCourseSectionId=${courseSectionId}&studentId=${studentId}`)
            if (res.data.isSuccess === 1) {
                return res.data.data
            }
            else {
                throw new Error("Không tìm thấy Điểm của sinh viên được chọn");
            }
        },
        refetchOnWindowFocus: false
    })

    const allGSMethodByGSAssessmentId = useQuery<IGSMethodByGSAssessmentId[]>({
        queryKey: [`gradeSubjectInfoBySubjectAssessmentId${GSAssessmentId}`],
        queryFn: async () => {
            if (GSAssessmentId === null) return []
            let cols = "COECLO,COESubjectAssessment"
            const res = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?coeSubjectAssessmentId=${GSAssessmentId}&cols=${cols}`)
            if (res.data.isSuccess === 1) {
                return res.data.data
            }
            else {
                throw new Error("Không tìm thấy Hệ điểm CLO môn học được chọn");
            }
        },
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        let valid = validateBeforeMapping();
        if (!valid) {
            setMappedCLOPoint([]);
            return;
        }
        setMappedCLOPoint(mapCLOPointToGSMethod(allGSMethodByGSAssessmentId.data!, allCLOPointByStudent.data!));
    }, [
        allGSMethodByGSAssessmentId.dataUpdatedAt,
        allCLOPointByStudent.dataUpdatedAt
    ])

    const validateBeforeMapping = () => {
        if (
            courseSectionStudentId === null ||
            studentId === null ||
            GSAssessmentId === null ||
            allGSMethodByGSAssessmentId.isFetching ||
            allCLOPointByStudent.isFetching
        ) {
            return false;
        }
        else if (
            allGSMethodByGSAssessmentId.isError ||
            allGSMethodByGSAssessmentId.isRefetchError ||
            allCLOPointByStudent.isError ||
            allCLOPointByStudent.isRefetchError
        ) {
            notifications.show({
                title: "Thông báo",
                message: "Xảy ra lỗi khi tải dữ liệu, vui lòng thử lại sau.",
                color: "red",
            });
            return false;
        }
        return true;
    }

    const mapCLOPointToGSMethod = (GSMethods: IGSMethodByGSAssessmentId[], CLOPoints: COECourseSectionStudentPointInfoViewModel[]): COECourseSectionStudentPointMappedViewModel[] => {
        let mappedCLOPoint: COECourseSectionStudentPointMappedViewModel[] = [];

        if (CLOPoints.length === 0) {
            mappedCLOPoint = GSMethods.map((GSMethod: IGSMethodByGSAssessmentId) => {
                return {
                    id: 0,
                    code: null,
                    name: null,
                    concurrencyStamp: 'string',
                    isEnabled: true,
                    coeCourseSectionStudentId: courseSectionStudentId!,
                    coecloId: GSMethod.coecloId,
                    coecloCode: GSMethod.coeclo?.code || "Không có dữ liệu mã CLO",
                    coecloName: GSMethod.coeclo?.description || "Không có dữ liệu mô tả CLO",
                    coeSubjectMethodId: GSMethod.id,
                    maxPointBySubjectMethod: GSMethod.maxPoint,
                    point: null
                }
            })
            return mappedCLOPoint;
        }
        else if (CLOPoints.length > 0) {
            GSMethods.forEach((GSMethod: IGSMethodByGSAssessmentId) => {
                let existtingCLOPoint = CLOPoints.find((CLOPoint: COECourseSectionStudentPointInfoViewModel) =>
                    // CLOPoint.coecloId === GSMethod.coecloId && 
                    CLOPoint.coeSubjectMethodId === GSMethod.id
                )
                if (existtingCLOPoint) {
                    mappedCLOPoint.push({
                        id: existtingCLOPoint.id,
                        code: existtingCLOPoint.code,
                        name: existtingCLOPoint.name,
                        concurrencyStamp: existtingCLOPoint.concurrencyStamp,
                        isEnabled: existtingCLOPoint.isEnabled,
                        coeCourseSectionStudentId: existtingCLOPoint.coeCourseSectionStudentId,
                        coecloId: existtingCLOPoint.coecloId,
                        coecloCode: GSMethod.coeclo?.code || "Không có dữ liệu mã CLO",
                        coecloName: GSMethod.coeclo?.name || "Không có dữ liệu CLO",
                        coeSubjectMethodId: existtingCLOPoint.coeSubjectMethodId,
                        maxPointBySubjectMethod: GSMethod.maxPoint,
                        point: existtingCLOPoint.point
                    });
                }
                else {
                    mappedCLOPoint.push({
                        id: 0,
                        code: null,
                        name: null,
                        concurrencyStamp: 'string',
                        isEnabled: true,
                        coeCourseSectionStudentId: courseSectionStudentId!,
                        coecloId: GSMethod.coecloId,
                        coecloCode: GSMethod.coeclo?.code || "Không có dữ liệu mã CLO",
                        coecloName: GSMethod.coeclo?.name || "Không có dữ liệu CLO",
                        coeSubjectMethodId: GSMethod.id,
                        maxPointBySubjectMethod: GSMethod.maxPoint,
                        point: null
                    });
                }
            });
            return mappedCLOPoint;
        };
        return mappedCLOPoint;
    }

    // Handle changes for any field
    const handleFieldChange = (row: COECourseSectionStudentPointMappedViewModel, fieldName: keyof COECourseSectionStudentPointMappedViewModel, fieldValue: any) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
            fieldValue = null
        }

        setEditedMappedCLOPoint((prev) => {
            const existingIndex = prev.findIndex((item) => (item.id === row.id &&
                // item.coecloId === row.coecloId && 
                item.coeSubjectMethodId === row.coeSubjectMethodId)
            );
            if (existingIndex !== -1) {
                const editedMappedCLOPoint = [...prev];
                editedMappedCLOPoint[existingIndex] = {
                    ...editedMappedCLOPoint[existingIndex],
                    [fieldName]: fieldValue
                };
                return editedMappedCLOPoint;
            } else {
                return [...prev, {
                    ...row,
                    [fieldName]: fieldValue
                }];
            }
        });
    };

    const submitCLOPointForOneStudent = async () => {
        if (editedMappedCLOPoint.length === 0) {
            notifications.show({
                title: "Thông báo",
                message: "Không có thay đổi dữ liệu điểm để lưu",
                color: "yellow",
            });
            return;
        }
        let filteredCLOPoints = removeNullPointWithNullId(editedMappedCLOPoint);

        let res = await baseAxios.post(`/COECourseSectionStudent/Pointing`, filteredCLOPoints);
        if (res.data.isSuccess === 1) {
            setEditedMappedCLOPoint([]);
            notifications.show({
                title: "Thao tác thành công",
                message: "Điểm đã được lưu thành công",
                color: "green",
            })
            allCLOPointByStudent.refetch();
        }

        if (res.data.isSuccess === 0) {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Đã có lỗi xảy ra trong quá trình lưu điểm. Vui lòng kiểm tra lại",
                color: "red",
            })
        }
    }

    const removeNullPointWithNullId = (CLOPoints: COECourseSectionStudentPointMappedViewModel[]): COECourseSectionStudentPointMappedViewModel[] => {
        return CLOPoints.filter(item => !(item.id === 0 && item.point === null));
    }

    const deleteAllCLOPoints = async (selectedCLOPoints: COECourseSectionStudentPointMappedViewModel[]) => {
        let CLOPointsPayload: COECourseSectionStudentPointMappedViewModel[] = []
        let filteredMappedCLOPoints = removeNullPointWithNullId(selectedCLOPoints);
        filteredMappedCLOPoints.forEach((CLOPoint: COECourseSectionStudentPointMappedViewModel) => {
            CLOPointsPayload.push({
                ...CLOPoint,
                isEnabled: false
            })
        });

        let res = await baseAxios.post(`/COECourseSectionStudent/Pointing`, CLOPointsPayload);
        if (res.data.isSuccess === 1) {
            notifications.show({
                title: "Thao tác thành công",
                message: "Đã xóa tất cả điểm CLO của sinh viên trong nội dung đánh giá hiện tại.",
                color: "green",
            });
            setMappedCLOPoint([]);
            setEditedMappedCLOPoint([]);
            await allCLOPointByStudent.refetch();
            deleteAllCLOPointsPromptDisclosure[1].close();
            return;
        }
        if (res.data.isSuccess === 0) {
            deleteAllCLOPointsPromptDisclosure[1].close();
            notifications.show({
                title: "Thao tác thất bại",
                message: "Xóa điểm CLO không thành công. Vui lòng thử lại sau.",
                color: "red",
            });
            return;
        }
    }

    const columns = useMemo<MRT_ColumnDef<COECourseSectionStudentPointMappedViewModel>[]>(() => [
        {
            header: "CLO",
            accessorKey: "coecloCode",
            size: 64
        },
        {
            header: "Mô tả CLO",
            accessorKey: "coecloName",
            size: 680
        },
        {
            header: "Điểm tối đa",
            accessorKey: "maxPointBySubjectMethod",
            mantineTableHeadCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            {row.original.maxPointBySubjectMethod ?? 0}
                        </Center>
                    </>
                )
            },
        },
        {
            header: "Nhập điểm CLO",
            accessorKey: 'point',
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row, cell }) => {
                return <>
                    <Group gap={4}>
                        <NumberInput
                            w={'100%'}
                            variant="unstyled"
                            styles={{
                                input: {
                                    textAlign: 'center',
                                },
                            }}
                            placeholder="nhập điểm"
                            hideControls
                            max={row.original.maxPointBySubjectMethod === null ? 0 : row.original.maxPointBySubjectMethod}
                            min={0}
                            defaultValue={row.original.point ?? undefined}
                            onChange={(value) => {
                                handleFieldChange(row.original, "point", value)
                            }}
                        />
                    </Group>
                </>
            },
        },
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
                columns={columns}
                data={mappedCLOPoint}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {canSaveCLOGradingForStudent(userStore, userPermissionStore) && <Button
                            disabled={editedMappedCLOPoint.length === 0}
                            color="blue"
                            onClick={submitCLOPointForOneStudent}
                        >
                            Lưu
                        </Button>}
                        {/* <PrototypeImportButton/>
                        <PrototypeExportButton/> */}
                        <Button
                            leftSection={<IconTableMinus />}
                            color="red"
                            onClick={() => {
                                let selectedCLOPoints = table.getSelectedRowModel().rows.map(row => row.original);
                                setSelectedCLOPoints(selectedCLOPoints.length > 0 ? selectedCLOPoints : mappedCLOPoint);
                                deleteAllCLOPointsPromptDisclosure[1].open()
                            }}>
                            Xóa
                        </Button>
                    </Group>
                )}>
            </MyDataTable >

            <Modal
                size={modalSize}
                opened={deleteAllCLOPointsPromptDisclosure[0]}
                onClose={deleteAllCLOPointsPromptDisclosure[1].close}
                title={
                    <Text fw={700}>Xóa điểm CLO</Text>
                }
            >
                <Stack>
                    {
                        selectedCLOPoints.length === mappedCLOPoint.length ?
                            <Text>Bạn đang thực hiện xóa <b>tất cả điểm CLO</b> của sinh viên trong nội dung đánh giá hiện tại.</Text>
                            :
                            <Text>Bạn đang thực hiện xóa <b>{selectedCLOPoints.length} điểm CLO</b> của sinh viên trong nội dung đánh giá hiện tại.</Text>
                    }
                    <p>Thao tác này <span style={{ fontWeight: 'bold', color: 'red' }}>không thể hoàn tác</span>.</p>
                    <Group justify="flex-end" mt="md">
                        <Button
                            w={100}
                            variant="white"
                            color="grey"
                            onClick={deleteAllCLOPointsPromptDisclosure[1].close}
                        >
                            QUAY LẠI
                        </Button>
                        <Button
                            w={100}
                            color="red" onClick={() => {
                                deleteAllCLOPoints(selectedCLOPoints);
                            }}>
                            XÓA
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}