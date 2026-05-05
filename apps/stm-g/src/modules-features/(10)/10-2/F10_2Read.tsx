'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";

import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group, Select, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconChecklist } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyNumberInput } from "aq-fe-framework/components";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F10_2CourseSectionAndStudentDeletion from "./F10_2CourseSectionAndStudentDeletion";

interface I {
    id?: number;
    maKhoaThi?: string; // LTB24101-10
    maNhomThi?: string; // LTBB24101-10-001
    ngayThi?: Date;
    maKhoaHoc?: string; // LTB24101
    tenKhoaHoc?: string; // Lập trình web khóa 2024
    tenChuongTrinh?: string; // Lập trình web
    ngayKhaiGiang?: Date;
    soLuongHocVien?: number; // 55
    hocVienDuThi?: number; // 42
    thiSinhTuDo?: number; // 33
    tongSo?: number; // 75
    siSoNhomThi?: number; // 20
    tinhChatPhong?: string; // Máy tính
    ngayCapNhat?: Date; // Thêm trường này
    nguoiCapNhat?: string; // Thêm trường này
}

export default function F10_2Read() {
    const examData = useQuery<Exam[]>({
        queryKey: [`F10_2Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/exam/GetExam");
            const result = response.data.data

            return result
        },
    })
    const classListQuery = useQuery<IDsLop[]>({
        queryKey: [`F10_2Read_ClassList`],
        queryFn: async () => {
            if (!selectedRows) {
                return []
            }
            const keys = Object.keys(rowSelection);
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterIds": [
                ],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "type": 2,
                "courseIds": [

                ],
                "examIds":
                    selectedRows
                ,
                "pageSize": 0,
                "pageNumber": 0
            });
            const result = response.data.data;

            return result
        },
    })
    // const getDsLopByexamDataQuery = useQuery<IXepLopChoHocVien[]>({
    //     queryKey: [`F8_1getDsLopByexamDataQuery`],
    //     queryFn: async () => {
    //         const response = await baseAxios.post("/courseSection/get", { id: selectedRows });

    //         return mockData
    //     },
    // })
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([17]); // Track selected rows
    const filterCoursesBySelection = (examData: any, selectedRows: number[]): number[] => {
        if (!examData) {

            return [];
        }
        const chiaKhoaHocList: number[] = [];
        const selectedSet = new Set(selectedRows);
        // console.log(selectedRows);

        examData.forEach((course: CourseTimeClusterData) => {

            if (selectedSet.has(course.id)) {
                chiaKhoaHocList.push(course.id);

            }
        });

        return chiaKhoaHocList;
    }
    // const transformedData = examData.data?.flatMap(course =>
    //     course.map(cluster => ({
    //         ...course, // Keep general course info
    //         id: cluster.id, // Add the course id to each cluster
    //         timeClusterName: cluster.timeCluster.name, // Unique for each cluster
    //         soLuongHocVienDangKy: cluster.courseSectionNumberTotal, // Adjusted per cluster
    //         soLuongDaXepLop: cluster.courseSectionNumberTotal, // Adjusted per cluster
    //         daXepLop: cluster.courseSectionNumberTotal > 0, // Boolean per cluster
    //     }))
    // );
    const columnsexamData = useMemo<MRT_ColumnDef<Exam>[]>(() => [
        {
            header: "Mã khóa thi",
            accessorKey: "code"
        },
        {
            header: "Tên khóa thi",
            accessorKey: "name"
        },
        {
            header: "Tính chất phòng",
            accessorKey: "roomType.name" //chua 
        },
        {
            header: "Ngày thi ",
            accessorKey: "examDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.examDate!));
            }
        },
        {
            header: "Tên chương trình",
            accessorKey: "program.name"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "startRegistrationDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.startRegistrationDate!));
            }
        },
        {
            header: " học viên dự thi",
            accessorKey: "courseSectionNumberTotal"
        },
        // {
        //     header: " Thí sinh tự do",
        //     accessorKey: "thisinhtudo"
        // },
        // {
        //     header: " Tổng số",
        //     accessorKey: "tongSo"
        // },
        {
            header: " Số lượng đã phân nhóm",
            accessorKey: "courseSectionNumber"
        },
        {
            header: " Số lượng chưa phân nhóm",
            accessorKey: "soluongchuaphannhom",
            accessorFn: (originalRow) => {

                return originalRow.courseSectionNumberTotal - originalRow.courseSectionNumber
            }
        },

        // {
        //     header: "Danh sách học viên",
        //     accessorKey: "id",
        //     accessorFn(originalRow) {
        //         return (
        //             <Group>
        //                 <F10_2StudentListByExam label="Xem" color="indigo" values={originalRow} />
        //             </Group>
        //         );
        //     }
        // },
        // {
        //     header: "Đã xếp lớp",
        //     accessorKey: "daXepLop",
        //     accessorFn: (originalRow) => {

        //         return (
        //             <Checkbox defaultChecked={originalRow.courseTimeClusters.some(item => item.courseSectionNumberTotal > 0)} />
        //         )
        //     }
        // },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        }
    ], []);


    const columnsDsLop = useMemo<MRT_ColumnDef<IDsLop>[]>(
        () => [
            {
                header: "Mã khóa thi",
                accessorKey: "exam.code"
            },
            {
                header: "Mã nhóm thi",
                accessorKey: "code"
            },
            {
                header: "Tên khóa thi",
                accessorKey: "exam.name"
            },
            {
                header: "Ngày thi",
                accessorKey: "exam.examDate",
                accessorFn(originalRow) {

                    return utils_date_dateToDDMMYYYString(new Date(originalRow.exam.examDate!));
                }
            },
            {
                header: "Tên chương trình",
                accessorKey: "exam.program.name"
            },
            {
                header: "Ngày khai giảng",
                accessorKey: "exam.startDateRegistration",
                accessorFn(originalRow) {

                    return utils_date_dateToDDMMYYYString(new Date(originalRow.exam?.startRegistrationDate!));
                }
            },
            {
                header: "Số lượng học viên",
                accessorKey: "quantityStudent"
            },

            // {
            //     header: "Học viên dự thi",
            //     accessorKey: "quantityStudentActual"
            //     // accessorFn: (row) => {
            //     //     const cumThoiGian = row.timeClusterDetails?.map(item => item.name)
            //     //     return cumThoiGian
            //     // },
            // },
            // {
            //     header: "Tổng số",
            //     accessorKey: "tongso"
            // },
            // {
            //     header: "Danh sách học viên",
            //     accessorKey: "DsHocVien",
            //     accessorFn(originalRow) {
            //         return (<Group>
            //             <F10_2StudentListByCourseSection label="Xem/Hiệu chỉnh" color="yellow" values={originalRow} />
            //         </Group>);
            //     }
            // },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                }
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            }
        ],
        []
    );
    const form = useForm<IChiaLop>({
        initialValues: {
            siSoToiDaTrenPhongHoc: 1,
            CongThucSapXep: 1,
            CongThucTachKhoaHoc: 1,
        },
        validate: {
            siSoToiDaTrenPhongHoc: (value) => {
                if (value <= 0) {
                    return 'Sĩ số phải lớn hơn 00';
                }
                return null;
            }
        }
    })
    useEffect(() => {
        if (!rowSelection) {
            return
        }
        classListQuery.refetch()
    }, [selectedRows]);
    useEffect(() => {

        if (examData.data && examData.data.length > 0) {
            setRowSelection({ [examData.data[0]!.id]: true });
        }
    }, [examData.isSuccess]);

    if (examData.isLoading || classListQuery.isLoading) return "Đang tải dữ liệu..."
    if (examData.isError || classListQuery.isError) return "Không có dữ liệu..."
    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}  >
                <MyNumberInput min={1} label="Sĩ số tối đa/ Phòng học" defaultValue={1}
                    {...form.getInputProps("siSoToiDaTrenPhongHoc")}
                />
                <Select
                    placeholder="Chọn công thức sắp xếp"
                    label="Công thức sắp xếp"
                    defaultValue={1?.toString()}
                    onChange={(value: any): void =>
                        form.setFieldValue("CongThucSapXep", value ? parseInt(value) : undefined)
                    }
                    value={form.getValues().CongThucSapXep?.toString()}
                    data={[
                        { value: "1", label: "Ngẫu nhiên" },
                        { value: "2", label: "Theo trình tự" },
                    ]}
                />
                <Select
                    placeholder="Chọn công thức tách khóa học"
                    label="Công thức tách khóa học"
                    defaultValue={1?.toString()}
                    onChange={(value: any): void =>
                        form.setFieldValue("CongThucTachKhoaHoc", value ? parseInt(value) : undefined)
                    }
                    value={form.getValues().CongThucTachKhoaHoc?.toString()}
                    data={[
                        { value: "1", label: "Chia đều" },
                        { value: "2", label: "Theo trình tự" },
                    ]}
                />
                {examData.isSuccess &&
                    <Group align="end">
                        <Button leftSection={<IconChecklist />} disabled={selectedRows.length === 0}
                            onClick={async () => {
                                // if (!transformedData) {
                                //     return;
                                // }
                                // const filteredCourses = filterCoursesBySelection(transformedData, selectedRows);
                                const filteredCourses = filterCoursesBySelection(examData.data, selectedRows);
                                const response = await baseAxios.post("/courseSection/CreateMutipleCourseSectionForExam", {
                                    "maxStudent": form.getValues().siSoToiDaTrenPhongHoc,
                                    "formulaStudent": form.getValues().CongThucSapXep,
                                    "formulaCourse": form.getValues().CongThucTachKhoaHoc,
                                    "courseTimeClusterIds": [0],
                                    "examIds": filteredCourses

                                });
                                if (!response.data.isSuccess) {
                                    throw new Error(response.data.message);
                                }
                                notifications.show({
                                    color: "green",
                                    message: "Chia lớp thành công!"
                                })
                                return response
                            }}
                            onError={() => {
                                notifications.show({
                                    color: "red",
                                    message: "Chia lớp không thành công!"
                                })
                            }}>Chia nhóm thi</Button>
                    </Group>
                }
            </SimpleGrid>
            {examData.isSuccess &&
                <MyFieldset mt="10" title="Danh sách khóa thi">
                    <MyDataTable
                        enableRowSelection={true}
                        columns={columnsexamData}
                        enableRowNumbers={true}
                        exportAble
                        getRowId={(row: Exam): string => row.id?.toString() || ''}
                        onRowSelectionChange={setRowSelection}
                        state={{ rowSelection }}
                        data={examData.data!}
                        setSelectedRowId={(data): void => {
                            console.log(data);

                            setSelectedRows(data)
                        }}
                    // renderTopToolbarCustomActions={({ table }) => {
                    //     return (
                    //         <>
                    //             <Group>
                    //                 <AssignStudentToCourseSectionCreateBtn />
                    //             </Group>
                    //         </>
                    //     )
                    // }}
                    />
                </MyFieldset>}
            {classListQuery.data &&
                <MyFieldset mt="10" title="Danh sách lớp" >
                    <MyDataTable
                        enableRowSelection={true}
                        columns={columnsDsLop}
                        enableRowNumbers={true}
                        data={classListQuery.data!}
                        exportAble
                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>
                                    <F10_2CourseSectionAndStudentDeletion data={row.original} />
                                </MyCenterFull>
                            )
                        }}
                    />
                </MyFieldset>
            }
        </>
    );
}

interface ItimeClusterDetails {
    id?: number,
    code?: string,
    name?: string,
    timeClusterId?: number,
    dayOfWeek?: number,
    startTime?: Date,
    endTime?: Date,
    classPeriodStart?: number,
    classPeriodEnd?: number,
}
interface CourseTimeClusterData {
    status: boolean;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: SkillCenter;
    branch: Branch;
    program: Program;
    courseTimeClusters: CourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface SkillCenter {
    note: string;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface Branch {
    location: string;
    note: string;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface Program {
    skillCenterId: number;
    programTypeId: number;
    totalClassPeriodNumber: number;
    totalHours: number;
    isTesting: boolean;
    certificateId: number;
    isCancel: boolean;
    note: string;
    price: number;
    certificate: null;
    skillCenter: SkillCenter;
    subjects: null;
    programType: ProgramType;
    programSubjects: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface ProgramType {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface CourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    courseSectionNumberTotal: number;
    courseSectionNumber: number;
    timeCluster: TimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}
interface TimeCluster {
    timeTypeId: number;
    timeClusterDetails: TimeClusterDetail[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface TimeClusterDetail {
    timeClusterId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    classPeriodStart: number;
    classPeriodEnd: number;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface IDsLop {
    id?: number;
    code?: string;
    courseName?: string;
    course?: ICourse
    startDateRegistration?: Date | undefined;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    timeClusterDetails?: ItimeClusterDetails[];
    quantityStudent?: number;
    dsHocVien?: number;
    exam: Exam
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}
interface IChiaLop {
    siSoToiDaTrenPhongHoc: number;
    CongThucSapXep?: number;
    CongThucTachKhoaHoc?: number;
}

interface ICourse {
    id?: number,
    code?: string,
    name?: string,
    startDateRegistration?: Date | undefined;
}
interface ExamCourse {
    examId: number;
    courseId: number;
    courseName: string;
    courseCode: string;
    courseTestDate: string;
    courseStatus: number;
    programName: string;
    quantity: number;
    reserveQuantity: number;
    status: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}



interface Exam {
    programId: number;
    examDate: string;
    roomTypeId: number | null;
    status: number;
    startRegistrationDate: string;
    endRegistrationDate: string;
    maxStudent: number;
    branchId: number;
    skillCenterId: number;
    courseSectionNumberTotal: number;
    courseSectionNumber: number;
    officialExamDate: string;
    classPeriod: number;
    examCourses: any[];
    program: Program;
    branch: unknown | null;
    skillCenter: unknown | null;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
