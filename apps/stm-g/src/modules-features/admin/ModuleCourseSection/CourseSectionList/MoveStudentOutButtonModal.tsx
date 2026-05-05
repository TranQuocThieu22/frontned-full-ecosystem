
import baseAxios from '@/api/config/baseAxios';
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUserShare } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { ICourseRegistrationInfoViewModel } from './Interfaces';
interface ICourseSection {
    courseId?: number;
    timeClusterId?: number;
    quantityStudent?: number;
    quantityStudentActual?: number;
    courseTimeClusterId?: number;
    isScheduled?: boolean;
    course?: {
        status?: number;
        programId?: number;
        startDateRegistration?: string;
        endDateRegistration?: string;
        testDate?: string;
        studyDate?: string;
        endDate?: string;
        price?: number;
        branchId?: number;
        skillCenterId?: number;
        skillCenter?: null;
        branch?: null;
        program?: {
            skillCenterId?: number;
            programTypeId?: number;
            totalClassPeriodNumber?: number;
            totalHours?: number;
            isTesting?: boolean;
            certificateId?: number;
            isCancel?: boolean;
            note?: string;
            price?: number;
            certificate?: null;
            skillCenter?: null;
            subjects?: null;
            programType?: null;
            programSubjects?: any[] | null;
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        };
        courseTimeClusters?: {
            courseId?: number;
            timeClusterId?: number;
            maxStudent?: number;
            courseSectionNumberTotal?: number;
            courseSectionNumber?: number;
            timeCluster?: {
                timeTypeId?: number;
                timeClusterDetails?: any[];
                id?: number;
                code?: string;
                name?: string;
                concurrencyStamp?: string;
                isEnabled?: boolean;
            };
            id?: number;
            code?: null | string;
            name?: null | string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
        }[];
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    timeCluster?: {
        timeTypeId?: number;
        timeClusterDetails?: any[];
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
    };
    roomPriority?: any[];
    courseSectionLecturer?: any[];
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

export function MoveStudentOutButtonModal(
    { studentRegistrationList, setStudentRegistrationList, courseTimeClusterId, courseSectionId }:
        {
            studentRegistrationList: ICourseRegistrationInfoViewModel[],
            setStudentRegistrationList: any
            courseTimeClusterId: number,
            courseSectionId: number
        }
) {
    const queryClient = useQueryClient()
    const disc = useDisclosure(false)
    const AllCourseSectionsbyCourseTimeClusterId = useQuery<ICourseSection[]>({
        queryKey: [`CourseSectionByCourseTimeClusterId`, courseTimeClusterId],
        queryFn: async () => {
            const response = await baseAxios.post("/CourseSection/Get", {
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
    })
    const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
        },
        {
            header: "Tên lớp",
            accessorKey: "name",
            size: 300
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
            header: "Số lượng học viên (dự kiến)",
            accessorKey: "quantityStudent",
        },
        {
            header: "Số lượng học viên",
            accessorKey: "quantityStudentActual",
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

    const [rowSelection, setRowSelection] = useState<ICourseSection[]>()

    const handleSelectCourseSection = async () => {
        if (rowSelection === undefined) return;

        const moveInStudentRegistrations = studentRegistrationList?.map(studentRegistration => ({
            id: studentRegistration.id,
            code: studentRegistration.code,
            name: studentRegistration.name,
            concurrencyStamp: studentRegistration.concurrencyStamp,
            isEnabled: studentRegistration.isEnabled,
            userId: studentRegistration.user!.id,
            courseTimeClusterId: courseTimeClusterId,
            courseSectionId: rowSelection[0]?.id,
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
            setStudentRegistrationList([])
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
                color='yellow'
                leftSection={<IconUserShare />}
                label="Chuyển lớp"
                title="Chọn lớp học theo cụm thời gian"
                disabled={studentRegistrationList.length === 0}
                disclosure={disc}
            >
                {AllCourseSectionsbyCourseTimeClusterId.isLoading && "Đang tải dữ liệu..."}
                {AllCourseSectionsbyCourseTimeClusterId.isError && "Lỗi khi tải dữ liệu..."}
                {AllCourseSectionsbyCourseTimeClusterId.isSuccess &&
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
                                            onClick={() => handleSelectCourseSection()}
                                        >
                                            Chọn
                                        </Button>
                                    </>
                                )
                            }}
                            enableRowSelection={true}
                            enableMultiRowSelection={false}
                            setSelectedRow={setRowSelection}
                            columns={columns}
                            data={AllCourseSectionsbyCourseTimeClusterId.data!}
                        />
                    </>
                }
            </MyButtonModal>
        </>
    )
}