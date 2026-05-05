import { ClassService } from "@/api/services/ClassService";
import { service_COEGrade } from "@/api/services/service_COEGrade";
import { service_COEGradeSubject } from "@/api/services/service_COEGradeSubject";
import { service_COEProgram } from "@/api/services/service_COEProgram";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useEffect } from "react";
import Shared_FilterInfo from "../shared/Shared_FilterInfo";
import { useStore_CLOResultByClassReport } from "./useStore_CLOResultByClassReport";

export default function Feat_FilterInfo() {
    const store = useStore_CLOResultByClassReport()
    const activityPlanStore = useS_Shared_ActivityPlan();

    const programQuery = useCustomReactQuery({
        queryKey: ['programs'],
        axiosFn: () => {
            return service_COEProgram.getAll()
        }
    })
    const gradeQuery = useCustomReactQuery({
        queryKey: ['grades', 'byProgramId', store.state.programId],
        options: {
            enabled: !!store.state.programId
        },
        axiosFn: () => {
            return service_COEGrade.getGradeByProgram({
                COEProgramId: parseInt(store.state.programId!)
            })
        }
    })
    const classQuery = useCustomReactQuery({
        queryKey: ['classes', 'byGradeId', store.state.gradeId],
        options: {
            enabled: !!store.state.gradeId
        },
        axiosFn: () => {
            return ClassService.findByGradeAndActivityPlanId({
                coeGradeId: parseInt(store.state.gradeId!),
                activityPlanId: activityPlanStore.state.ActivityPlan?.id
            })
        }
    })
    const subjectQuery = useCustomReactQuery({
        queryKey: ['subjects', 'byClassId', store.state.gradeId],
        options: {
            enabled: !!store.state.gradeId
        },
        axiosFn: () => {
            return service_COEGradeSubject.getSubjectByGrade({
                COEGradeId: parseInt(store.state.gradeId!),
                cols: "COESubject"
            })
        }
    })

    useEffect(() => {
        // Khi chọn lại chương trình, reset các giá trị phụ thuộc
        store.setProperty("gradeId", null)
        store.setProperty("classId", null)
        store.setProperty("subjectId", null)
    }, [store.state.programId])

    useEffect(() => {
        // Khi chọn lại khóa (grade), reset lớp và môn học
        store.setProperty("classId", null)
        store.setProperty("subjectId", null)
    }, [store.state.gradeId])

    useEffect(() => {
        // Khi chọn lại lớp, reset môn học
        store.setProperty("subjectId", null)
    }, [store.state.classId])

    return (
        <Shared_FilterInfo
            programSelectProps={{
                data: programQuery.data?.map(item => ({
                    label: item.name || "",
                    value: item.id?.toString()!
                })) || [],
                value: store.state.programId,
                onChange: (val) => {
                    const selected = programQuery.data?.find(item => item.id == parseInt(val!))
                    store.setProperty("programId", selected?.id?.toString())
                    store.setProperty("programName", selected?.name)
                },
                isLoading: programQuery.isLoading,
                isError: programQuery.isError
            }}
            gradeSelectProps={{
                data: gradeQuery.data?.map(item => ({
                    label: item.name || "",
                    value: item.id?.toString()!
                })),
                ...(store.state.programId == undefined && {
                    placeholder: "Vui lòng chọn chương trình"
                }),
                value: store.state.gradeId,
                onChange: (val) => {
                    const selected = gradeQuery.data?.find(item => item.id == parseInt(val!))
                    store.setProperty("gradeId", selected?.id?.toString())
                    store.setProperty("gradeName", selected?.name)
                },
                isLoading: gradeQuery.isLoading,
                isError: gradeQuery.isError,
                disabled: store.state.programId == undefined
            }}
            classSelectProps={{
                data: classQuery.data?.map(item => ({
                    label: item.name || "",
                    value: item.id?.toString()!
                })),
                ...(store.state.gradeId == undefined && {
                    placeholder: "Vui lòng chọn khóa"
                }),
                value: store.state.classId,
                onChange: (val) => {
                    const selected = classQuery.data?.find(item => item.id == parseInt(val!))
                    store.setProperty("classId", selected?.id?.toString())
                    store.setProperty("className", selected?.name)
                },
                isLoading: classQuery.isLoading,
                isError: classQuery.isError,
                disabled: store.state.gradeId == undefined
            }}
            subjectSelectProps={{
                data: subjectQuery.data?.map(ittem => ({
                    label: ittem.coeSubject?.name || "",
                    value: ittem.id?.toString()!
                })),
                ...(store.state.gradeId == undefined && {
                    placeholder: "Vui lòng chọn khóa"
                }),
                value: store.state.subjectId,
                onChange: (val) => {
                    const selected = subjectQuery.data?.find(item => item.id == parseInt(val!))
                    store.setProperty("subjectId", selected?.id?.toString())
                    store.setProperty("subjectName", selected?.name)
                },
                isLoading: subjectQuery.isLoading,
                isError: subjectQuery.isError,
                disabled: store.state.gradeId == undefined
            }}
        />
    )
}
