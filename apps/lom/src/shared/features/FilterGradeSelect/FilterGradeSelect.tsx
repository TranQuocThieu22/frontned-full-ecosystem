'use client'
import MySelect from "@/components/ui/Combobox/Select/MySelect";
import useQ_COEGrade_GetGradeByProgram from "@/hooks/query-hooks/COEGrade/useQ_COEGrade_GetGradeByProgram";
import useQ_COEProgram_GetAll from "@/hooks/query-hooks/COEProgram/useQ_COEProgram_GetAll";
import { Group } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useFilterGradeStore from "./useFilterGradeStore";

export default function FilterGradeSelect() {
    const pathname = usePathname();
    const store = useFilterGradeStore()
    const programs = useQ_COEProgram_GetAll()
    const grades = useQ_COEGrade_GetGradeByProgram({
        params: `?COEProgramId=${store.state.program?.id}`,
        option: {
            enabled: store.state.program != undefined
        }
    })

    useEffect(() => {
        // Load mặc định program đầu tiên
        if (!programs.data) return
        store.setProperty("program", programs.data[0])
    }, [programs.data, pathname])

    useEffect(() => {
        if (!grades.data) return
        if (grades.data.length == 0) {
            store.setProperty("noData", true)
            return
        }
        store.setProperty("noData", false)
        store.setProperty("grade", grades.data[0])
    }, [grades.data, pathname])

    return (
        <Group>
            <MySelect
                w={"420px"}
                label="Chương trình"
                searchable
                data={programs.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.program?.id?.toString()}
                onChange={(value, option) => {
                    store.setProperty("program", {
                        ...store.state.program,
                        id: parseInt(value!)
                    })
                }}
            />

            <MySelect
                w={"420px"}
                label="Khóa"
                searchable
                data={grades.data?.map(item => ({
                    value: item.id!.toString(),
                    label: item.code + " - " + item.name
                })) || []}
                value={store.state.grade?.id?.toString()}
                onChange={(value, option) => {
                    store.setProperty("grade", {
                        ...store.state.grade,
                        id: parseInt(value!),
                        code: option.label.split(" - ")[0]
                    })
                }}
            />
        </Group>
    )
}
