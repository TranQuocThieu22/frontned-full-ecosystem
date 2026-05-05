'use client'

import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Group, Select, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import CourseSectionTable from "./CourseSectionTable"
import { formulaType } from "./Interfaces/Enum"

export default function MainLayout() {
    let [allProgramsData, setAllProgramsData] = useState<any[]>([])
    const programIdState = useState<number | undefined | null>(null)
    const selectedProgramData = useState<any>()

    const gradeIdState = useState<number | undefined | null>(null)

    const formulaTypeState = useState<number | undefined | null>(null)

    const allPrograms = useQuery<any[]>({
        queryKey: ["ConfigCLOAssessmentLayout_allPrograms"],
        queryFn: async () => {
            gradeIdState[1](null)
            formulaTypeState[1](null)
            const res = await baseAxios.get("/COEProgram/getAll")
            programIdState[1](res.data.data[0].id)
            // setAllProgramsData(res.data.data)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allGradesByProgramId = useQuery<any[]>({
        queryKey: ["ConfigCLOAssessmentLayout_allGradesByProgramId", programIdState[0]],
        queryFn: async () => {
            formulaTypeState[1](null)
            if (programIdState[0] === null) return []
            const res = await baseAxios.get("/COEGrade/GetGradeByProgram?COEProgramId=" + programIdState[0])
            gradeIdState[1](res.data.data[0].id)
            formulaTypeState[1](1)
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    return (
        <>
            <Group mb={12}>
                <Select
                    w={{ base: '100%', md: '25%', }}
                    placeholder={"Chọn chương trình"}
                    label="Chương trình"
                    data={allPrograms.data?.map((item: any) => ({
                        value: item.id!.toString(),
                        label: item.code + " - " + item.name
                    })) || []}
                    value={programIdState[0]?.toString()}
                    onChange={(value, option) => {
                        programIdState[1](parseInt(value!))
                    }}
                />

                <Select
                    w={{ base: '100%', md: '25%', }}
                    placeholder={"Chọn khóa"}
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

                <Select
                    clearable
                    placeholder='Chọn hình thức đánh giá'
                    label='Hình thức đánh giá'
                    data={
                        Object.keys(formulaType)
                            .filter(key => isNaN(Number(key)))
                            .map((key) => ({
                                value: formulaType[key as keyof typeof formulaType].toString(),
                                label: key
                            }))
                    }
                    value={formulaTypeState[0] === null ? null : formulaTypeState[0]?.toString()}
                    onChange={(value, option) => {
                        formulaTypeState[1](parseInt(value!))
                    }}
                />
            </Group>
            <Group mt={16} mb={4}>
                <Text fw={500} size="sm">Danh sách nhóm học</Text>
            </Group>
            <CourseSectionTable
                gradeId={gradeIdState[0]}
                formulaType={formulaTypeState[0]}
            />
        </>
    )
}