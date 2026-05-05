'use client';

import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Button, Group, Modal, NumberInput, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { COECourseSectionStudentPointInfoViewModel, COECourseSectionStudentPointViewModel, IGSMethodByGSAssessmentId } from "../StudentCLOPointRecord/Interfaces/Interfaces";
import { useResponsiveModalSize } from "./Hooks/useResponsiveModalSize";
import { COECourseSectionStudentPointMappedViewModel, Gender, ICourseSectionInfoViewModel, ICourseSectionStudentInfoViewModel, IcourseSectionStudentPoint } from "./Interfaces/Interfaces";

interface ICourseSectionPointRecordContentProps {
    courseSectionData?: ICourseSectionInfoViewModel | null
}

export default function CourseSectionPointRecordContent({ courseSectionData }: ICourseSectionPointRecordContentProps) {
    const modalSize = useResponsiveModalSize();

    let deleteAllCLOPointsPromptDisclosure = useDisclosure(false);

    const [mappedCLOPointsPerStudentList, setMappedCLOPointsPerStudentList] = useState<COECourseSectionStudentPointMappedViewModel[]>([])
    const [editedCLOPoints, setEditedCLOPoints] = useState<COECourseSectionStudentPointViewModel[]>([]);

    const allGSMethodByGSAssessmentId = useQuery<IGSMethodByGSAssessmentId[]>({
        queryKey: [`gradeSubjectInfoBySubjectAssessmentId${courseSectionData?.subjectAssessmentId}`],
        queryFn: async () => {
            if (!courseSectionData || courseSectionData.subjectAssessmentId === null) return []
            let cols = "COECLO,COESubjectAssessment"
            const res = await baseAxios.get(`/COESubjectMethod/FindBySubjectAssessment?coeSubjectAssessmentId=${courseSectionData?.subjectAssessmentId}&cols=${cols}`)

            if (res.data.isSuccess === 1) {
                return res.data.data
            } else {
                throw new Error("Không tải được cấu trúc điểm CLO");
            }
        },
        refetchOnWindowFocus: false,
    })

    const allStudentByCourseSection = useQuery<ICourseSectionStudentInfoViewModel[]>({
        queryKey: [`allStudentByCourseSection${courseSectionData?.courseSectionId}`],
        queryFn: async () => {
            if (!courseSectionData || courseSectionData.courseSectionId === null) return []
            const res = await baseAxios.get(`/COECourseSectionStudent/GetStudentByCourseSection?COECourseSectionId=${courseSectionData.courseSectionId}`)
            if (res.data.isSuccess === 1) {
                return res.data.data
            } else {
                throw new Error("Không tải được dữ liệu sinh viên");
            }
        },
        refetchOnWindowFocus: false,
    })

    const allCLOPointFromAllStudent = useQuery<COECourseSectionStudentPointInfoViewModel[]>({
        enabled: allGSMethodByGSAssessmentId.isFetched && allStudentByCourseSection.isFetched,
        queryKey: [`CLOPointByStudent${courseSectionData?.subjectAssessmentId}${courseSectionData?.courseSectionId}`],
        queryFn: async () => {
            if (!courseSectionData || courseSectionData.courseSectionId === null) return []
            const res = await baseAxios.get(`/COECourseSectionStudent/GetCourseSectionStudentPoint?coeCourseSectionId=${courseSectionData.courseSectionId}`)
            if (res.data.isSuccess === 1) {
                return res.data.data
            } else {
                throw new Error("Không tải được dữ liệu điểm CLO sinh viên");
            }
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        let valid = (allStudentByCourseSection.status === 'success' && allGSMethodByGSAssessmentId.status === 'success' && allCLOPointFromAllStudent.status === 'success');
        if (!valid) {
            setMappedCLOPointsPerStudentList([]);
            return;
        }
        setMappedCLOPointsPerStudentList(mapCLOPointToStudent(allStudentByCourseSection.data!, allGSMethodByGSAssessmentId.data!, allCLOPointFromAllStudent.data!));
    }, [allCLOPointFromAllStudent.dataUpdatedAt]);


    const mapCLOPointToStudent = (courseSectionStudent: ICourseSectionStudentInfoViewModel[], GSMethod: IGSMethodByGSAssessmentId[], allCLOPointFromAllStudent: COECourseSectionStudentPointInfoViewModel[]) => {
        if (allCLOPointFromAllStudent.length === 0) {
            return courseSectionStudent.map((courseSectionStudent: ICourseSectionStudentInfoViewModel) => {
                return {
                    courseSectionStudentInfo: courseSectionStudent,
                    courseSectionStudentPoint: [...GSMethod.map((GSMethod: IGSMethodByGSAssessmentId) => {
                        return createNewCLOPoint(courseSectionStudent, GSMethod);
                    })]
                }
            })
        }
        else {
            return courseSectionStudent.map((courseSectionStudent: ICourseSectionStudentInfoViewModel) => {
                return {
                    courseSectionStudentInfo: courseSectionStudent,
                    courseSectionStudentPoint:
                        [...GSMethod.map((GSMethod: IGSMethodByGSAssessmentId) => {
                            let existingCLOPoint = allCLOPointFromAllStudent.find((CLOPoint: COECourseSectionStudentPointInfoViewModel) =>
                                CLOPoint.coeCourseSectionStudentId === courseSectionStudent.id
                                && CLOPoint.coeSubjectMethodId === GSMethod.id
                                // && CLOPoint.coecloId === GSMethod.coecloId
                            );

                            if (existingCLOPoint) {
                                return {
                                    id: existingCLOPoint.id,
                                    code: existingCLOPoint.code,
                                    name: existingCLOPoint.name,
                                    concurrencyStamp: existingCLOPoint.concurrencyStamp,
                                    isEnabled: existingCLOPoint.isEnabled,
                                    coeCourseSectionStudentId: existingCLOPoint.coeCourseSectionStudentId,
                                    coecloId: existingCLOPoint.coecloId,
                                    coecloName: GSMethod.coeclo?.name || "Không có dữ liệu CLO",
                                    coeSubjectMethodId: existingCLOPoint.coeSubjectMethodId,
                                    maxPointBySubjectMethod: GSMethod.maxPoint,
                                    point: existingCLOPoint.point
                                }
                            }
                            else {
                                return createNewCLOPoint(courseSectionStudent, GSMethod);
                            }
                        })]
                }
            })
        }
    }

    const createNewCLOPoint = (courseSectionStudent: ICourseSectionStudentInfoViewModel, GSMethod: IGSMethodByGSAssessmentId) => {
        return {
            id: 0,
            code: null,
            name: null,
            concurrencyStamp: 'string',
            isEnabled: true,
            coeCourseSectionStudentId: courseSectionStudent.id,
            coecloId: GSMethod.coecloId,
            coecloName: GSMethod.coeclo?.name || "Không có dữ liệu CLO",
            coeSubjectMethodId: GSMethod.id,
            maxPointBySubjectMethod: GSMethod.maxPoint,
            point: null
        }
    }

    const handleInputCLOPoint = (CLOPoint: any, row: COECourseSectionStudentPointMappedViewModel, CLOId: number | null, coeSubjectMethodId: number | null) => {
        if (CLOPoint === undefined || CLOPoint === null || CLOPoint === "") CLOPoint = null
        setEditedCLOPoints((prev) => {
            let currentCLOPoint = row.courseSectionStudentPoint!.find((studentCLOPoint: IcourseSectionStudentPoint) =>
                // studentCLOPoint.coecloId === CLOId &&
                studentCLOPoint.coeSubjectMethodId === coeSubjectMethodId
            )

            const existingIndex = prev.findIndex((editedCLOPoints) =>
                editedCLOPoints.coeCourseSectionStudentId === currentCLOPoint?.coeCourseSectionStudentId &&
                editedCLOPoints.coeSubjectMethodId === currentCLOPoint?.coeSubjectMethodId
            );

            if (existingIndex !== -1) {
                const updatedStudentCLOPoints = [...prev];
                updatedStudentCLOPoints[existingIndex] = {
                    ...updatedStudentCLOPoints[existingIndex],
                    point: CLOPoint,
                }
                return updatedStudentCLOPoints;

            } else {
                if (currentCLOPoint!.id === 0) {
                    const newStudentCLOPoint = {
                        id: 0,
                        code: null,
                        name: null,
                        concurrencyStamp: 'string',
                        isEnabled: true,
                        coeCourseSectionStudentId: row.courseSectionStudentInfo!.id,
                        coecloId: CLOId,
                        coeSubjectMethodId: coeSubjectMethodId,
                        point: CLOPoint
                    };
                    return [...prev, newStudentCLOPoint];

                } else {
                    return [
                        ...prev,
                        {
                            id: currentCLOPoint!.id,
                            code: currentCLOPoint!.code,
                            name: currentCLOPoint!.name,
                            concurrencyStamp: currentCLOPoint!.concurrencyStamp,
                            isEnabled: currentCLOPoint!.isEnabled,
                            coeCourseSectionStudentId: currentCLOPoint!.coeCourseSectionStudentId,
                            coecloId: CLOId,
                            coeSubjectMethodId: coeSubjectMethodId,
                            point: CLOPoint
                        }
                    ];
                }

            }

        });
    };

    const mapCLOPointAccordingToGSMethod = (studentCLOPointList: IcourseSectionStudentPoint[], GSMethod: IGSMethodByGSAssessmentId) => {
        if (!studentCLOPointList || studentCLOPointList.length === 0) return 0;

        let result = studentCLOPointList.find((studentCLOPoint: IcourseSectionStudentPoint) =>
            // studentCLOPoint.coecloId === GSMethod.coecloId &&
            studentCLOPoint.coeSubjectMethodId === GSMethod.id
        )
        if (!result || !result.point || result.point === null) return undefined;
        return result.point;
    }

    const removeNullPointWithNullId = (editedCLOPoints: COECourseSectionStudentPointViewModel[]) => {
        return editedCLOPoints.filter(item => !(item.id === 0 && item.point === null));
    }

    const submitStudentCLOPoints = async () => {
        let filteredCLOPoints = removeNullPointWithNullId(editedCLOPoints);
        if (filteredCLOPoints.length === 0) {
            notifications.show({
                title: "Thông báo",
                message: "Không có sự thay đổi điểm CLO nào để lưu",
                color: "yellow",
            });
            return;
        }
        let res = await baseAxios.post(`/COECourseSectionStudent/Pointing`, filteredCLOPoints);
        if (res.data.isSuccess === 1) {
            notifications.show({
                title: "Thao tác thành công",
                message: "Điểm CLO đã được cập nhật thành công",
                color: "green",
            });
            setEditedCLOPoints([]);
            allCLOPointFromAllStudent.refetch();
            return;
        }

        if (res.data.isSuccess === 0) {
            notifications.show({
                title: "Thao tác thât bại",
                message: "Cập nhật điểm CLO không thành công. Vui lòng kiểm tra lại dữ liệu.",
                color: "red",
            });
            return;
        }
    }

    const studentPointTableMRTColumns = useMemo<MRT_ColumnDef<COECourseSectionStudentPointMappedViewModel>[]>(() => [
        {
            header: "Mã môn học",
            id: "subjectCode",
            accessorFn(originalRow) {
                return <>
                    {courseSectionData?.subjectCode || "Không có dữ liệu"}
                </>
            },
        },
        {
            header: "Tên môn học",
            id: "subjectName",
            accessorFn(originalRow) {
                return <>
                    {courseSectionData?.subjectName || "Không có dữ liệu"}
                </>
            },
        },
        {
            header: "Mã sinh viên",
            id: "studentCode",
            accessorKey: "courseSectionStudentInfo.user.code",
            size: 100,
        },
        {
            header: "Họ tên",
            id: "studentFullName",
            accessorKey: "courseSectionStudentInfo.user.fullName",
        },
        {
            header: "Ngày sinh",
            accessorFn(originalRow) {
                return (
                    <>
                        {originalRow.courseSectionStudentInfo?.user?.dateOfBirth === null ?
                            "Không có dữ liệu"
                            :
                            dateUtils.toDDMMYYYY(new Date(originalRow.courseSectionStudentInfo?.user?.dateOfBirth!))
                        }
                    </>
                )
            },
            size: 100,
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return (
                    <>
                        {originalRow.courseSectionStudentInfo?.user?.gender === null ?
                            "Chưa có dữ liệu" :
                            Gender[originalRow.courseSectionStudentInfo?.user?.gender!]
                        }
                    </>
                )
            },
            size: 80,
        },
        {
            header: "Mã lớp",
            accessorFn(originalRow) {
                return <>
                    Chưa có dữ liệu
                </>
            },
            size: 120,
        },
        {
            header: "Mã khóa",
            accessorFn(originalRow) {
                return <>
                    Chưa có dữ liệu
                </>
            },
            size: 120,
        },
        ...(allGSMethodByGSAssessmentId.data?.map((GSMethod, index) => ({
            id: `GSMethod-${GSMethod.id}`,
            header: `${GSMethod.coeclo?.code}` || "Không có dữ liệu CLO",
            Header(props) {
                return (
                    <>
                        {GSMethod.coeclo?.code ?
                            <Stack
                                pl={12}
                                align="center"
                                justify="center"
                                gap="2"
                                w={'64px'}
                            >
                                <Group gap={2}>
                                    {GSMethod.coeclo?.code}
                                </Group>
                                <Group gap={2}>
                                    {GSMethod.maxPoint && `(0 - ${GSMethod.maxPoint})`}
                                </Group>
                            </Stack>
                            :
                            "Không có dữ liệu CLO"
                        }
                    </>
                )
            },
            Cell: ({ row, cell }) => {
                return (
                    <>
                        <NumberInput
                            allowNegative={false}
                            max={GSMethod.maxPoint ?? 0}
                            min={0}
                            variant="unstyled"
                            placeholder="nhập điểm"
                            hideControls
                            defaultValue={
                                mapCLOPointAccordingToGSMethod(row.original.courseSectionStudentPoint || [], GSMethod)
                            }
                            onChange={(value) =>
                                handleInputCLOPoint(
                                    value,
                                    row.original,
                                    GSMethod.coeclo!.id!,
                                    GSMethod.id!
                                )
                            }
                            styles={{
                                input: {
                                    textAlign: 'center',
                                },
                            }}
                        />
                    </>
                );
            },
            size: 80,
        })
        ) as MRT_ColumnDef<COECourseSectionStudentPointMappedViewModel>[] ?? []),
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
    ], [allGSMethodByGSAssessmentId.dataUpdatedAt]);

    const deleteAllCLOPoints = async () => {
        if (mappedCLOPointsPerStudentList.length === 0) {
            notifications.show({
                title: "Thông báo",
                message: "Không có điểm nào để xóa",
                color: "yellow",
            });
            return;
        }
        let CLOPointsPayload: COECourseSectionStudentPointViewModel[] = []
        mappedCLOPointsPerStudentList.forEach((studentCLOPoint: COECourseSectionStudentPointMappedViewModel) => {
            studentCLOPoint.courseSectionStudentPoint!.forEach((CLOPoint: IcourseSectionStudentPoint) => {
                CLOPointsPayload.push({
                    ...CLOPoint,
                    isEnabled: false
                })
            })
        });

        const filteredCLOPoints = removeNullPointWithNullId(CLOPointsPayload);

        let res = await baseAxios.post(`/COECourseSectionStudent/Pointing`, filteredCLOPoints);
        if (res.data.isSuccess === 1) {
            notifications.show({
                title: "Thao tác thành công",
                message: "Đã xóa tất cả điểm CLO của sinh viên trong lớp này.",
                color: "green",
            });
            setMappedCLOPointsPerStudentList([]);
            setEditedCLOPoints([]);
            allCLOPointFromAllStudent.refetch();
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
        }
    }

    return (
        <>
            <CustomDataTable
                data={mappedCLOPointsPerStudentList || []}
                columns={studentPointTableMRTColumns}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 30 },
                    columnPinning: {
                        left: ['mrt-row-select', 'mrt-row-numbers', 'studentCode', 'studentFullName'],
                    }
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <Button
                            leftSection={<IconDeviceFloppy />}
                            color="blue"
                            onClick={submitStudentCLOPoints}
                        >
                            Lưu
                        </Button>
                        {/* <Button
                            leftSection={<IconTableMinus />}
                            color="red"
                            onClick={() => deleteAllCLOPointsPromptDisclosure[1].open()}
                        >Xóa</Button>
                        <PrototypeExportButton /> */}
                    </Group>
                )}
            />

            <Modal
                size={modalSize}
                opened={deleteAllCLOPointsPromptDisclosure[0]}
                onClose={deleteAllCLOPointsPromptDisclosure[1].close}
                title={
                    <Text fw={700}>Xóa tất cả điểm CLO</Text>
                }
            >
                <Stack>
                    <p>Bạn có chắc chắn muốn xóa tất cả điểm CLO của sinh viên trong nhóm học <b>{courseSectionData?.courseSectionName ?? ''}</b> không? Thao tác này <span style={{ fontWeight: 'bold', color: 'red' }}>không thể hoàn tác</span>.</p>
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
                                deleteAllCLOPoints();
                            }}>
                            XÓA
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}