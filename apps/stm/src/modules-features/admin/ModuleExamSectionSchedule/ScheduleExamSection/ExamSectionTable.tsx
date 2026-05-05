'use client'
import baseAxios from "@/api/config/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableShortcut } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F8_4DeleteCSSchedule from "./DeleteExamSectionButton";
import F8_4DeleteListCSSchedule from "./DeleteListExamSectionButton";
import { IExamSection, ITimeType, ITimeTypeDetail } from "./Interfaces/ExamSection";
import SelectRoomsButtonModal from "./SelectRoomsButtonModal";

export default function ExamSectionTable() {
    const AllExamSections = useQuery<IExamSection[]>({
        queryKey: [`MenuScheduleExamSection`],
        queryFn: async () => {
            const response = await baseAxios.post("/CourseSection/Get", {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "type": 2,
                "courseIds": [],
                "examIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const ExamStartPeriod = useState<number>(0)

    const TimeType = useQuery<ITimeType>({
        queryKey: [`MenuScheduleExamSection_TimeType`],
        queryFn: async () => {
            const response = await baseAxios.get(`TimeType/Get?id=1&cols=timeTypeDetails`);
            const data = response.data.data;

            // Find the timeTypeDetail with isStartTest = true and set its order
            const startTestPeriod = data.timeTypeDetails?.find((detail: ITimeTypeDetail) => detail.isStartTest === true);
            if (startTestPeriod) {
                ExamStartPeriod[1](startTestPeriod.order);
            }
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const columns = useMemo<MRT_ColumnDef<IExamSection>[]>(
        () => [
            {
                header: "Mã khóa thi",
                accessorKey: "exam.code",
            },
            {
                header: "Tên khóa thi",
                accessorKey: "exam.name",
            }, {
                header: "Mã nhóm thi",
                accessorKey: "code",
            },
            {
                header: "Phòng",
                accessorFn(originalRow) {
                    return originalRow.roomPriority?.map(x => x.address?.name).join(", ")
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <SelectRoomsButtonModal
                                examSectionId={row.original.id!}
                                selectedAddressesValue={row.original.roomPriority!}
                                originalRow={row.original}
                                startPeriod={ExamStartPeriod[0]}
                            />
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.roomPriority?.map(x => x.address?.name).join("\n")}
                            </div>
                        </>
                    )
                }
            },
            {
                header: "Ngày",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.exam?.officialExamDate!))
                }
            },
            {
                header: "Thứ",
                accessorFn(originalRow) {
                    return utils_date_getWeekDay(new Date(originalRow.exam?.officialExamDate!), "vi")
                }
            },
            {
                header: "Tiết bắt đầu",
                accessorFn(originalRow) {
                    // return ExamStartPeriod[0]
                    return 'Chưa có dữ liệu'

                }
            },
            {
                header: "Số tiết",
                accessorKey: "exam.classPeriod"
            },
            {
                header: "Số phút",
                accessorFn(originalRow) {
                    return handleMappingMinutesForEachTimeTypeDetail(ExamStartPeriod[0], ExamStartPeriod[0] + originalRow.exam?.classPeriod! - 1, TimeType.data!)
                }
            },
            {
                header: "Trạng thái",
                accessorFn(originalRow) {
                    return DisplayStatus(originalRow.status!)
                }
            },

            //     {
            //         accessorKey: "nguoiCapNhat",
            //         header: "Người cập nhật"
            //     },
            //     {
            //         accessorKey: "ngayCapNhat",
            //         header: "Ngày cập nhật",
            //         accessorFn(originalRow) {
            //             return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!))
            //         },
            //     }
        ],
        [ExamStartPeriod[0]]
    );

    const SelectedExamSection = useState<IExamSection[]>()


    let handleCallAPICourseSectionSchedule = async () => {
        const courseSectionIds = SelectedExamSection[0]!.map(section => section.id);
        let res = await baseAxios.post(`/CourseSection/CourseSectionSchedule`,
            courseSectionIds
        );
        if (res.data.isSuccess) {
            AllExamSections.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch thi thành công",
                color: "green"
            });
        }
        if (res.data.isSuccess !== 1) {
            AllExamSections.refetch();
            notifications.show({
                title: "Thông báo",
                message: "Xếp lịch thi thất bại",
                color: "red"
            });
        }
    }

    if (AllExamSections.isLoading) return "Đang tải dữ liệu..."
    if (AllExamSections.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllExamSections.data!}
            setSelectedRow={SelectedExamSection[1]}
            renderRowActions={({ row }) => {
                return (
                    <>
                        <Group justify="center">
                            <F8_4DeleteCSSchedule
                                examSectionid={row.original.id!}
                            />
                        </Group>
                    </>
                )
            }}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <Button
                                disabled={SelectedExamSection[0]?.length === 0}
                                onClick={() => {
                                    handleCallAPICourseSectionSchedule()
                                }}
                                color="cyan" leftSection={<IconTableShortcut />}
                            >
                                Xếp lịch thi
                            </Button>
                            <Button color="teal">Import</Button>
                            <Button color="green">Export</Button>
                            <F8_4DeleteListCSSchedule values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </Group>
                    </>
                )
            }}
        />
    )
}

const DisplayStatus = (status: number) => {
    switch (status) {
        case 0:
            return "Đang diễn ra";
        case 1:
            return "Đã Hoàn thành";
        case 2:
            return "Hủy";
        case 3:
            return "Tạm ngưng";
        default:
            return "Chưa có trạng thái";
    }
}

const handleMappingMinutesForEachTimeTypeDetail = (classPeriodStart: number, classPeriodEnd: number, timeType: ITimeType) => {
    return timeType.timeTypeDetails?.slice(classPeriodStart, classPeriodEnd + 1).reduce((acc, cur) => acc + cur.minuteNumber!, 0) || 0;
}
