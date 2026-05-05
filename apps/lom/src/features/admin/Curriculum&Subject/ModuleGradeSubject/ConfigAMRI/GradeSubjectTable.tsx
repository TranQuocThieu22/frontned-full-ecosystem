'use client'

import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable"
import { canSaveSubjectPIAIRMMatrix } from "@/features/auth/PageAuthorization/subject-PI-AIRM-matrix.auth"
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"
import { Button, Center, Chip, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconDeviceFloppy, IconLabelImportantFilled } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import { IGradeSubjectPIViewModel } from "./Interfaces/IGradeSubjectPI"
import { IGradeSubjectInfoViewModel, IPLOViewModel } from "./Interfaces/Interfaces"
import MRISelector from "./MRISelector"

enum PROFICIENCY {
    "Kiến thức" = 1,
    "Kỹ năng" = 2,
    "Mức độ tự chủ và trách nhiệm" = 3,
}

enum PROFICIENCY_COLOR {
    "cyan" = 1,
    "yellow.8" = 2,
    "red" = 3,
}

export default function GradeSubjectTable({
    gradeId,
    programData,
    displayProficiencyMode,
    setProficiencyDisplayMode
}: {
    gradeId: number | undefined | null,
    programData: any,
    displayProficiencyMode: number,
    setProficiencyDisplayMode: React.Dispatch<React.SetStateAction<number>>
}) {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const [dataTableColorMode, setDataTableColorMode] = useState<number>(3);
    const SelectedSubject = useState<IGradeSubjectInfoViewModel[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [editedGradeSubjectList, setEditedGradeSubjectList] = useState<IGradeSubjectInfoViewModel[]>([])
    const [editedGradeSubjectPIList, setEditedGradeSubjectPIList] = useState<IGradeSubjectPIViewModel[]>([])

    const handleEachMRIValueChange = (row: IGradeSubjectPIViewModel, COEPIId: number, MRIValue: any) => {
        if (MRIValue === undefined || MRIValue === null || MRIValue === "") MRIValue = null
        setEditedGradeSubjectPIList((prev) => {
            const existingIndex = prev.findIndex((editedGradeSubjectPI) =>
                editedGradeSubjectPI.id === row.id &&
                editedGradeSubjectPI.coeGradeSubjectId === row.coeGradeSubjectId &&
                editedGradeSubjectPI.coepiId === COEPIId
            );

            if (existingIndex !== -1) {
                const updatedGradeSubjectPIs = [...prev];
                updatedGradeSubjectPIs[existingIndex] = {
                    ...updatedGradeSubjectPIs[existingIndex],
                    armiValue: MRIValue,
                }
                return updatedGradeSubjectPIs;

            }
            else {
                if (row.id !== 0) {
                    const currentGradeSubjectPI = {
                        ...row,
                        ARMIValue: MRIValue,
                    };
                    return [...prev, currentGradeSubjectPI];
                } else {
                    const newGradeSubjectPI: IGradeSubjectPIViewModel = {
                        id: 0,
                        code: null,
                        name: null,
                        concurrencyStamp: 'string',
                        isEnabled: true,
                        coeGradeSubjectId: row.coeGradeSubjectId,
                        coepiId: COEPIId,
                        armiValue: MRIValue,
                    };
                    return [...prev, newGradeSubjectPI];
                }
            }

        });
    }

    const toggleARMIForGradeSubjectData = (row: IGradeSubjectInfoViewModel) => {
        setEditedGradeSubjectList((prev) => {
            const existingIndex = prev.findIndex((editedGradeSubject) => editedGradeSubject.id === row.id);
            if (existingIndex !== -1) {
                const updatedGradeSubjects = [...prev];
                updatedGradeSubjects[existingIndex] = {
                    ...updatedGradeSubjects[existingIndex],
                    armiValue: row.armiValue === "A" ? null : "A",
                    isCore: (row.isCore === null || row.isCore === false) ? true : false,
                }
                return updatedGradeSubjects;
            } else {
                return [...prev, {
                    ...row,
                    armiValue: row.armiValue === "A" ? null : "A",
                    isCore: (row.isCore === null || row.isCore === false) ? true : false,
                }];
            }
        });
    }

    const allGradeSubjectsByGrade = useQuery<IGradeSubjectInfoViewModel[]>({
        queryKey: ["GradeSubjectAMRI", gradeId],
        queryFn: async () => {
            if (!gradeId) return []
            const res = await baseAxios.get(`COEGrade/GetDetail?gradeId=${gradeId}`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allPLOByGrade = useQuery<IPLOViewModel[]>({
        queryKey: ["GradePLO", gradeId],
        queryFn: async () => {
            if (!gradeId) return []
            let cols = "COEPIs";
            const res = await baseAxios.get(`COEPLO/GetCOEPLOByGrade?coeGradeId=${gradeId}&cols=${cols}`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<IGradeSubjectInfoViewModel>[]>(() => [
        {
            header: ' ',
            id: 'emtyHeaderR1CSpan7',
            columns: [
                {
                    header: "Năm học Học kỳ",
                    accessorKey: "activityPlan.name",
                },
                {
                    header: "Thứ tự",
                    accessorKey: "order",
                    size: 50,
                },
                {
                    header: "Mã môn học",
                    accessorKey: "coeSubject.code"
                },
                {
                    header: "Tên môn học",
                    accessorKey: "coeSubject.name"
                },
                {
                    header: "Nhóm môn học",
                    accessorKey: "coeSubjectGroup.name"
                },
                {
                    header: "Số tín chỉ",
                    accessorKey: "coeSubject.numberCredit",
                    size: 50,
                },
                {
                    header: "Số tiết",
                    accessorKey: "coeSubject.numberPeriod",
                    size: 50,
                },
                {
                    header: "Đo lường",
                    accessorFn(originalRow) {
                        return originalRow.armiValue === null ? "" : originalRow.armiValue
                    },
                    Cell: ({ cell, row }) => {
                        return (
                            <>
                                <Center>
                                    <Chip
                                        // color={dataTableColorMode === 1 ? "gray" : dataTableColorMode === 2 ? "green" : "green"}
                                        color={"green"} // set cứng màu
                                        size="md" variant="filled"
                                        checked={row.original.armiValue === "A" ? true : false}
                                        onChange={() => {
                                            toggleARMIForGradeSubjectData(row.original)
                                            row.original.armiValue = row.original.armiValue === "A" ? null : "A"
                                        }}
                                    >
                                        A
                                    </Chip>
                                </Center>
                            </>
                        )
                    },
                    size: 140,
                },
            ]
        },
        ...(allPLOByGrade.data?.map((PLO, index) => ({
            id: `PLOCode-${PLO.code}`,
            // header: `${GSMethod.coeclo?.code} (≤${GSMethod.maxPoint ?? 0})` || "Không có dữ liệu CLO",
            Header(props) {
                return (
                    <>
                        {PLO.code ?
                            displayProficiencyMode === 1 || displayProficiencyMode === 2 ?
                                <>
                                    <Stack
                                        align="center"
                                        justify="center"
                                        gap="2"
                                    >
                                        {PLO.code}
                                        <Text
                                            fw={displayProficiencyMode === 2 ? 450 : 600}
                                            c={displayProficiencyMode === 2 ? "dimmed" : PLO.proficiency ? PROFICIENCY_COLOR[PLO.proficiency] : "gray"}
                                            style={{ whiteSpace: 'nowrap' }} truncate
                                        >
                                            {PLO.proficiency ? PROFICIENCY[PLO.proficiency] : ""}
                                        </Text>
                                    </Stack>
                                </>
                                :
                                <>
                                    <ProficiencyTag proficiency={PLO.proficiency} />
                                    <Group
                                        gap={32}
                                        justify="space-between"
                                        wrap="nowrap"
                                    >
                                        {PLO.code}
                                    </Group>
                                </>
                            :
                            "Không có dữ liệu PLO"
                        }
                    </>
                )
            },
            columns: [
                ...(PLO.coepIs?.map((PI, index) => ({
                    id: `${PLO.code}-${PI.code}`,
                    header: `${PI.code}` || "Không có dữ liệu PI",
                    Header(props) {
                        return (
                            <>
                                {PI.code ?
                                    <Group gap={2}>
                                        {PI.code}
                                    </Group>
                                    :
                                    "Không có dữ liệu PI"
                                }
                            </>
                        )
                    },
                    Cell: ({ cell, row }) =>
                        <>
                            <Center>
                                {
                                    <MRISelector
                                        gradeSubject={row.original}
                                        gradeSubjectPI={row.original.coeGradeSubjectPIs!.find((item) => item.coepiId === PI.id) ?? null}
                                        setSelectedMRIValue={handleEachMRIValueChange}
                                        COEPIId={PI.id!}
                                        noColorTableData={dataTableColorMode === 1 || dataTableColorMode === 3}
                                    />
                                }
                            </Center>
                        </>
                    ,
                    size: 100,
                })
                ) as MRT_ColumnDef<IGradeSubjectInfoViewModel>[] ?? []),
            ]
        })
        ) as MRT_ColumnDef<IGradeSubjectInfoViewModel>[] ?? [])
    ], [allPLOByGrade.isFetching, dataTableColorMode, displayProficiencyMode])

    const mapToGradeSubjectViewModel = (gradeSubjects: IGradeSubjectInfoViewModel[]) => {
        return gradeSubjects.map((gradeSubject) => {
            return {
                id: gradeSubject.id,
                code: gradeSubject.code,
                name: gradeSubject.name,
                concurrencyStamp: gradeSubject.concurrencyStamp,
                isEnabled: gradeSubject.isEnabled,
                coeGradeId: gradeSubject.coeGradeId,
                coeSubjectId: gradeSubject.coeSubjectId,
                coeSemesterId: gradeSubject.coeSemesterId,
                coeSubjectGroupId: gradeSubject.coeSubjectGroupId,
                order: gradeSubject.order,
                isCore: gradeSubject.isCore,
                armiValue: gradeSubject.armiValue,
                formulaType: gradeSubject.formulaType,
                courseSectionQuantity: gradeSubject.courseSectionQuantity,
                teachingUnitId: gradeSubject.teachingUnitId,
                measureUnitId: gradeSubject.measureUnitId,
                collectUnitId: gradeSubject.collectUnitId,
            }
        });
    }

    const callAPIUpdateGradeSubjectAndGSPI = async () => {
        if (editedGradeSubjectPIList.length === 0 && editedGradeSubjectList.length === 0) {
            notifications.show({
                title: "Thông báo",
                message: "Không có sự thay đổi dữ liệu nào để cập nhật.",
                color: "yellow",
                autoClose: 5000,
            });
            return;
        }

        let mappedGradeSubject = mapToGradeSubjectViewModel(editedGradeSubjectList);
        let resUpdateGradeSubject = await baseAxios.post(`COEGradeSubject/UpdateList`, mappedGradeSubject);

        let resCreateOrUpdateGradeSubjectPI = await baseAxios.post(`COEGradeSubjectPI/CreateOrUpdateList`, editedGradeSubjectPIList);

        if (resUpdateGradeSubject.data.isSuccess && resCreateOrUpdateGradeSubjectPI.data.isSuccess) {
            displaySavingDataSuccessToastAndClearLists();
        } else {
            toastSavingDataFailed();
        }
    }

    const displaySavingDataSuccessToastAndClearLists = () => {
        notifications.show({
            title: "Thông báo",
            message: "Lưu dữ liệu thành công.",
            color: "green",
            autoClose: 5000,
        });
        allGradeSubjectsByGrade.refetch();
        setEditedGradeSubjectPIList([]); // Clear the edited Grade Subject PI list
        setEditedGradeSubjectList([]); // Clear the edited Grade Subject list
    }

    const toastSavingDataFailed = () => {
        notifications.show({
            title: "Thông báo",
            message: "Lưu dữ liệu không thành công. Vui lòng kiểm tra lại.",
            color: "red",
            autoClose: 5000,
        });
    }

    const changeProficiencyDisplayMode = () => {
        setProficiencyDisplayMode((prevMode) => {
            if (prevMode === 1) return 2; // Change from Highlight to HighlightOff
            if (prevMode === 2) return 3; // Change from HighlightOff to Tag
            return 1; // Change from Tag back to Highlight
        });
    }

    const changeDataTableColorMode = () => {
        setDataTableColorMode((prevMode) => {
            if (prevMode === 1) return 2; // Change from no color to colorful
            if (prevMode === 2) return 3; // Change from colorful to only green A
            return 1; // Change from only green A back to no color
        });
    }

    return (
        <>
            <MyDataTable
                columns={columns}
                data={allGradeSubjectsByGrade.data || []}
                state={{
                    isLoading: allGradeSubjectsByGrade.isLoading,
                    rowSelection: rowSelection
                }}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                enableRowSelection={true}
                setSelectedRow={SelectedSubject[1]}
                onRowSelectionChange={setRowSelection}

                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        {canSaveSubjectPIAIRMMatrix(userStore, userPermissionStore) && <Button
                            leftSection={<IconDeviceFloppy />}
                            size="sm" color="indigo" radius="sm"
                            onClick={() => {
                                callAPIUpdateGradeSubjectAndGSPI();
                            }}
                        >Lưu</Button>}
                        {/* <PrototypeImportButton/>
                        <PrototypeExportButton/>
                        <PrototypeDeleteAllButton/> */}
                        {/* <ActionIcon
                            size={"lg"}
                            radius="sm"
                            variant={"light"}
                            color={dataTableColorMode === 1 ? "gray" : dataTableColorMode === 2 ? "pink" : "green"}
                            onClick={() => changeDataTableColorMode()}>
                            {dataTableColorMode === 1 ?
                                <IconContrast2Off
                                    style={{ width: '70%', height: '70%' }}
                                    stroke={1.5}
                                />
                                :
                                dataTableColorMode === 2 ?
                                    <IconContrast2Filled
                                        style={{ width: '70%', height: '70%' }}
                                        stroke={1.5}
                                    />
                                    :
                                    <IconSquareCheck
                                        style={{ width: '70%', height: '70%' }}
                                        stroke={1.5}
                                    />
                            }
                        </ActionIcon>
                        <ActionIcon
                            size={"lg"}
                            radius="sm"
                            variant={"light"}
                            color={displayProficiencyMode === 2 ? "gray" : displayProficiencyMode === 1 ? "yellow" : "cyan"}
                            onClick={changeProficiencyDisplayMode}>
                            {
                                displayProficiencyMode === 1 ?
                                    <IconHighlight
                                        style={{ width: '70%', height: '70%' }}
                                        stroke={1.5}
                                    />
                                    :
                                    displayProficiencyMode === 2 ?
                                        <IconHighlightOff
                                            style={{ width: '70%', height: '70%' }}
                                            stroke={1.5}
                                        />
                                        :
                                        <IconTag
                                            style={{ width: '70%', height: '70%' }}
                                            stroke={1.5}
                                        />
                            }
                        </ActionIcon> */}
                    </Group>
                )}
            // renderRowActions={({ row }: any) => {
            //     return (
            //         <CustomCenterFull>
            //             Thao tác
            //         </CustomCenterFull>
            //     );
            // }}
            >
            </MyDataTable >
        </>
    )
}

const ProficiencyTag = ({ proficiency }: { proficiency?: number }) => {
    return (
        <>
            <ThemeIcon
                variant="transparent"
                color={proficiency ? PROFICIENCY_COLOR[proficiency] : "gray"}
            >
                <IconLabelImportantFilled />
            </ThemeIcon>
        </>
    )
}

