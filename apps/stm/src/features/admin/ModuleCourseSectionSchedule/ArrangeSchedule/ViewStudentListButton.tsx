"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { ENUM_GENDER } from '@/constants/enum/global';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
;

export default function F8_4ViewStudentListButton(
    { courseSectionId }: { courseSectionId: number }
) {
    const disc = useDisclosure(false)
    const AllStudents = useQuery<IStudent[]>({
        queryKey: [`F8_4StudentByCourseSection${courseSectionId}`],
        queryFn: async () => {
            const response = await baseAxios.post("/Course/GetStudent", {
                "courseTimeClusterId": 0,
                "courseSectionId": courseSectionId,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data
        },
        enabled: disc[0]
    })

    const form = useForm({
        initialValues: {
            lecturerNote: "",
        }
    })

    const columns = useMemo<MRT_ColumnDef<IStudent>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return originalRow.user?.gender! === null ? '' : ENUM_GENDER[originalRow.user?.gender!]
            },
            size: 130
        },
        {
            header: "Ngày sinh",
            accessorFn(originalRow) {
                return originalRow.user?.dateOfBirth === null ? "" : utils_date_dateToDDMMYYYString(new Date(originalRow.user?.dateOfBirth!));
            },
            size: 140
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "user.email",
        },
        {
            header: "Trạng thái",
            accessorFn(originalRow) {
                // return "Trạng thái"
                return "";
            },
        }
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },
        // },
    ], []);


    return (
        <>
            <MyButtonModal
                modalSize={"100%"}
                variant='light'
                color='blue'
                label="Xem"
                title="Danh sách học viên"
                disclosure={disc}

            >
                <MyFlexColumn >
                    {AllStudents.isLoading && "Đang tải dữ liệu..."}
                    {AllStudents.isError && "Lỗi khi tải dữ liệu..."}
                    {AllStudents.isSuccess &&
                        <>
                            <MyDataTable
                                layoutMode='grid'
                                initialState={{
                                    density: "xs",
                                    pagination: { pageIndex: 0, pageSize: 10 },
                                    columnPinning: { right: ["mrt-row-actions"] },
                                    columnVisibility: {
                                        nguoiCapNhat: false,
                                        ngayCapNhat: false
                                    }
                                }}
                                columns={columns}
                                data={AllStudents.data!}
                            />
                        </>
                    }
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}

interface ITimeCluster {
    timeTypeId?: number;
    timeClusterDetails?: any[] | null;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
interface ICourseTimeCluster {
    courseId?: number;
    timeClusterId?: number;
    maxStudent?: number;
    timeCluster?: ITimeCluster;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}
interface ICourse {
    status: number;
    programId: number;
    startDateRegistration: string;
    endDateRegistration: string;
    testDate: string;
    studyDate: string;
    endDate: string;
    price: number;
    branchId: number;
    skillCenterId: number;
    skillCenter: any;
    branch: any;
    program: any;
    courseTimeClusters: ICourseTimeCluster[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
};
interface ICourseSection {
    courseId: number;
    timeClusterId: number;
    quantityStudent: number;
    course: ICourse;
    timeCluster: ITimeCluster;
    roomPriority: any[];
    courseSectionLecturer: any[];
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}
interface IRole {
    aqModuleId?: number | null;
    code?: string;
    name?: string;
    id?: number;
    createdWhen?: Date | null;
    createdBy?: Date | null;
    modifiedWhen?: Date | null;
    modifiedBy?: Date | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
}
interface IUser {
    id?: number;
    isBlocked?: boolean;
    roleId?: number;
    userName?: string;
    code?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string | null;
    fullName?: string;
    facultyId?: number | null;
    facultyName?: string | null;
    classId?: number | null;
    majorsId?: number | null;
    workingUnitId?: number | null;
    workingUnitName?: string | null;
    gender?: number;
    dateOfBirth?: Date;
    educationLevel?: number;
    modifiedBy?: number;
    modifiedWhen?: string;
    roles?: IRole[];
};
interface IStudent {
    userId?: number;
    courseTimeClusterId?: number;
    courseSectionId?: number;
    user?: IUser;
    courseTimeCluster?: ICourseTimeCluster;
    courseSection?: ICourseSection;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
}


