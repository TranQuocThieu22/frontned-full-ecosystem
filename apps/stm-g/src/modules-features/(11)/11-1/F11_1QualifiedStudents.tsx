"use client"
import baseAxios from "@/api/config/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChecklist } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_1Delete from "./F11_1Delete";
import F11_1Update from "./F11_1Update";

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
interface IBase {
    values?: any,
    label?: string,
    color?: string

}
export default function F11_1QualifiedStudents({ label, values, color }: IBase) {
    const disc = useDisclosure()
    const studentListQuery = useQuery<IEnrollment[]>({
        queryKey: [`F11_1StudentListByExam`, values.examIds],
        queryFn: async () => {
            if (!values.examIds || values.examIds.length === 0) return []; // Không gọi API nếu examIds rỗng

            const body = {
                courseSectionId: 0,
                programId: 0,
                status: 0,
                examIds: values.examIds,
                pageSize: 0,
                pageNumber: 0
            };
            const response = await baseAxios.post("/Exam/GetStudent", body);
            return response.data?.data?.map((enrollment: { user: any; }) => ({
                ...enrollment,
                user: enrollment.user || {} // Đảm bảo user không bị null
            })) || [];
        },
        enabled: disc[0] && values.examIds && values.examIds.length > 0 // Chỉ kích hoạt khi có examIds
    });


    const columnChonKhoaHoc = useMemo<MRT_ColumnDef<IEnrollment>[]>(
        () => [

            {
                header: "Họ và tên",
                accessorKey: "user.fullname",
                accessorFn: (originalRow) => originalRow.user ? originalRow.user.fullName : "Không có dữ liệu"
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
            },
            {
                header: "Ngày sinh",
                accessorKey: "dateOfBrith",
                accessorFn: (originalRow) => utils_date_dateToDDMMYYYString(new Date(originalRow.user.dateOfBirth!))
            },
            {
                header: "Khóa thi",
                accessorKey: "values.exams",
            },
            {
                header: "Điểm thi",
                accessorKey: "diemThi",
            },
            // {
            //     header: "Đạt",
            //     accessorKey: "dat",
            //     accessorFn: (originalRow) => {
            //         return (
            //             <Checkbox defaultChecked={originalRow.dat} ></Checkbox>
            //         )
            //     }

            // },
        ],
        []
    );
    return (
        <Group>
            <MyButtonModal disclosure={disc} modalSize={'90%'} title="Danh sách đạt cấp chứng chỉ" label={label} color={color}>

                <MyDataTable
                    exportAble
                    enableRowSelection={true}
                    columns={columnChonKhoaHoc}
                    enableRowNumbers={true}
                    data={studentListQuery.data || []}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <Button leftSection={<IconChecklist />}
                                onClick={async () => {

                                }}>Lưu</Button>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F11_1Update data={row.original} />
                                <F11_1Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}

                />
            </MyButtonModal >
        </Group>
    )
}

