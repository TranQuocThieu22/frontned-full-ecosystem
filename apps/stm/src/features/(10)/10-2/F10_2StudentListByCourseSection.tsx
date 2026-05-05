"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Anchor, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import F10_2DeleteStudentFromCourseSection from './F10_2DeleteStudentFromCourseSection';
import F10_2UpdateStudentInformation from './F10_2UpdateStudentInformation';
;


interface IBase {
    values?: any,
    label?: string,
    color?: string

}
export default function F10_2StudentListByCourseSection({ label, values, color }: IBase) {
    const disc = useDisclosure()

    const ClassListQuery = useQuery<IEnrollment[]>({
        queryKey: [`F10_2StudentListByCourseSection`, values],
        queryFn: async () => {


            const body =
            {
                "courseSectionId": values.id,
                "programId": 0,
                "status": 0,
                "examIds": [

                ],
                "pageSize": 0,
                "pageNumber": 0
            }
            const response = await baseAxios.post("/Exam/GetStudent", body);

            const result = response.data.data
            return result
        },
        enabled: disc[0]

    })
    const columns = useMemo<MRT_ColumnDef<IEnrollment>[]>(
        () => [

            {
                header: "Họ tên học viên",
                accessorKey: "user.fullName"
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender"
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.user.dateOfBirth!));
                }
            },
            {
                header: "Số điện thoại",
                accessorKey: "user.phoneNumber"
            },
            {
                header: "Email",
                accessorKey: "user.email"
            },
            {
                header: "Mã lớp",
                accessorKey: "courseSection.code",
                accessorFn(originalRow) {
                    return (<Group>
                        <Anchor>{originalRow.courseSection == null ? "" : originalRow.courseSection.code}</Anchor>
                    </Group>);
                } // M
            },
            {
                header: "Mã khóa học",
                accessorKey: "courseSection.course.code",
                accessorFn(originalRow) {
                    return (<Group>
                        <Anchor>{originalRow.courseSection == null || (originalRow.courseSection as ICourseSection).course == null ? "" : originalRow.courseSection.course.code}</Anchor>
                    </Group>);
                } // M
            },


            {
                header: "Tên khóa học",
                accessorKey: "courseSection.course.name",
                accessorFn(originalRow) {
                    return (<Group>
                        <Anchor>{originalRow.courseSection == null || (originalRow.courseSection as ICourseSection).course == null ? "" : originalRow.courseSection.course.name}</Anchor>
                    </Group>);
                } // M
            },
            {
                header: "Cụm thời gian",
                accessorKey: "courseSection.timeCluster.name",
                accessorFn: (originalRow) => {
                    return (
                        <Text  >{originalRow.courseSection?.course?.courseTimeClusters
                            .map(cluster => cluster.timeCluster)
                            .find(tc => tc.id === originalRow.courseSection.timeClusterId)?.name
                        }</Text>
                    )
                }
            },
            {
                header: "Chi nhánh",
                accessorKey: "courseSection.branch"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                // accessorFn(originalRow) {
                //     return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                // } // Matches the "ngayCapNhat" property in IEnrollment
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat" // Matches the "nguoiCapNhat" property in IEnrollment
            }
        ],
        []
    );

    const [fileData, setFileData] = useState<any[]>([]);


    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])
    if (ClassListQuery.isLoading) return "Đang tải dữ liệu..."
    if (ClassListQuery.isError) return "Không có dữ liệu..."
    return (
        <Group>
            <MyButtonModal
                title="Danh sách học viên" modalSize={'80%'} disclosure={disc} label={label} color={color} >
                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={ClassListQuery.data!}
                    renderRowActions={({ row }) => {

                        return (
                            <MyCenterFull>
                                <F10_2UpdateStudentInformation EnrollData={row.original} />
                                <F10_2DeleteStudentFromCourseSection data={row.original} />

                            </MyCenterFull>
                        );
                    }}
                />
            </MyButtonModal>

        </Group>
    )
}

interface IRole {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
    createdWhen: string | null;
    createdBy: string | null;
    modifiedWhen: string | null;
    modifiedBy: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface IUser {
    id: number;
    isBlocked: boolean;
    roleId: number;
    userName: string;
    code: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarPath: string;
    fullName: string;
    facultyId: number | null;
    facultyName: string | null;
    classId: number | null;
    majorsId: number | null;
    workingUnitId: number | null;
    workingUnitName: string | null;
    gender: number | null;
    dateOfBirth: Date | null;
    educationLevel: number | null;
    modifiedBy: number;
    modifiedWhen: string;
    roles: IRole[];
}

interface ITimeCluster {
    timeTypeId: number;
    timeClusterDetails: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseTimeCluster {
    courseId: number;
    timeClusterId: number;
    maxStudent: number;
    timeCluster: ITimeCluster;
    id: number;
    code: string | null;
    name: string | null;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}

interface ICourse {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string | null;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: any | null;
    branch: any | null;
    program: any | null;
    courseTimeClusters: ICourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface ICourseSection {
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    course: ICourse;
    timeCluster: ITimeCluster;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

interface IEnrollment {
    userId: number;
    courseTimeClusterId: number;
    courseSectionId: number;
    user: IUser;
    courseTimeCluster: ICourseTimeCluster;
    courseSection: ICourseSection;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}



