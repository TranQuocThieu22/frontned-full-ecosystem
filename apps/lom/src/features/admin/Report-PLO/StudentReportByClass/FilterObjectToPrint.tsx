'use client'
import { canPrintClassStudentStudent } from "@/features/auth/PageAuthorization/PLO-report-result-students-per-class.auth";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Paper, Select, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSelect } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IPLOByGradeViewModel, IStudentReportViewModel } from "./Interfaces/Interface";
import PrintReport from "./PrintReport";

export default function FilterObjectToPrint() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
    const activityPlanStore = useS_Shared_ActivityPlan();
    // let [reportMockData, setReportMockData] = useState<any[]>([]);

    // useEffect(() => {
    //     let studentData = Array.from({ length: 54 }, (_, i) => ({
    //         id: i + 1,
    //         studentId: `QTKD${String(2000 + i).padStart(5, '0')}`,
    //         name: `Nguyễn Văn ${String.fromCharCode(65 + i % 26)}${i > 25 ? Math.floor(i / 26) : ''}`,
    //         plos: [
    //             { result: Math.floor(60 + Math.random() * 40), status: Math.random() > 0.3 },
    //             { result: Math.floor(60 + Math.random() * 40), status: Math.random() > 0.3 },
    //             { result: Math.floor(60 + Math.random() * 40), status: Math.random() > 0.3 },
    //             { result: Math.floor(60 + Math.random() * 40), status: Math.random() > 0.3 },
    //             { result: Math.floor(60 + Math.random() * 40), status: Math.random() > 0.3 },
    //         ]
    //     }));
    //     setReportMockData(studentData);
    // }, []);

    const programIdState = useState<number | undefined | null>(null)
    const selectedProgramData = useState<any>()

    const gradeIdState = useState<number | undefined | null>(null)
    const selectedGradeData = useState<any>()

    const classIdState = useState<number | undefined | null>(null)
    const selectedClassData = useState<any>()

    let [PLOReportByClassData, setPLOReportByClassData] = useState<IStudentReportViewModel[]>([])

    const allPrograms = useQuery<any[]>({
        queryKey: ["allPrograms"],
        queryFn: async () => {
            let cols = 'COEUnit'
            const res = await baseAxios.get(`/COEProgram/getAll?cols=${cols}`)
            programIdState[1](res.data.data[0].id)
            selectedProgramData[1](res.data.data[0])
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allGradesByProgramId = useQuery<any[]>({
        queryKey: ["allGradesByProgramId", programIdState[0]],
        queryFn: async () => {
            if (programIdState[0] === null) return []
            gradeIdState[1](null)
            const res = await baseAxios.get("/COEGrade/GetGradeByProgram?COEProgramId=" + programIdState[0])
            gradeIdState[1](res.data.data[0].id)
            selectedGradeData[1](res.data.data[0])
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const allClassesByGradeId = useQuery<any[]>({
        queryKey: ["allClassesByGradeId", gradeIdState[0]],
        queryFn: async () => {
            if (gradeIdState[0] === null) return []
            classIdState[1](null)
            const res = await baseAxios.get(`/Class/FindByGradeAndActivityPlanId?coeGradeId=${programIdState[0]}&activityPlanId=${activityPlanStore.state.ActivityPlan?.id}`)
            classIdState[1](res.data.data[0].id)
            selectedClassData[1](res.data.data[0])
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const PLOReportByClassDataQuery = useQuery<IStudentReportViewModel[]>({
        queryKey: ["PLOReport", classIdState[0]],
        queryFn: async () => {
            if (classIdState[0] === null) return []
            notifications.show({
                message: "Đang tải dữ liệu báo cáo...",
                loading: true,
                autoClose: false,
            })
            const res = await baseAxios.get("/COECourseSectionStudent/StudentReport?classId=" + classIdState[0])
            setPLOReportByClassData(res.data.data)
            notifications.clean()
            return res.data.data
        },
        refetchOnWindowFocus: false
    })

    const PLOByGrade = useQuery<IPLOByGradeViewModel[]>({
        queryKey: ["CoreSubjectTablePLO", gradeIdState[0]],
        queryFn: async () => {
            if (gradeIdState[0] == null) return []
            const res = await baseAxios.get(`/COEPLO/GetCOEPLOByGrade?coeGradeId=${gradeIdState[0]}&cols=COEPIs`)
            return res.data.data
        }
    })

    return (
        <Flex direction={"column"}>
            <Paper p={'md'}>
                <CustomFlexIconTitle icon={<IconSelect className="h-5 w-5 text-blue-600 dark:text-blue-400" />}>
                    Chọn đối tượng cần in
                </CustomFlexIconTitle>
                <Space />
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
                            selectedProgramData[1](allPrograms.data?.find((item: any) => item.id === parseInt(value!)))
                            gradeIdState[1](null)
                            classIdState[1](null)
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
                            classIdState[1](null)
                        }}
                    />
                    <Select
                        w={{ base: '100%', md: '25%', }}
                        placeholder={"Chọn lớp"}
                        label="Lớp"
                        data={allClassesByGradeId.data?.map((item: any) => ({
                            value: item.id!.toString(),
                            label: item.code + " - " + item.name
                        })) || []}
                        value={classIdState[0] === null ? null : classIdState[0]?.toString()}
                        onChange={(value, option) => {
                            classIdState[1](parseInt(value!))
                            selectedClassData[1](allClassesByGradeId.data?.find((item: any) => item.id === parseInt(value!)))
                        }}
                    />
                </Group>
                <Space />
                {canPrintClassStudentStudent(userStore, userPermissionStore) && <PrintReport
                    disabled={
                        PLOByGrade.fetchStatus === 'fetching' ||
                        allPrograms.fetchStatus === 'fetching' ||
                        allGradesByProgramId.fetchStatus === 'fetching' ||
                        allClassesByGradeId.fetchStatus === 'fetching' ||
                        PLOReportByClassDataQuery.fetchStatus === 'fetching' ||
                        selectedProgramData[0] === undefined ||
                        selectedGradeData[0] === undefined ||
                        selectedClassData[0] === undefined
                    }
                    PLOdata={PLOByGrade.data ?? []}
                    reportData={removeDuplicateStudentData(PLOReportByClassData)}
                    programInfo={selectedProgramData[0] ?? {}}
                    gradeInfo={selectedGradeData[0] ?? {}}
                    classInfo={selectedClassData[0] ?? {}}
                />}
            </Paper>
        </Flex >
    )
}

export const removeDuplicateStudentData = (studentData: IStudentReportViewModel[]) => {
    const uniqueStudents = new Map<number, IStudentReportViewModel>();
    studentData.forEach(student => {
        if (!uniqueStudents.has(student.studentId!)) {
            uniqueStudents.set(student.studentId!, student);
        }
    });

    return Array.from(uniqueStudents.values());
}
