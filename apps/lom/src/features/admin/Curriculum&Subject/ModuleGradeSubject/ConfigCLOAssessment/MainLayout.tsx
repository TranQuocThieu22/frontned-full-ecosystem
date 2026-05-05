'use client'

import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Group, Loader, Select } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import GradeSubjectTable from "./GradeSubjectTable"

export default function MainLayout() {
    let [allProgramsData, setAllProgramsData] = useState<any[]>([])
    const programIdState = useState<number | undefined | null>(null)
    const selectedProgramData = useState<any>()

    const gradeIdState = useState<number | undefined | null>(null)
    const selectedGradeData = useState<any>()

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
            if (!programIdState[0] || programIdState[0] === null) return []
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

    useEffect(() => {
        selectedGradeData[1](allGradesByProgramId.data?.find((item: any) => item.id === gradeIdState[0]))
    }, [gradeIdState[0]])

    return (
        <>
            <Group mb={12}>
                <Select
                    w={{ base: '100%', md: '25%', }}
                    placeholder={"Chọn chương trình"}
                    label="Chương trình"
                    disabled={allPrograms.isFetching}
                    rightSection={allPrograms.isFetching ? <Loader size="xs" /> : undefined}
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
                    w={{ base: '100%', md: '25%', }}
                    placeholder={"Chọn khóa"}
                    label="Khóa"
                    disabled={allGradesByProgramId.isFetching || gradeIdState[0] === null}
                    rightSection={allGradesByProgramId.isFetching ? <Loader size="xs" /> : undefined}
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
            <GradeSubjectTable
                gradeId={gradeIdState[0]}
                gradeData={selectedGradeData[0]}
                programData={selectedProgramData[0]}
            />
        </>
    )
}