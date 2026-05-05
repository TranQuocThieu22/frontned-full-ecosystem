'use client'
import baseAxios from "@/api/config/baseAxios";
import { I_ChangedLecturerData } from "@/app/admin/(8)/teachingAssignment/page";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import ChoseLecturer from "./ChoseLecturer";
import StudentListByClass from "./StudentListByClass";
import useSTeachingAssignment from "./useSTeachingAssignment";
//REVIEW: quocThieu 48101

interface Iprogram {
    totalClassPeriodNumber?: number //tổng số tiết
}
interface Icourse {
    startDateRegistration?: Date,
    program?: Iprogram
}

interface ItimeCluster {
    name?: string
}
export interface I8_2User {
    id?: string
    isBlocked?: boolean;
    roleId?: number;
    code?: string;
    avatarPath?: string;
    educationLevel?: number,
    courseSectionStudentPoints?: any[]
    fullName?: string
    email?: string
    gender?: number
    dateOfBirth?: Date,
    phoneNumber?: string,
}

export interface I8_2lecturer {
    id?: number;
    code?: string;
    user?: I8_2User;
    name?: string;
    concurrencyStamp?: string,
    isEnabled?: boolean,
}

export interface I8_2DanhSachLop {
    id?: number;
    code?: string;
    name?: string;
    course?: Icourse
    timeCluster?: ItimeCluster
    quantityStudent?: number;
    courseSectionLecturer?: I8_2lecturer[]
    ngayCapNhat?: Date;  // Thêm trường này
    nguoiCapNhat?: string; // Thêm trường này
}

