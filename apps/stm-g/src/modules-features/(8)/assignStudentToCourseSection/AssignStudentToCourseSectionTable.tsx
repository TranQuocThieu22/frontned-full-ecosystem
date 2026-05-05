'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Group, Select, SimpleGrid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconChecklist } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import CourseSectionAndStudentDeletion from "./courseSection/CourseSectionAndStudentDeletion";
import StudentListByCourse from "./course/StudentListByCourse";
import StudentListByCourseSection from "./courseSection/StudentListByCourseSection";

export default function AssignStudentToCourseSectionTable() {
    const cumThoiGianHoc = useQuery<CourseTimeClusterData[]>({
        queryKey: [`AssignStudentToCourseSectionTable`],
        queryFn: async () => {
            const response = await baseAxios.post("/course/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [

                ],
                "pageSize": 0,
                "pageNumber": 0
            });
            const result = response.data.data
            return result
        },
    })
    const DsLopQuery = useQuery<IDsLop[]>({
        queryKey: [`F8_1Read_DsLop`],
        queryFn: async () => {
            if (!selectedRows) {
                return []
            }
            const keys = Object.keys(rowSelection);
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterIds": selectedRows,
                "courseSectionId": 0,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            const result = response.data.data;
            // return dsLop
            return result
        },
    })
    // const getDsLopByCumThoiGianHocQuery = useQuery<IXepLopChoHocVien[]>({
    //     queryKey: [`F8_1getDsLopByCumThoiGianHocQuery`],
    //     queryFn: async () => {
    //         const response = await baseAxios.post("/courseSection/get", { id: selectedRows });

    //         return mockData
    //     },
    // })
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([17]); // Track selected rows
    const filterCoursesBySelection = (cumThoiGianHoc: any, selectedRows: number[]): number[] => {
        if (!cumThoiGianHoc) {

            return [];
        }
        const chiaKhoaHocList: number[] = [];
        const selectedSet = new Set(selectedRows);
        // console.log(selectedRows);

        cumThoiGianHoc.forEach((course: CourseTimeClusterData) => {

            if (selectedSet.has(course.id)) {
                chiaKhoaHocList.push(course.id);

            }
        });

        return chiaKhoaHocList;
    }
    const transformedData = cumThoiGianHoc.data?.flatMap(course =>
        course.courseTimeClusters.map(cluster => ({
            ...course, // Keep general course info
            id: cluster.id, // Add the course id to each cluster
            timeClusterName: cluster.timeCluster.name, // Unique for each cluster
            soLuongHocVienDangKy: cluster.courseSectionNumberTotal, // Adjusted per cluster
            soLuongDaXepLop: cluster.courseSectionNumber, // Adjusted per cluster
            daXepLop: cluster.courseSectionNumberTotal > 0, // Boolean per cluster
        }))
    );
    const columnsCumThoiGianHoc = useMemo<MRT_ColumnDef<CourseTimeClusterData>[]>(() => [
        {
            header: "Mã khóa học",
            accessorKey: "code"
        },
        {
            header: "Tên khóa học",
            accessorKey: "name"
        },
        {
            header: "Tên chương trình",
            accessorKey: "program.name"
        },
        {
            header: "Loại chương trình",
            accessorKey: "program.programType.name"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "startDateRegistration",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.studyDate!));
            }
        },
        {
            header: "Có tổ chức thi",
            accessorKey: "status",
            accessorFn: (originalRow) => (
                <Checkbox checked={originalRow.status} onChange={() => { }} />
            )
        },
        {
            header: "Tổng số giờ",
            accessorKey: "program.totalHours"
        },
        {
            header: "Học phí",
            accessorKey: "price",
            accessorFn(originalRow) {
                return <MyNumberFormatter value={originalRow.price!} />;
            }
        },
        {
            header: "Cụm thời gian",
            accessorKey: "timeClusterName" // Now per row
        },
        {
            header: "Số lượng học viên đăng ký",
            accessorKey: "soLuongHocVienDangKy" // Now per row
        },
        {
            header: "Số lượng đã xếp lớp",
            accessorKey: "soLuongDaXepLop" // Now per row
        },
        {
            header: "Danh sách học viên",
            accessorKey: "id",
            accessorFn(originalRow) {
                return (
                    <Group>
                        <StudentListByCourse label="Xem" color="indigo" values={originalRow} />
                    </Group>
                );
            }
        },
        {
            header: "Đã xếp lớp",
            accessorKey: "daXepLop",
            accessorFn: (originalRow) => {

                return (
                    <Checkbox defaultChecked={originalRow.courseTimeClusters.some(item => item.courseSectionNumberTotal > 0)} />
                )
            }
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        }
    ], []);


    const columnsDsLop = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: "Mã lớp",
                accessorKey: "code"
            },
            {
                header: "Tên khóa học",
                accessorFn(originalRow) {
                    return (<Group>
                        {originalRow.courseTimeCluster?.course?.name || ''}
                    </Group>);
                } // M
            },
            // {
            //     header: "Ngày khai giảng",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.courseTimeClusters.course?.studyDate!));
            //     }
            // },
            // {
            //     header: "Tổng số tiết",
            //     accessorKey: "program.totalClassPeriodNumber",
            // },
            {
                header: "Cụm thời gian",
                accessorKey: "courseSection.timeCluster.name",
                accessorFn: (originalRow) => {
                    return (
                        <Text >
                            {originalRow.courseTimeCluster.timeCluster ? originalRow.courseTimeCluster.timeCluster.name : ''
                                // .map((cluster: any) => cluster.timeCluster)
                                // .find((tc:any) => tc.id === originalRow.courseSection.timeClusterId)?.name
                            }</Text>
                    )
                }
            },
            {
                header: "Sĩ số",
                accessorKey: "quantityStudent"
            },
            {
                header: "Danh sách học viên",
                accessorKey: "DsHocVien",
                accessorFn(originalRow) {
                    return (<Group>
                        <StudentListByCourseSection label="Xem/Hiệu chỉnh" color="yellow" values={originalRow} />
                    </Group>);
                }
            },
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
        DsLopQuery.refetch()
    }, [selectedRows]);
    useEffect(() => {

        if (cumThoiGianHoc.data && cumThoiGianHoc.data.length > 0) {
            setRowSelection({ [cumThoiGianHoc.data[0]!.id]: true });
        }
    }, [cumThoiGianHoc.isSuccess]);

    if (cumThoiGianHoc.isLoading || DsLopQuery.isLoading) return "Đang tải dữ liệu..."
    if (cumThoiGianHoc.isError || DsLopQuery.isError) return "Không có dữ liệu..."
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
                {cumThoiGianHoc.isSuccess &&
                    <Group align="end">
                        <Button leftSection={<IconChecklist />} disabled={selectedRows.length === 0}
                            onClick={async () => {
                                if (!transformedData) {
                                    return;
                                }
                                const filteredCourses = filterCoursesBySelection(transformedData, selectedRows);
                                const response = await baseAxios.post("/courseSection/CreateMutipleCourseSection", {
                                    "maxStudent": form.getValues().siSoToiDaTrenPhongHoc,
                                    "formulaStudent": form.getValues().CongThucSapXep,
                                    "formulaCourse": form.getValues().CongThucTachKhoaHoc,
                                    "courseTimeClusterIds":
                                        filteredCourses
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
                            }}>Chia khóa học</Button>
                    </Group>
                }
            </SimpleGrid>
            {cumThoiGianHoc.isSuccess &&
                <MyFieldset mt="10" title="Danh sách khóa học theo cụm thời gian học">
                    <MyDataTable
                        initialState={
                            {
                                pagination: { pageIndex: 0, pageSize: 10 },
                            }
                        }
                        enableRowSelection={true}
                        columns={columnsCumThoiGianHoc}
                        enableRowNumbers={true}
                        exportAble
                        getRowId={(row: CourseTimeClusterData): string => row.id?.toString() || ''}
                        onRowSelectionChange={setRowSelection}
                        state={{ rowSelection }}
                        data={transformedData!}
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
            {DsLopQuery.data &&
                <MyFieldset mt="10" title="Danh sách lớp" >
                    <MyDataTable
                        enableRowSelection={true}
                        columns={columnsDsLop}
                        enableRowNumbers={true}
                        data={DsLopQuery.data!}
                        exportAble
                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>
                                    <CourseSectionAndStudentDeletion data={row.original} />
                                </MyCenterFull>
                            )
                        }}
                    />
                </MyFieldset>
            }
        </>
    )
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
