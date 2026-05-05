'use client'
import baseAxios from "@/api/config/baseAxios";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import TeachingAssignmentTable from "@/modules-features/(8)/teachingAssignment/TeachingAssignmentTable";
import { Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface IKhoaHoc {
    id?: number;
    code?: string;
    name?: string;
}
interface CourseSectionLecturer {
    userId: number;
    courseId: number | null;
    user: any | null; // Consider using a specific type instead of 'any' if possible
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
}

export interface I_ChangedLecturerData {
    changedRowId: number;
    lecturerId: number;
}

export default function Page() {
    const courseQuery = useQuery<IKhoaHoc[]>({
        queryKey: [`roomTypesCreate`],
        queryFn: async () => {
            const response = await baseAxios.get("/course/getall");
            const result = response.data.data;
            return result
        },
    })
    const [unselectedLecturerList, setUnSelectedRowId] = useState<I_ChangedLecturerData[]>([]);
    const [selectedLecturerList, setSelectedRowId] = useState<I_ChangedLecturerData[]>([]);
    const form = useForm<IKhoaHoc>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
        },
    })
    useEffect(() => {
        if (courseQuery.data && courseQuery?.data[0]?.id) {
            form.setFieldValue("id", courseQuery?.data[0]?.id);
        }
    }, [courseQuery.isSuccess]);
    if (courseQuery.isLoading) return <div>Loading...</div>
    return (

        <MyPageContent>
            <Group grow>
                <Select
                    // clearable
                    placeholder='Chọn khóa học'
                    label='Chọn Khóa học'
                    data={courseQuery.data?.map((item: IKhoaHoc) => ({
                        value: item.id?.toString()!,
                        label: item.name! == null ? "" : item.name!
                    }))}
                    {...form.getInputProps("id")}
                    value={form.values.id?.toString()}
                    defaultValue={courseQuery.data?.[0]?.id?.toString()}
                    onChange={(value: any): void => form.setFieldValue("id", parseInt(value?.toString()!))}
                />
            </Group>
            {courseQuery.data && form.getValues().id &&
                <MyFlexRow align={"start"} gap={0}>
                    <TeachingAssignmentTable
                        selectedLecturerList={selectedLecturerList}
                        khoaHocId={form.getValues().id!}
                        unselectedLecturerList={unselectedLecturerList}
                    />
                </MyFlexRow>
            }
        </MyPageContent >

    )
}