export default function TeachingAssignmentTable(
    {
        selectedLecturerList,
        khoaHocId,
        unselectedLecturerList }:
        {
            selectedLecturerList: I_ChangedLecturerData[],
            khoaHocId: number,
            unselectedLecturerList: I_ChangedLecturerData[]
        }) {
    const disc = useDisclosure();
    const store = useSTeachingAssignment()
    const query = useQuery<I[]>({
        queryKey: [`F8_2Read`],
        queryFn: async () => {
            const response = await baseAxios.post("/courseSection/get", {
                "courseTimeClusterId": 0,
                "courseSectionId": 0,
                "courseIds": [khoaHocId],
                "pageSize": 0,
                "pageNumber": 0
            });

            const result = response.data.data;

            return result
        },
        refetchOnWindowFocus: false
    });


    const generateData = (userId: number, courseSectionId: number, id: number, isEnabled: boolean): DataTemplate => {
        return {
            id: id,
            code: "string",
            name: "string",
            concurrencyStamp: "string",
            isEnabled: isEnabled,
            courseSectionId,
            userId: userId,
        };
    }

    const [selectedRow, setSelectedRow] = useState<number[]>([0]);
    const [selectedRowObj, setSelectedRowObj] = useState<ICourse[]>([]);
    const handleRowClick = (itemId: any) => {
        //single
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow.includes(itemId) ? prevSelectedRow : [itemId, ...prevSelectedRow]
        );

    };
    const handleRowClickGetObj = (item: any) => {
        //single
        setSelectedRowObj((prevSelectedRow) =>
            prevSelectedRow.includes(item) ? prevSelectedRow : [item, ...prevSelectedRow]
        );

    };
    const columns = useMemo<MRT_ColumnDef<I8_2DanhSachLop>[]>(
        () => [
            { header: "Mã lớp", accessorKey: "code" },
            { header: "Tên khóa học", accessorKey: "courseTimeCluster.course.name" },
            {
                header: "Ngày khai giảng",
                accessorKey: "courseTimeCluster.course.studyDate",
                accessorFn: (row: any) => {
                    if (row.courseTimeCluster) {
                        return utils_date_dateToDDMMYYYString(new Date(row.courseTimeCluster.course.studyDate ?? new Date()))
                    } else {
                        return null
                    }
                }
            },
            {
                header: "Tổng số tiết",
                accessorKey: "course.program.totalClassPeriodNumber",
            },
            { header: "Cụm thời gian", accessorKey: "courseTimeCluster.timeCluster.name" },
            {
                header: "Sĩ số",
                accessorKey: "quantityStudent",
            },
            {
                header: "Danh sách học viên",
                accessorKey: "danhSachHocVien",
                accessorFn(originalRow) {
                    return (
                        <Group>
                            <StudentListByClass label="Xem" color="indigo" values={originalRow} />
                        </Group>
                    );
                }
            },
            {
                header: "Chọn giảng viên",
                minSize: 250,
                accessorFn: (row) => <ChoseLecturer
                    currentRowId={row.id || 0}
                    danhSachGiangVien={row.courseSectionLecturer!}
                    selectedLecturerList={selectedLecturerList}
                    unselectedLecturerList={unselectedLecturerList}
                />
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat!))
            },
            { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        ],
        [khoaHocId]
    );

    useEffect(() => {
        query.refetch()
    }, [khoaHocId])

    useEffect(() => {
        if (selectedRow.length > 0) {
            return
        }
        if (query.data) {
            setSelectedRow([query.data[0]?.id!]);
            store.setProperty("courseSectionLecturers", query.data[0]?.courseSectionLecturer ?? [])
        }
    }, [query.data]);

    useEffect(() => {
        if (!query.data) {
            return
        }
        store.setProperty("courseSectionLecturers", selectedRowObj[0]?.courseSectionLecturer ?? [])
    }, [selectedRowObj])

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyFieldset mt="10" title="Danh sách lớp" w={"100%"}>
            <MyDataTable
                columns={columns}
                data={query.data!}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        handleRowClick(row.original.id)
                        handleRowClickGetObj(row.original)

                    },
                    style: {
                        cursor: 'pointer',
                        backgroundColor: selectedRow.includes(row.original.id!) ? '#d0e7ff' : 'transparent',
                    },
                })}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => {
                    return <Button onClick={async () => {
                        if (selectedRow.length === 0 || selectedRow[0] === 0) {
                            notifications.show({
                                message: "Chưa chọn dữ liệu lớp!", // No data has changed
                                color: "yellow",
                            });
                            disc[1].close();
                            return;
                        }

                        let data1: DataTemplate[] = [];
                        let data2: DataTemplate[] = [];
                        let tempId: number[] = []
                        // Iterate through the query data
                        query.data!.forEach((item) => {
                            let hasMatchingUser = false;

                            // Iterate through each lecturer in the course section
                            item.courseSectionLecturer?.forEach((user) => {
                                const { userId, id } = user;
                                const userNewSelectedData = selectedLecturerList.find(
                                    (lecturer) => lecturer.lecturerId === userId && lecturer.changedRowId === item.id
                                );

                                // If the user is selected, remove them from the selection and generate data
                                if (id > 0 && userNewSelectedData) {
                                    data1.push(generateData(userNewSelectedData.lecturerId, userNewSelectedData.changedRowId, id, true))
                                    hasMatchingUser = true;
                                }

                                const userBeUnselectedData = unselectedLecturerList.find(
                                    (lecturer) => lecturer.lecturerId === userId && lecturer.changedRowId === item.id
                                );

                                // If the user was previously selected, generate data for removal
                                if (id > 0 && userBeUnselectedData) {
                                    tempId.push(id);

                                    data2.push(generateData(userBeUnselectedData.lecturerId, userBeUnselectedData.changedRowId, id, false))

                                }
                            });

                            // If no matching user was found, generate data with a default user ID of 0
                            if (!hasMatchingUser) {
                                let newSelectedList = selectedLecturerList.filter(lecturer => lecturer.changedRowId === item.id)
                                newSelectedList.forEach(newSelectedData => {
                                    let changedRowId = newSelectedData?.changedRowId
                                    let lecturerId = newSelectedData?.lecturerId
                                    if (changedRowId && lecturerId) {
                                        data1.push(generateData(lecturerId, changedRowId, 0, true))
                                    }
                                })
                            }
                        });

                        // Merge both datasets
                        const combinedData = [...data1, ...data2];

                        // If there's no data to update, show a notification and exit
                        if (combinedData.length === 0) {
                            notifications.show({
                                message: "Chưa có dữ liệu thay đổi!", // No data has changed
                                color: "blue",
                            });
                            // Close the second dialog or modal in the `disc` array
                            disc[1].close();
                            return;
                        }

                        // If data exists, proceed with the API request and show a success notification
                        notifications.show({
                            message: "Lưu thành công", // Save successful
                            color: "green",
                        });
                        await baseAxios.post("/CourseSection/AddLecturer", combinedData);

                        selectedLecturerList = [];
                        unselectedLecturerList = [];
                        setSelectedRow([0]);

                        // Close the second dialog or modal in the `disc` array
                        disc[1].close();
                        await query.refetch()

                    }}>Lưu</Button>
                }}
            />
        </MyFieldset>
    );
}
interface I {
    id?: number;
    code?: string;
    courseName?: string;
    startDateRegistration?: Date | undefined;
    totalClassPeriodNumber?: number;
    totalHours?: number;
    timeClusterDetails?: ItimeClusterDetails[];
    quantityStudent?: number;
    dsHocVien?: number;
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
    course: ICourse
    courseSectionLecturer?: CourseSectionLecturer[]
}
interface ICourse {
    id?: number,
    code?: string,
    name?: string,
    startDateRegistration?: Date | undefined;
    courseSectionLecturer?: CourseSectionLecturer[];
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
type DataTemplate = {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    userId: number;
    courseSectionId: number;
};
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

