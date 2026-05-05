'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCancel, IconCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { ICourseSectionViewModel } from "./Interfaces/CourseSectionViewModel";

export default function CourseSectionTable() {
    // const [fileData, setFileData] = useState<any[]>([]);

    const discCompleteCourse = useDisclosure(false);
    const discCancelCompleteCourse = useDisclosure(false);

    const AllCourseSections = useQuery<ICourseSectionViewModel[]>({
        queryKey: [`CompleteCourseSection_GetAll`],
        queryFn: async () => {
            const response = await baseAxios.post("/CourseSection/Get", {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data;
        },
    })

    const SelectedCourseSection = useState<ICourseSectionViewModel[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available


    const formatFunctions = {
        date: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        hasExam: (value: boolean) => (value ? "Có" : "Không"),
        formatTimeCategory: (value: string[]) => {
            return value.join(", ");
        }
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã khóa học"
            },
            {
                fieldName: "nam",
                header: "Tên khóa học"
            },
            {
                fieldName: "programName",
                header: "Tên chương trình"
            },
            {
                fieldName: "programType",
                header: "Loại chương trình"
            },
            {
                fieldName: "startDate",
                header: "Ngày khai giảng",
                formatFn: formatFunctions.date
            },
            {
                fieldName: "endDate",
                header: "Ngày kết thúc",
                formatFn: formatFunctions.date,
            },
            {
                fieldName: "examDate",
                header: "Ngày thi",
                formatFn: formatFunctions.date
            },
            {
                fieldName: "hasExam",
                header: "Có thi",
                formatFn: formatFunctions.hasExam
            },
            {
                fieldName: "totalSession",
                header: "Tổng số tiết"
            },
            {
                fieldName: "totalDurationByHour",
                header: "Tổng số giờ"
            },
            {
                fieldName: "fee",
                header: "Học phí"
            },
            {
                fieldName: "timeCategory",
                header: "Cụm thời gian",
                formatFn: formatFunctions.formatTimeCategory
            },
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICourseSectionViewModel>[]>(
        () => [
            {
                header: "Mã lớp",
                accessorKey: "code",
            },
            {
                header: "Sĩ số",
                accessorKey: "quantityStudentActual",
            },
            {
                header: "Mã Giảng viên",
                accessorFn(originalRow) {
                    return originalRow.courseSectionLecturer?.map((csl) => csl.user?.code).join(", ");
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.courseSectionLecturer?.map((csl) => csl.user?.code).join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Giảng viên",
                accessorFn(originalRow) {
                    return originalRow.courseSectionLecturer?.map((csl) => csl.user?.fullName).join(", ");
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.courseSectionLecturer?.map((csl) => csl.user?.fullName).join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Chương trình",
                accessorKey: "courseTimeCluster.course.program.name",
            },
            {
                header: "Trạng thái",
                accessorFn(originalRow) {
                    return DisplayCSStatus(originalRow.status);
                }

            },
            {
                header: "Số thành phần điểm đã nhập",
                accessorFn: (row) => {
                    return 0
                }
            },
            {
                header: "Đạt",
                accessorFn: (row) => {
                    return 0
                }
            }
            // {
            //     header: "Người cập nhật",
            //     accessorKey: "modifiedBy",
            // },
            // {
            //     header: "Ngày cập nhật",
            //     accessorKey: "modifiedWhen",
            //     accessorFn(originalRow) {
            //         return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            //     },
            // }
        ]
        ,
        []
    );


    let handleCompleteCourseSection = async () => {
        const courseSections = SelectedCourseSection[0]!.map(section =>
        ({
            id: section.id,
            code: section.code,
            name: section.name,
            concurrencyStamp: section.concurrencyStamp,
            isEnabled: section.isEnabled,
            courseId: section.courseId,
            timeClusterId: section.timeClusterId,
            quantityStudent: section.quantityStudent,
            courseTimeClusterId: section.courseTimeClusterId,
            status: 6,
            type: 1
        })
        );

        let res = await baseAxios.post(`/CourseSection/UpdateList`,
            courseSections
        );

        if (res.data.isSuccess === 1) {
            AllCourseSections.refetch();
            discCompleteCourse[1].close()
            notifications.show({
                title: "Hoàn thành giảng dạy",
                message: "Thao tác thành công",
                color: "green"
            });
        } else {
            notifications.show({
                title: "Có lỗi xảy ra",
                message: "Có lỗi xảy ra",
                color: "red"
            });
        }
        SelectedCourseSection[1]([]);
        setRowSelection({});
    }

    let handleCancelCompleteCourseSection = async () => {
        const courseSections = SelectedCourseSection[0]!.map(section =>
        ({
            id: section.id,
            code: section.code,
            name: section.name,
            concurrencyStamp: section.concurrencyStamp,
            isEnabled: section.isEnabled,
            courseId: section.courseId,
            timeClusterId: section.timeClusterId,
            quantityStudent: section.quantityStudent,
            courseTimeClusterId: section.courseTimeClusterId,
            status: 4,
            type: 1
        })
        );

        let res = await baseAxios.post(`/CourseSection/UpdateList`,
            courseSections
        );

        if (res.data.isSuccess === 1) {
            AllCourseSections.refetch();
            discCancelCompleteCourse[1].close()
            notifications.show({
                title: "Hủy hoàn thành giảng dạy",
                message: "Thao tác thành công",
                color: "green"
            });
        } else {
            notifications.show({
                title: "Có lỗi xảy ra",
                message: "Có lỗi xảy ra",
                color: "red"
            });
        }
        SelectedCourseSection[1]([]);
        setRowSelection({});
    }

    if (AllCourseSections.isLoading) return "Đang tải dữ liệu..."
    if (AllCourseSections.isError) return "Không có dữ liệu..."
    return (
        <>
            <MyDataTable
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={AllCourseSections.data!}
                setSelectedRow={SelectedCourseSection[1]}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <Button
                                    disabled={SelectedCourseSection[0]?.length === 0}
                                    color="green" leftSection={<IconCheck />}
                                    onClick={() => {
                                        discCompleteCourse[1].open()
                                    }}
                                >Hoàn thành
                                </Button>
                                <Button
                                    disabled={SelectedCourseSection[0]?.length === 0}
                                    color="red" leftSection={<IconCancel />}
                                    onClick={() => {
                                        discCancelCompleteCourse[1].open()
                                    }}
                                >
                                    Hủy hoàn thành
                                </Button>
                            </Group>
                        </>
                    )
                }}
            />
            <Modal opened={discCompleteCourse[0]} onClose={discCompleteCourse[1].close} title="Xác nhận hoàn thành giảng dạy">
                <Group mt={10} justify="center">
                    <Title order={5} fw={400}>
                        Bạn đang <Text span fw={700} tt="uppercase" c="green" inherit>xác nhận hoàn thành</Text> giảng dạy cho <Text span fw={600} inherit>{SelectedCourseSection[0]?.length}</Text> lớp được chọn?
                        Bạn có chắc chắn về thao tác này?
                    </Title>
                </Group>
                <Group mt="xl" justify="center" grow>
                    <Button
                        color="green"
                        onClick={handleCompleteCourseSection}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        color="gray"
                        onClick={
                            discCompleteCourse[1].close
                        }
                    >
                        Kiểm tra lại
                    </Button>
                </Group>
            </Modal>


            <Modal opened={discCancelCompleteCourse[0]} onClose={discCancelCompleteCourse[1].close} title="Hủy hoàn thành giảng dạy">
                <Group mt={10} justify="center">
                    <Title order={5} fw={400}>
                        Bạn đang <Text span fw={700} tt="uppercase" c="red" inherit>hủy hoàn thành</Text> giảng dạy cho <Text span fw={600} inherit>{SelectedCourseSection[0]?.length}</Text> lớp được chọn?
                        Bạn có chắc chắn về thao tác này?
                    </Title>
                </Group>
                <Group mt="xl" justify="center" grow>
                    <Button
                        color="green"
                        onClick={handleCancelCompleteCourseSection}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        color="gray"
                        onClick={
                            discCancelCompleteCourse[1].close
                        }
                    >
                        Kiểm tra lại
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

function DisplayCSStatus(status: number) {
    switch (status) {
        case 1:
            return "Chưa mở đăng ký";
        case 2:
            return "Đang mở đăng ký";
        case 3:
            return "Đóng đăng ký";
        case 4:
            return "Đã bắt đầu";
        case 5:
            return "Đang tạm dừng";
        case 6:
            return "Hoàn thành";
        case 7:
            return "Đã đóng";
        case 8:
            return "Bị hủy";
        default:
            return "Chưa có trạng thái";
    }
}