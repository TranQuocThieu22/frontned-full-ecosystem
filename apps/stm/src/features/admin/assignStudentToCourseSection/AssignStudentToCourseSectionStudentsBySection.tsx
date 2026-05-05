import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Anchor, Center, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import AssignStudentToCourseSectionDeleteFromSection from './AssignStudentToCourseSectionDeleteFromSection';
import AssignStudentToCourseSectionUpdateStudent from './AssignStudentToCourseSectionUpdateStudent';


interface IBase {
    values?: any,
    label?: string,
    color?: string
}

export default function AssignStudentToCourseSectionStudentsBySection({ label, values, color }: IBase) {
    const disc = useDisclosure()

    const danhSachLop = useQuery<IEnrollment[]>({
        queryKey: [`AssignStudentToCourseSectionStudentsBySection`, values],
        queryFn: async () => {
            const body = {
                "courseTimeClusterIds": [],
                "courseSectionId": values?.id,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            }
            const response = await baseAxios.post("/Course/GetStudent", body);
            return response.data.data
        },
        enabled: disc[0]
    })

    const columns = useMemo<CustomColumnDef<any>[]>(
        () => [
            {
                header: "Họ tên học viên",
                accessorKey: "user.fullName"
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
                accessorFn(originalRow) {
                    return originalRow.user.gender === 1 ? "Nam" : originalRow.user.gender === 2 ? "Nữ" : "Không xác định";
                }
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
                    return (
                        <Group>
                            <Anchor>{originalRow.courseSection == null ? "" : originalRow.courseSection.code}</Anchor>
                        </Group>
                    );
                }
            },
            {
                header: "Mã khóa học",
                accessorKey: "courseTimeCluster.course.code",
            },
            {
                header: "Tên khóa học",
                accessorKey: "courseTimeCluster.course.name",
            },
            {
                header: "Cụm thời gian",
                accessorKey: "courseTimeCluster.timeCluster.name",
            },
            {
                header: "Chi nhánh",
                accessorKey: "courseSection.branch"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            }
        ],
        []
    );

    if (danhSachLop.isLoading) return "Đang tải dữ liệu..."
    if (danhSachLop.isError) return "Không có dữ liệu..."

    return (
        <Group>
            <CustomButtonModal
                buttonProps={{
                    actionType: "view",
                    children: "Danh sách học viên"
                }}
                modalProps={{
                    title: "Danh sách học viên",
                    size: "80%"
                }}
                disclosure={disc}
            >
                <CustomDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={danhSachLop.data!}
                    renderRowActions={({ row }) => (
                        <Center>
                            <AssignStudentToCourseSectionUpdateStudent EnrollData={row.original} />
                            <AssignStudentToCourseSectionDeleteFromSection data={row.original} />
                        </Center>
                    )}
                />
            </CustomButtonModal>
        </Group>
    )
}

interface IRole {
    aqModuleId: number | null;
    code: string;
    name: string;
    id: number;
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
