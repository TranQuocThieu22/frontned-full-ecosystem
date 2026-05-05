'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export default function CourseSectionAndStudentDeletion({ data }: { data: any }) {
    const disc = useDisclosure()

    const danhSachSinhVien = useQuery<IEnrollment[]>({
        queryKey: [`F8_1CourseSectionStudentDeletion`, data?.id],
        queryFn: async () => {
            const body = {
                courseTimeClusterId: 0,
                courseSectionId: data?.id,
                courseIds: [],
                pageSize: 0,
                pageNumber: 0
            };
            const response = await baseAxios.post("/Course/GetStudent", body);
            return response.data.data;
        },
        enabled: disc[0]
    });

    useEffect(() => {
        if (danhSachSinhVien.isError) {
            console.error("Error fetching student list");
        }
    }, [danhSachSinhVien.isError]);

    if (danhSachSinhVien.isLoading) return <div>Loading...</div>;
    if (danhSachSinhVien.isError) return <div>Error...</div>;

    const handleDelete = async () => {
        try {
            if (danhSachSinhVien.data?.length) {
                const requests = danhSachSinhVien.data.map(sinhvien =>
                    baseAxios.post("/Course/CourseRegistration", [
                        {
                            id: sinhvien.id,
                            code: "string",
                            name: "string",
                            concurrencyStamp: "string",
                            isEnabled: true,
                            userId: sinhvien.userId,
                            courseTimeClusterId: sinhvien.courseTimeClusterId,
                            courseSectionId: null
                        }
                    ])
                );
                await Promise.all(requests);
            }
            await baseAxios.post("/courseSection/delete", { id: data.id });
        } catch (error) {
            console.error("Error deleting course section", error);
        }
    };

    return <MyActionIconDelete onSubmit={handleDelete}></MyActionIconDelete>;
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

