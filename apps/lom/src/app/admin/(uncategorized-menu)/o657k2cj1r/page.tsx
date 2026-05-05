'use client'
import { service_account } from "@/api/services/service_account";
import { IStudentReportRes, service_COECourseSectionStudent } from "@/api/services/service_COECourseSectionStudent";
import { ICourseSetionStudentInfoViewModel, IStudentInfoViewModel } from "@/features/admin/ModulePointRecord/StudentCLOPointRecord/Interfaces/Interfaces";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomFlexEnd } from "@aq-fe/core-ui/shared/components/layout/CustomFlexEnd";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Box, Group, Paper, Select, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page() {

    const studentIdState = useState<number | undefined | null>(3088)
    let [allStudentsData, setAllStudentsData] = useState<any[]>([])
    let [allCourseSectionStudent, setAllCourseSectionStudent] = useState<any[]>([])
    const [selectedStudentData, setSelectedStudentData] = useState<IStudentInfoViewModel>()
    const [selectedCourseSectionStudent, setselectedCourseSectionStudent] = useState<any>()
    const courseSectionStudentIdState = useState<number | undefined | null>(null)
    const allStudents = useQuery<IStudentInfoViewModel[]>({
        queryKey: ["allStudents"],
        queryFn: async () => {
            const res = await baseAxios.get("/Account/GetStudentCOE")
            studentIdState[1](res.data.data[0].id)
            setAllStudentsData(res.data.data)
            studentInfoQuery.refetch()
            return res.data.data
        },
        refetchOnWindowFocus: false
    })
    const allCourseSectionByStudent = useQuery<ICourseSetionStudentInfoViewModel[]>({
        queryKey: [`CourseSectionByStudent${studentIdState[0]}`],
        queryFn: async () => {
            const res = await baseAxios.get(`/COECourseSectionStudent/GetByStudent?studentId=${studentIdState[0]}`)
            courseSectionStudentIdState[1](res.data.data[0].id)
            setAllCourseSectionStudent(res.data.data)

            return res.data.data
        },
        refetchOnWindowFocus: false,
        enabled: !!studentIdState[0] && allStudents.isSuccess
    })
    const studentInfoQuery = useCustomReactQuery({
        queryKey: ['studentInfo', studentIdState[0]],
        axiosFn: () => {

            return service_account.getCOEStudentInfo({ studentId: studentIdState[0]! })
        },
        options: {
            enabled: !!studentIdState[0]
        }
    })
    const StudentReportData = useCustomReactQuery({
        queryKey: [`${studentIdState[0]}, ${courseSectionStudentIdState}`],
        axiosFn: async () => {
            const selectedCourseSection = allCourseSectionStudent.find(
                (item: any) => item.id === courseSectionStudentIdState[0]
            );
            return service_COECourseSectionStudent.StudentReports({
                param:
                    `studentId=${studentIdState[0]}&courseSectionId=${selectedCourseSection?.coeCourseSection?.id}`
            })
        }, options: {
            refetchOnWindowFocus: false,
            enabled:
                (!!studentIdState[0] && allStudents.isSuccess) &&
                (!!courseSectionStudentIdState[0] && allCourseSectionByStudent.isSuccess)
        }

    })
    const processStudentReportData = (reportData: IStudentReportRes[]) => {

        if (!reportData?.[0]) {
            return [];
        }

        const data = reportData[0];
        const { studentPoints, studentCLOResults } = data;

        ``
        // Create a map of CLO results for easy lookup
        const resultsMap = new Map();
        if (studentCLOResults) {
            studentCLOResults.forEach(result => {
                resultsMap.set(result.cloId, result.point);
            });
        }

        // Group student points by CLO
        const cloGroups = new Map();
        if (studentPoints) {
            studentPoints.forEach(point => {
                if (!cloGroups.has(point.cloId)) {
                    cloGroups.set(point.cloId, {
                        cloId: point.cloId,
                        cloCode: point.cloCode,
                        cloName: point.cloName,
                        densityMethodCLO: point.densityMethodCLO,
                        processPoints: [],
                        finalPoint: resultsMap.get(point.cloId) || 0
                    });
                }
                cloGroups.get(point.cloId).processPoints.push(point.point10);
            });
        }

        // Convert to array and calculate averages
        const processedData = Array.from(cloGroups.values()).map((clo, index) => {
            const processAvg = clo.processPoints.length > 0
                ? clo.processPoints.reduce((sum: number, p: number) => sum + p, 0) / clo.processPoints.length
                : 0;
            const overallAvg = (processAvg + clo.finalPoint) / 2;

            return {
                stt: index + 1,
                cloCode: clo.cloCode,
                cloName: clo.cloName.trim(),
                densityMethodCLO: `${clo.densityMethodCLO}%`,
                processPoint: processAvg > 0 ? processAvg.toFixed(1) : '',
                midtermPoint: '', // Not available in current data structure
                finalPoint: clo.finalPoint.toFixed(1),
                average: overallAvg.toFixed(2)
            };
        });

        return processedData;
    };
    useEffect(() => {
        courseSectionStudentIdState[1](null)
        allCourseSectionByStudent.refetch()

        setSelectedStudentData(allStudentsData.find((item: any) => item.id === studentIdState[0]))
    }, [studentIdState[0]])
    useEffect(() => {
        setselectedCourseSectionStudent(allCourseSectionStudent.find((item: any) => item.id === courseSectionStudentIdState[0]))
    }, [courseSectionStudentIdState[0]])

    return (
        <CustomPageContent>
            <Paper p={'md'}>
                <CustomFlexColumn >
                    <Select
                        searchable
                        w={{ base: '100%', md: '20%', }}
                        placeholder={"Chọn mã sinh viên"}
                        label="Mã sinh viên"
                        data={allStudents.data?.map((item: IStudentInfoViewModel) => ({
                            value: item.id!.toString(),
                            label: `${item.code!} `
                        })) || []}
                        value={studentIdState[0]?.toString()}
                        onChange={(value, option) => {
                            studentIdState[1](parseInt(value!))
                        }}
                    />
                    <Text>Họ tên: {selectedStudentData?.fullName}</Text>
                    <Group grow>
                        <CustomTextInput
                            label="Chương trình"
                            placeholder="Sinh viên chưa thuộc chương trình!"
                            readOnly
                            defaultValue={studentInfoQuery.data?.coeProgramName}
                        />
                        <CustomTextInput
                            label="Khóa"
                            placeholder="Sinh viên chưa thuộc Khóa!"
                            readOnly
                            defaultValue={studentInfoQuery.data?.coeGradeName}
                        />
                        <CustomTextInput
                            label="Lớp"
                            placeholder="Sinh viên chưa thuộc lớp!"
                            readOnly
                            defaultValue={studentInfoQuery.data?.className}
                        />
                    </Group>
                    <Select
                        w={{ base: '100%', md: '30%', }}
                        placeholder={"Chọn môn học"}
                        label="Môn học"
                        data={allCourseSectionByStudent.data?.map((item: ICourseSetionStudentInfoViewModel) => ({
                            value: item.id!.toString(),
                            label: item.coeCourseSection?.coeGradeSubject?.coeSubject === null ? 'Dữ liệu môn học bị lỗi hoặc không có'
                                :
                                item.coeCourseSection?.coeGradeSubject?.coeSubject.name === null ? 'Dữ liệu tên môn học bị lỗi hoặc không có'
                                    : `${item.coeCourseSection?.coeGradeSubject?.coeSubject.code} - ${item.coeCourseSection?.coeGradeSubject?.coeSubject.name}`
                        })) || []}
                        value={courseSectionStudentIdState[0] === null ? null : courseSectionStudentIdState[0]?.toString()}
                        onChange={(value, option) => {
                            courseSectionStudentIdState[1](parseInt(value!))
                        }}
                    />

                    <Box style={{ alignSelf: 'flex-start' }}>
                        <CustomButtonPrintPDF buttonProps={{ children: "In phiếu điểm theo CLO" }}>
                            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                                    <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                                </CustomFlexColumn>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                                    <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Toàn môn học </Text>
                                </CustomFlexColumn>
                                <CustomFlexRow>
                                    <Text>
                                        Họ tên: {selectedStudentData?.fullName}
                                    </Text>
                                    <Text>
                                        Ngày sinh: {selectedStudentData?.dateOfBirth ? dateUtils.toDDMMYYYY(new Date(selectedStudentData.dateOfBirth)) : ""}
                                    </Text>
                                    <Text>
                                        Giới tính: {Number(selectedStudentData?.gender) === 1 ? "Nam" : Number(selectedStudentData?.gender) === 2 ? "Nữ" : ""}
                                    </Text>
                                </CustomFlexRow>
                                <Text>
                                    Chương trình: {studentInfoQuery.data?.coeProgramName}
                                </Text>
                                <CustomFlexRow>
                                    <Text>
                                        Khóa: {studentInfoQuery.data?.coeGradeName}
                                    </Text>
                                    <Text>
                                        Lớp: {studentInfoQuery.data?.className}
                                    </Text>
                                </CustomFlexRow>
                                <Text>
                                    Môn: {selectedCourseSectionStudent &&
                                        selectedCourseSectionStudent.coeCourseSection?.coeGradeSubject?.coeSubject?.name
                                        ? selectedCourseSectionStudent.coeCourseSection.coeGradeSubject.coeSubject.name
                                        : ''}
                                </Text>
                                <Table style={{ border: "1px solid black" }}>
                                    <Table.Thead style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Th style={{ border: "1px solid black" }}>STT</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Mã CĐR</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Chuẩn đầu ra môn học</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Tỷ trọng</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>CLO quá trình</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>CLO giữa kỳ</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>CLO cuối kỳ</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Trung bình</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody style={{ border: "1px solid black" }}>
                                        {(() => {

                                            if (StudentReportData.isLoading) {
                                                return (
                                                    <Table.Tr style={{ border: "1px solid black" }}>
                                                        <Table.Td colSpan={8} style={{ border: "1px solid black", textAlign: 'center' }}>
                                                            Đang tải dữ liệu...
                                                        </Table.Td>
                                                    </Table.Tr>
                                                );
                                            }

                                            if (StudentReportData.error) {
                                                return (
                                                    <Table.Tr style={{ border: "1px solid black" }}>
                                                        <Table.Td colSpan={8} style={{ border: "1px solid black", textAlign: 'center' }}>
                                                            Lỗi: {StudentReportData.error.message}
                                                        </Table.Td>
                                                    </Table.Tr>
                                                );
                                            }

                                            if (!StudentReportData.data) {
                                                return (
                                                    <Table.Tr style={{ border: "1px solid black" }}>
                                                        <Table.Td colSpan={8} style={{ border: "1px solid black", textAlign: 'center' }}>
                                                            Chưa có dữ liệu
                                                        </Table.Td>
                                                    </Table.Tr>
                                                );
                                            }

                                            const processedData = processStudentReportData(StudentReportData.data);

                                            if (processedData.length === 0) {
                                                return (
                                                    <Table.Tr style={{ border: "1px solid black" }}>
                                                        <Table.Td colSpan={8} style={{ border: "1px solid black", textAlign: 'center' }}>
                                                            Không có dữ liệu để hiển thị
                                                        </Table.Td>
                                                    </Table.Tr>
                                                );
                                            }

                                            return processedData.map((row) => (
                                                <Table.Tr key={row.cloCode} style={{ border: "1px solid black" }}>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.stt}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.cloCode}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.cloName}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.densityMethodCLO}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.processPoint}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.midtermPoint}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.finalPoint}</Table.Td>
                                                    <Table.Td style={{ border: "1px solid black" }}>{row.average}</Table.Td>
                                                </Table.Tr>
                                            ));
                                        })()}
                                    </Table.Tbody>
                                </Table>
                                <Text>
                                    Mức đạt CLO môn học:
                                    {StudentReportData.data && StudentReportData.data[0]?.gradeSubjectPointResult !== undefined
                                        ? StudentReportData.data[0].gradeSubjectPointResult
                                        : ""}
                                </Text>
                                <CustomFlexEnd>
                                    <CustomFlexColumn>
                                        <Text ta={'center'}>TP.HCM, ngày 23 tháng 4 năm 2025</Text>
                                        <Text ta={'center'}>Người lập biểu</Text>
                                    </CustomFlexColumn>
                                </CustomFlexEnd>
                            </CustomFlexColumn>
                        </CustomButtonPrintPDF>
                    </Box>

                    <Box style={{ alignSelf: 'flex-start' }}>
                        <CustomButtonPrintPDF buttonProps={{ children: "In phiếu điểm theo thành phần đánh giá" }}>
                            <CustomFlexColumn p={'lg'} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text tt={"uppercase"}>Bộ giáo dục và đào tạo</Text>
                                    <Text fw={'bold'} tt={"uppercase"} td={"underline"}>Trường đại học ABC</Text>
                                </CustomFlexColumn>
                                <CustomFlexColumn ta={'center'} gap={2}>
                                    <Text fw={'bold'} tt={"uppercase"}>Phiếu điểm đo lường chuẩn đầu ra môn học</Text>
                                    <Text fw={'bold'} tt={"uppercase"} fs={"normal"}>Toàn môn học </Text>
                                </CustomFlexColumn>
                                <CustomFlexRow>
                                    <Text>
                                        Họ tên: Tô Ngọc Lan
                                    </Text>
                                    <Text>
                                        Họ tên: Ngày sinh: 10/02/1997
                                    </Text>
                                    <Text>
                                        Giới tính: Nữ
                                    </Text>
                                </CustomFlexRow>
                                <Text>
                                    Chương trình: Kế toán doanh nghiệp
                                </Text>
                                <CustomFlexRow>
                                    <Text>
                                        Khóa: KT2401
                                    </Text>
                                    <Text>
                                        Lớp: K2401-01
                                    </Text>
                                </CustomFlexRow>
                                <Text>
                                    Môn: Kế toán ngân hàng thương mại
                                </Text>
                                <Table style={{ border: "1px solid black" }}>
                                    <Table.Thead style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Th style={{ border: "1px solid black" }}>Thành phần đánh giá</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Trọng số</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>CLO được đo lường</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Trọng số</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Bài đánh giá sử dụng</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Điểm tối đa</Table.Th>
                                            <Table.Th style={{ border: "1px solid black" }}>Điểm</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody style={{ border: "1px solid black" }}>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>Chuyên cần</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>20%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Bài tập 1: Sử dụng Excel/SPSS</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>4</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO4</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Bài tập 2: Viết báo cáo nhỏ</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>4.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>Giữa kỳ</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>30%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Phần 1: Chạy mô hình và xuất kết quả</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>15%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Phần 2: Phân tích và biện luận kết quả</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>4</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO4</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>10%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Phần 3: Trình bày báo cáo dự án</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>2</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>1.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}>Cuối kỳ</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>50%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>25%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Câu 1: Đọc và giải thích output có sẵn</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>3.5</Table.Td>
                                        </Table.Tr>
                                        <Table.Tr style={{ border: "1px solid black" }}>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}></Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>CLO3</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>25%</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>Câu 2: Lựa chọn và thực hiện kiểm định phù hợp</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>5</Table.Td>
                                            <Table.Td style={{ border: "1px solid black" }}>3</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                                <Text>Mức đạt CLO môn học: 7.55</Text>
                                <CustomFlexEnd>
                                    <CustomFlexColumn>
                                        <Text ta={'center'}>TP.HCM, ngày 23 tháng 4 năm 2025</Text>
                                        <Text ta={'center'}>Người lập biểu</Text>
                                    </CustomFlexColumn>
                                </CustomFlexEnd>
                            </CustomFlexColumn>
                        </CustomButtonPrintPDF>
                    </Box>
                </CustomFlexColumn>

            </Paper>
        </CustomPageContent>
    )
}
