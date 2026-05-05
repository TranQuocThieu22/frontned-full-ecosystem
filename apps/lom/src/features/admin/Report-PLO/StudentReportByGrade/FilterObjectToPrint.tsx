'use client'
import { canPrintStudentEnrollment } from "@/features/auth/PageAuthorization/PLO-report-result-students-per-enrollment-batch.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomFlexIconTitle } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomFlexIconTitle";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Flex, Group, Paper, Select, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSelect } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { removeDuplicateStudentData } from "../StudentReportByClass/FilterObjectToPrint";
import { IPLOByGradeViewModel, IStudentReportViewModel } from "./Interfaces/Interface";
import PrintReport from "./PrintReport";

export default function FilterObjectToPrint() {
    const userStore = useAuthenticateStore().state;
    const userPermissionStore = usePermissionStore().state;
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

    let [PLOReportByClassData, setPLOReportByClassData] = useState<IStudentReportViewModel[]>([])

    const allPrograms = useQuery<any[]>({
        queryKey: ["allPrograms"],
        queryFn: async () => {
            programIdState[1](null)
            selectedProgramData[1](null)
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

    const PLOReportByClassDataQuery = useQuery<IStudentReportViewModel[]>({
        queryKey: ["PLOReport", gradeIdState[0]],
        queryFn: async () => {
            if (gradeIdState[0] === null) return []
            notifications.show({
                message: "Đang tải dữ liệu báo cáo...",
                loading: true,
                autoClose: false,
            })
            const res = await baseAxios.get("/COECourseSectionStudent/StudentReport?coeGradeId=" + gradeIdState[0])
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
                </Group>
                <Space />
                {canPrintStudentEnrollment(userStore, userPermissionStore) && <PrintReport
                    disabled={
                        PLOByGrade.fetchStatus === 'fetching' ||
                        allPrograms.fetchStatus === 'fetching' ||
                        allGradesByProgramId.fetchStatus === 'fetching' ||
                        PLOReportByClassDataQuery.fetchStatus === 'fetching' ||
                        selectedProgramData[0] === undefined ||
                        selectedGradeData[0] === undefined
                    }
                    PLOdata={PLOByGrade.data ?? []}
                    reportData={removeDuplicateStudentData(PLOReportByClassData)}
                    programInfo={selectedProgramData[0] ?? {}}
                    gradeInfo={selectedGradeData[0] ?? {}}
                />}
            </Paper>
        </Flex >
    )
}
