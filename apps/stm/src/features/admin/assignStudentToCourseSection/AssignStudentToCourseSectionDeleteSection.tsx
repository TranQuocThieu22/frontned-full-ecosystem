'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export default function AssignStudentToCourseSectionDeleteSection({ data }: { data: any }) {
    const disc = useDisclosure()

    const danhSachSinhVien = useQuery<IEnrollment[]>({
        queryKey: [`AssignStudentToCourseSectionDeleteSection`, data?.id],
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
        return baseAxios.post("/courseSection/delete", { id: data.id });
    };

    return <CustomActionIconDelete onSubmit={handleDelete} />;
}

interface IEnrollment {
    userId: number;
    courseTimeClusterId: number;
    courseSectionId: number;
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string | null;
    isEnabled: boolean;
}
