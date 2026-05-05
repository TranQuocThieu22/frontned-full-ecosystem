'use client'
import { ClassService } from "@/api/services/ClassService";
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import useQ_COEGrade_GetGradeByProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeByProgram";
import useQ_COEProgram_GetAll from "@/hooks/query-hooks/COEProgram/useQ_COEProgram_GetAll";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useEffect } from "react";
import useS_FilterClass from "./useS_FilterClass";

export default function F_FilterClass() {
    const store = useS_FilterClass()
    const programs = useQ_COEProgram_GetAll(`Cols=COEUnit`)
    const activityPlanStore = useS_Shared_ActivityPlan();

    const grades = useQ_COEGrade_GetGradeByProgram({
        params: `?COEProgramId=${store.state.program?.id}`,
        option: {
            enabled: store.state.program != undefined
        }
    })
    const classes = useCustomReactQuery({
        queryKey: ['classByGradeQuery', store.state.grade?.id],
        axiosFn: () => ClassService.findByGradeAndActivityPlanId({
            coeGradeId: store.state.grade?.id,
            activityPlanId: activityPlanStore.state.ActivityPlan?.id
        }),
        options: {
            enabled: store.state.grade != undefined
        }
    })

    useEffect(() => {
        // Load mặc định program đầu tiên
        if (!programs.data) return
        store.setProperty("program", programs.data[0])
    }, [programs.data])

    useEffect(() => {
        if (!grades.data) return
        if (grades.data.length == 0) {
            store.setProperty("noData", true)
            return
        }
        store.setProperty("noData", false)
        store.setProperty("grade", grades.data[0])
    }, [grades.data])

    useEffect(() => {
        if (!classes.data) return
        if (classes.data.length == 0) {
            store.setProperty("noData", true)
            return
        }
        store.setProperty("noData", false)
        store.setProperty("class", classes.data[0])
    }, [classes.data])

    return (
        <Group grow>
            <MySelect
                label="Chương trình"
                data={programs.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.program?.id?.toString()}
                onChange={(value, option) => {
                    if (!value) return
                    const selectedProgram = programs.data?.find(p => p.id === parseInt(value))
                    if (selectedProgram) {
                        store.setProperty("program", selectedProgram)
                        // Reset dependent selects when program changes
                        store.setProperty("grade", undefined)
                        store.setProperty("class", undefined)
                    }
                }}
            />

            <MySelect
                label="Khóa"
                data={grades.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.grade?.id?.toString()}
                onChange={(value, option) => {
                    if (!value) return
                    const selectedGrade = grades.data?.find(g => g.id === parseInt(value))
                    if (selectedGrade) {
                        store.setProperty("grade", selectedGrade)
                        // Reset class when grade changes
                        store.setProperty("class", undefined)
                    }
                }}
            />

            <MySelect
                label="Lớp"
                data={classes.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.class?.id?.toString()}
                onChange={(value, option) => {
                    if (!value) return
                    const selectedClass = classes.data?.find(c => c.id === parseInt(value))
                    if (selectedClass) {
                        store.setProperty("class", selectedClass)
                    }
                }}
            />
        </Group>
    )
}