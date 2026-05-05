'use client'

import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Group, List, Paper, Select, Text, ThemeIcon } from "@mantine/core"
import { IconLabelImportantFilled } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import GradeSubjectTable from "./GradeSubjectTable"

export default function MainLayout() {
    const [displayProficiencyMode, setDisplayProficiencyMode] = useState<number>(1)
    const programIdState = useState<number | undefined | null>(null)
    const selectedProgramData = useState<any>()
    const gradeIdState = useState<number | undefined | null>(null)
    let [allProgramsData, setAllProgramsData] = useState<any[]>([])

    const allPrograms = useQuery<any[]>({
        queryKey: ["ConfigCLOAssessmentLayout_allPrograms"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEProgram/getAll")
            programIdState[1](res.data.data[0].id)
            setAllProgramsData(res.data.data)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allGradesByProgramId = useQuery<any[]>({
        queryKey: ["ConfigCLOAssessmentLayout_allGradesByProgramId", programIdState[0]],
        queryFn: async () => {
            if (programIdState[0] === null) return []
            const res = await baseAxios.get("/COEGrade/GetGradeByProgram?COEProgramId=" + programIdState[0])
            gradeIdState[1](res.data.data[0].id)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        gradeIdState[1](null)
        allGradesByProgramId.refetch()
        selectedProgramData[1](allProgramsData.find((item: any) => item.id === programIdState[0]))
    }, [programIdState[0]])

    return (
        <>
            <Group justify="space-between">
                <Group w={{ base: '100%', md: '70%' }} gap={12}>
                    <Select
                        w={{ base: '100%', md: '45%', }}
                        placeholder={"Chọn chương trình"}
                        searchable
                        label="Chương trình"
                        data={allProgramsData.map((item: any) => ({
                            value: item.id!.toString(),
                            label: item.code + " - " + item.name
                        })) || []}
                        value={programIdState[0]?.toString()}
                        onChange={(value, option) => {
                            programIdState[1](parseInt(value!))
                        }}
                    />

                    <Select
                        w={{ base: '100%', md: '45%', }}
                        placeholder={"Chọn khóa"}
                        searchable
                        label="Khóa"
                        data={allGradesByProgramId.data?.map((item: any) => ({
                            value: item.id!.toString(),
                            label: item.code + " - " + item.name
                        })) || []}
                        value={gradeIdState[0] === null ? null : gradeIdState[0]?.toString()}
                        onChange={(value, option) => {
                            gradeIdState[1](parseInt(value!))
                        }}
                    />
                </Group>
                {displayProficiencyMode === 3 &&
                    <Paper p={12} w={{ base: '60%', sm: "60%", md: '20%' }} withBorder>
                        <ProficiencyDescriptionSection />
                    </Paper>
                }
            </Group>
            <Text mb={5} fw={600} fz={14}>Danh sách môn học</Text>
            <GradeSubjectTable
                gradeId={gradeIdState[0]}
                programData={selectedProgramData[0]}
                setProficiencyDisplayMode={setDisplayProficiencyMode}
                // displayProficiencyMode={displayProficiencyMode}
                displayProficiencyMode={1} // set cứng 1 màu highlight
            />
        </>
    )
}

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

const ProficiencyType = [
    { value: PROFICIENCY["Kiến thức"], label: "Kiến thức" },
    { value: PROFICIENCY["Kỹ năng"], label: "Kỹ năng" },
    { value: PROFICIENCY["Mức độ tự chủ và trách nhiệm"], label: "Mức độ tự chủ và trách nhiệm" },
]


export const ProficiencyDescriptionSection = () => {
    return (
        <>
            <List
                spacing="4"
                size="sm"
                center
            >
                {ProficiencyType.map((item, index) => (
                    <List.Item
                        key={index}
                        icon={
                            <ThemeIcon variant="transparent" color={PROFICIENCY_COLOR[item.value]} size={24} radius="xl">
                                <IconLabelImportantFilled size={14} />
                            </ThemeIcon>
                        }
                    >
                        <Text
                            fw={500} fz={14} color="dimmed"
                        >
                            {item.label}
                        </Text>
                    </List.Item>
                ))}
            </List>
        </>
    )
}
