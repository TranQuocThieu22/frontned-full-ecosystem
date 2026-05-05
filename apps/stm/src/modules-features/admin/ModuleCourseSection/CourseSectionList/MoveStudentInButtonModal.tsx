'use client';
import baseAxios from '@/api/config/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { ENUM_GENDER } from '@/constants/enum/global';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserPlus } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { ICourseRegistrationInfoViewModel } from './Interfaces';

export function MoveStudentInButtonModal({ courseTimeClusterId, courseSectionId }: { courseTimeClusterId: number, courseSectionId: number }) {
    const disc = useDisclosure(false)
    const queryClient = useQueryClient()
    const AllStudents = useQuery<ICourseRegistrationInfoViewModel[]>({
        //todo: change get student by courseTimeClusterId to get student by courseSectionId where courseSectionId = null
        queryKey: [`StudentByCourseTimeClusterId`, courseTimeClusterId],
        queryFn: async () => {
            const response = await baseAxios.post("/Course/GetStudent", {
                "courseTimeClusterIds": [courseTimeClusterId],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "type": 1,
                "courseIds": [],
                "examIds": [],
                "pageSize": 0,
                "pageNumber": 0,
                "lecturerId": 0
            });
            return response.data.data
        },
        enabled: disc[0],
        refetchOnWindowFocus: false,
    })
    const columns = useMemo<MRT_ColumnDef<ICourseRegistrationInfoViewModel>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Mã sinh viên",
            accessorKey: "user.code",
        },
        {
            header: "Email",
            accessorKey: "user.email",
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber",
        },
        {
            header: "Giới tính",
            accessorFn: (row) => {
                return ENUM_GENDER[row.user?.gender!]
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

    const [rowSelection, setRowSelection] = useState<ICourseRegistrationInfoViewModel[]>()

    const handleSelectStudent = async () => {
        if (rowSelection === undefined) return;
        const moveInStudentRegistrations = rowSelection?.map(studentRegistration => ({
            id: studentRegistration.id,
            code: studentRegistration.code,
            name: studentRegistration.name,
            concurrencyStamp: studentRegistration.concurrencyStamp,
            isEnabled: studentRegistration.isEnabled,
            userId: studentRegistration.user!.id,
            courseTimeClusterId: courseTimeClusterId,
            courseSectionId: courseSectionId,
            receiptType: studentRegistration.receiptType,
            receiptCode: studentRegistration.receiptCode,
            receiptPrice: studentRegistration.receiptPrice,
            receiptLink: studentRegistration.receiptLink,
            receiptNote: studentRegistration.receiptNote,
            note: studentRegistration.note,
            isCheck: studentRegistration.isCheck,
            totalPoint: studentRegistration.totalPoint,
            isPass: studentRegistration.isPass,
        })) || [];

        let response = await baseAxios.post("/Course/CourseRegistration", moveInStudentRegistrations)
        if (response.data.isSuccess === 1) {
            queryClient.invalidateQueries({ queryKey: [`StudentByCourseSection${courseSectionId}`] })
            queryClient.invalidateQueries({ queryKey: [`AllCourseSection`] })
            notifications.show({
                color: "green",
                message: `Thao tác thành công`,
                title: "Thành công"
            })
        } else {
            notifications.show({
                color: "red",
                message: `Thao tác thất bại`,
                title: "Thất bại"
            })
        }
        disc[1].close()
    }

    return (
        <>
            <MyButtonModal
                modalSize={"80%"}
                color='green'
                leftSection={<IconUserPlus />}
                label="Thêm"
                title="Thêm học viên vào lớp"
                disclosure={disc}
            >
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
                                // columnVisibility: {
                                //     nguoiCapNhat: false,
                                //     ngayCapNhat: false
                                // }
                            }}
                            renderTopToolbarCustomActions={() => {
                                return (
                                    <>
                                        <Button
                                            onClick={() => handleSelectStudent()}>
                                            Chọn
                                        </Button>
                                    </>
                                )
                            }}
                            enableRowSelection={true}
                            setSelectedRow={setRowSelection}
                            columns={columns}
                            data={AllStudents.data!}
                        />
                    </>
                }
            </MyButtonModal>
        </>
    )
}