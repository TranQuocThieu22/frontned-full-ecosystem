import { MyButton } from "@/components/ui/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/ui/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import useM_COEGradeSubject from "@/hooks/mutation-hooks/COEGradeSubject/useM_COEGradeSubject";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { ActionIcon, Center, Chip, Group, List, Stack, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconContrast2Filled, IconContrast2Off, IconHighlight, IconHighlightOff, IconLabelImportantFilled, IconSquareCheck, IconTag } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IGradeSubjectInfoViewModel, IPLOViewModel } from "../../Curriculum&Subject/ModuleGradeSubject/ConfigAMRI/Interfaces/Interfaces";
import useS_CoreSubject from "./useS_CoreSubject";

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

const title = "Chi tiết chương trình đào tạo khóa"

export default function ChangeGradeSubjectCoreStatusButton() {
    const [dataTableColorMode, setDataTableColorMode] = useState<number>(3);
    const [displayProficiencyMode, setDisplayProficiencyMode] = useState<number>(1)

    const disc = useDisclosure()
    const store = useS_CoreSubject()
    const mutation = useM_COEGradeSubject({
        endpointSuffix: "/updatelist"
    })
    const selectedGradeSubject = useState<IGradeSubjectInfoViewModel[]>([])

    const allGradeSubjectsByGrade = useQuery<IGradeSubjectInfoViewModel[]>({
        queryKey: ["GradeSubjectAMRI", store.state.gradeId],
        queryFn: async () => {
            if (!store.state.gradeId) return []
            const res = await baseAxios.get(`COEGrade/GetDetail?gradeId=${store.state.gradeId}&IsCore=false`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allPLOByGrade = useQuery<IPLOViewModel[]>({
        queryKey: ["GradePLO", store.state.gradeId],
        queryFn: async () => {
            if (!store.state.gradeId) return []
            let cols = "COEPIs";
            const res = await baseAxios.get(`COEPLO/GetCOEPLOByGrade?coeGradeId=${store.state.gradeId}&cols=${cols}`)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    function handleSelect() {
        if (selectedGradeSubject[0].length == 0) {
            notifications.show({
                message: "Vui lòng chọn"
            })
            return
        }
        mutation.mutate(selectedGradeSubject[0].map(item => ({
            id: item.id,
            code: item.code,
            name: item.name,
            concurrencyStamp: item.concurrencyStamp,
            isEnabled: true,
            coeGradeId: item.coeGradeId,
            coeSubjectId: item.coeSubjectId,
            activityPlanId: item.activityPlanId,
            coeSubjectGroupId: item.coeSubjectGroupId,
            order: item.order,
            armiValue: item.armiValue,
            isCore: true,
        })), {
            onSuccess: () => {
                utils_notification_show({ crudType: "create" })
                disc[1].close()
            }
        })
    }

    const changeDataTableColorMode = () => {
        setDataTableColorMode((prevMode) => {
            if (prevMode === 1) return 2; // Change from no color to colorful
            if (prevMode === 2) return 3; // Change from colorful to only green A
            return 1; // Change from only green A back to no color
        });
    }

    const changeProficiencyDisplayMode = () => {
        setDisplayProficiencyMode((prevMode) => {
            if (prevMode === 1) return 2; // Change from Highlight to HighlightOff
            if (prevMode === 2) return 3; // Change from HighlightOff to Tag
            return 1; // Change from Tag back to Highlight
        });
    }


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
                                        readOnly={true}
                                        color={dataTableColorMode === 1 ? "gray" : dataTableColorMode === 2 ? "green" : "green"}
                                        size="md" variant="filled"
                                        checked={row.original.armiValue === "A" ? true : false}
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
                                    // <Stack
                                    //     align="center"
                                    //     justify="center"
                                    //     gap="2"
                                    // >
                                    <Group gap={2}>
                                        {PI.code}
                                    </Group>
                                    // </Stack>
                                    :
                                    "Không có dữ liệu PI"
                                }
                            </>
                        )
                    },
                    Cell: ({ cell, row }) =>
                        <>
                            <DisplayARMIValue
                                MRIValue={row.original.coeGradeSubjectPIs!.find((item) => item.coepiId === PI.id)?.armiValue ?? null}
                                noColorTableData={dataTableColorMode === 1 || dataTableColorMode === 3}
                            />
                        </>
                    ,
                    size: 100,
                })
                ) as MRT_ColumnDef<IGradeSubjectInfoViewModel>[] ?? []),
            ]
        })
        ) as MRT_ColumnDef<IGradeSubjectInfoViewModel>[] ?? [])
    ], [allPLOByGrade.isFetching, dataTableColorMode, displayProficiencyMode])

    return (
        <>
            <MyButtonModal crudType="create" disclosure={disc} title={title} modalSize={'100%'}>
                {displayProficiencyMode === 3 &&
                    <ProficiencyDescriptionSectionHorizontal />
                }
                <MyDataTable
                    enableRowSelection
                    data={allGradeSubjectsByGrade.data || []}
                    columns={columns}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <MyButton crudType="select" onClick={handleSelect} />
                            <ActionIcon
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
                            </ActionIcon>
                        </Group>
                    )}
                    setSelectedRow={selectedGradeSubject[1]}
                />
            </MyButtonModal>
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

const DisplayARMIValue = ({ MRIValue, noColorTableData }: { MRIValue: string | null, noColorTableData: boolean }) => {
    const [MRIValueState, setMRIValue] = useState<string | null>(MRIValue);
    const getColorByValue = (value: string | null): string => {

        switch (value) {
            case 'I': return '#2196F3'; // Blue 
            case 'R': return '#FF9800'; // Orange
            case 'M': return '#F44336'; // Red 
            default: return '#757575';  // Default gray
        }
    };

    return (
        <>
            <Center>
                {
                    MRIValue === null ?
                        <></>
                        :
                        <Text
                            fw={noColorTableData ? 450 : 700}
                            style={{
                                padding: '4px 8px',
                                borderRadius: 0,
                                color: noColorTableData ? 'black' : getColorByValue(MRIValueState),
                                textAlign: 'center',
                                width: '100%'
                            }}
                        >
                            {MRIValueState}
                        </Text>
                }
            </Center>
        </>
    )
}

const ProficiencyType = [
    { value: PROFICIENCY["Kiến thức"], label: "Kiến thức" },
    { value: PROFICIENCY["Kỹ năng"], label: "Kỹ năng" },
    { value: PROFICIENCY["Mức độ tự chủ và trách nhiệm"], label: "Mức độ tự chủ và trách nhiệm" },
]


const ProficiencyDescriptionSectionHorizontal = () => {
    return (
        <>
            <List
                size="sm"
                center
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                {ProficiencyType.map((item, index) => (
                    <List.Item
                        mr={24}
                        key={index}
                        icon={
                            <ThemeIcon
                                variant="transparent" color={PROFICIENCY_COLOR[item.value]} size={24} mr={-8} radius="xl"
                            >
                                <IconLabelImportantFilled size={14} />
                            </ThemeIcon>
                        }
                    >
                        <Text
                            fw={500}
                            fz={14}
                            color="dimmed"
                        >
                            {item.label}
                        </Text>
                    </List.Item>
                ))}
            </List >
        </>
    )
}
