"use client"
import baseAxios from '@/api/config/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { ENUM_GENDER } from '@/constants/enum/global';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { ICourseRegistrationInfoViewModel } from './Interfaces';
import { MoveStudentInButtonModal } from './MoveStudentInButtonModal';
import { MoveStudentOutButtonModal } from './MoveStudentOutButtonModal';

export default function ManageStudentListButton(
    { courseTimeClusterId, courseSectionId }: { courseTimeClusterId: number, courseSectionId: number }
) {
    const disc = useDisclosure(false)
    const AllStudents = useQuery<ICourseRegistrationInfoViewModel[] | any>({
        queryKey: [`StudentByCourseSection${courseSectionId}`],
        queryFn: async () => {
            const response = await baseAxios.post("/Course/GetStudent",
                {
                    "courseTimeClusterIds": [],
                    "courseSectionId": courseSectionId,
                    "programId": 0,
                    "status": 0,
                    "type": 1,
                    "courseIds": [],
                    "examIds": [],
                    "pageSize": 0,
                    "pageNumber": 0,
                    "lecturerId": 0
                }
            );
            return response.data.data
        },
        enabled: disc[0],
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<ICourseRegistrationInfoViewModel>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return ENUM_GENDER[originalRow.user?.gender!]
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
            header: "Mã lớp",
            accessorKey: "courseSection.code",

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
            // accessorKey: "courseTimeCluster.course.branch.name",
            accessorFn(originalRow) {
                return "chưa có dữ liệu"
            },
        },
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

    let selectedStudentToChangeCourseSection = useState<ICourseRegistrationInfoViewModel[]>()

    return (
        <>
            <MyButtonModal
                modalSize={"100%"}
                variant='light'
                color='lime'
                label="Xem/Hiệu chỉnh"
                title="Danh sách học viên"
                disclosure={disc}

            >
                <MyFlexColumn >
                    <>
                        <MyDataTable
                            renderTopToolbarCustomActions={() => (
                                <Group>
                                    <MoveStudentInButtonModal
                                        courseTimeClusterId={courseTimeClusterId}
                                        courseSectionId={courseSectionId} />
                                    <MoveStudentOutButtonModal
                                        courseTimeClusterId={courseTimeClusterId}
                                        courseSectionId={courseSectionId}
                                        studentRegistrationList={selectedStudentToChangeCourseSection[0] || []}
                                        setStudentRegistrationList={selectedStudentToChangeCourseSection[1]} />
                                </Group>
                            )}
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
                            enableRowSelection={true}
                            enableMultiRowSelection={true}
                            setSelectedRow={selectedStudentToChangeCourseSection[1]}
                            columns={columns}
                            data={AllStudents.data || []}
                        />
                    </>
                </MyFlexColumn>
            </MyButtonModal>
        </>
    )
}


