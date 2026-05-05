'use client'
import baseAxios from "@/api/config/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { ENUM_COURSE_STATUS } from "@/constants/enum/global";
import { ICourseInfoViewModel } from "@/interfacesForViewModels/Course/ICourseInfoViewModel";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { ActionIcon, Badge, Button, Center, Checkbox, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook2, IconCheck, IconClock, IconEdit, IconFlag, IconLock, IconPlayerPause, IconSquareCheckFilled, IconTrash, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import CourseCreateButton from "./CourseCreateButton";
import CourseDeleteListButton from "./CourseDeleteListButton";
import CourseDeleteModalContent from "./CourseDeleteModalContent";
import CourseUpdateModalContent from "./CourseUpdateModalContent";

export default function CourseTable() {
    const currentCourse = useState<ICourseInfoViewModel | null>(null);

    const discUpdateModal = useDisclosure(false);
    const discDeleteModal = useDisclosure(false);

    const AllCourses = useQuery<ICourseInfoViewModel[]>({
        queryKey: [`CourseTable`],
        queryFn: async () => {
            const response = await baseAxios.post("/Course/Get", {
                "courseTimeClusterIds": [],
                "courseSectionId": 0,
                "programId": 0,
                "status": 0,
                "type": 1,
                "courseIds": [],
                "examIds": [],
                "pageSize": 0,
                "pageNumber": 0,
                "lecturerId": 0,
                "skillCenterId": 0
            });
            return response.data.data;
        },
    })

    const columns = useMemo<MRT_ColumnDef<ICourseInfoViewModel>[]>(
        () => [
            {
                header: "Mã khóa học",
                accessorKey: "code"
            },
            {
                header: "Tên khóa học",
                accessorKey: "name"
            },
            {
                header: "Tên chương trình",
                accessorKey: "program.name"
            },
            {
                header: "Loại chương trình",
                accessorKey: "program.programType.name",
                // accessorFn: (row) => row.program?.programType?.name ? row.program.programType.name : "Chưa có dữ liệu"
            },
            {
                header: "Ngày khai giảng",
                accessorKey: "studyDate",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.studyDate!))
            },
            {
                header: "Ngày kết thúc (dự kiến)",
                accessorKey: "endDate",
                accessorFn: (row) => row.endDate === null ? "" : utils_date_dateToDDMMYYYString(new Date(row.endDate!))
            },
            {
                header: "Ngày thi",
                accessorKey: "testDate",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.testDate!))
            },
            {
                header: "Trạng thái",
                accessorFn(originalRow) {
                    return originalRow.status
                },
                Cell: ({ row }) => {
                    return (
                        <DisplayCourseStatus courseStatus={row.original.status!} />
                    )
                },
                size: 200
            },
            {
                header: "Có tổ chức thi",
                accessorKey: "program.isTesting",
                accessorFn: (row) => (row.program?.isTesting ? "Có" : "Không"),
                Cell: ({ cell }) => <Center><Checkbox color="green" checked={cell.getValue<boolean>()} readOnly /></Center>,
                size: 170
            },
            {
                header: "Tổng số tiết",
                accessorKey: "program.totalClassPeriodNumber"
            },
            {
                header: "Tổng số giờ",
                accessorKey: "program.totalHours"
            },
            {
                header: "Học phí",
                accessorKey: "program.price",
                Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />
            },
            {
                header: "Cụm thời gian",
                accessorFn: (row) => {
                    if (row.courseTimeClusters === null) return "Chưa có dữ liệu"
                    return row.courseTimeClusters?.map((ctc) => ctc.timeCluster?.name).join(", ")
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {row.original.courseTimeClusters?.map((ctc) => ctc.timeCluster?.name).join("\n")}
                            </div>
                        </>
                    )
                },
            },
            {
                header: "Người cập nhật",
                accessorKey: "modifiedFullName",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "modifiedWhen",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
                },
            }
        ]
        ,
        []
    );

    // useEffect(() => {
    //     if (discUpdateModal[0] === false) {
    //         currentCourse[1](null);
    //     }
    // }, [discUpdateModal[0]])

    return (
        <>
            <MyDataTable
                data={AllCourses.data || []}
                columns={columns}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                    columnPinning: { right: ['mrt-row-actions'] },
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <CourseCreateButton />
                                <Button
                                    color="green"
                                >
                                    Import
                                </Button>
                                <Button
                                    color="teal"
                                >
                                    Export
                                </Button>
                                <CourseDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </Group>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ActionIcon
                                variant="light"
                                radius="sm"
                                color='yellow'
                                onClick={() => {
                                    currentCourse[1](row.original);
                                    discUpdateModal[1].open();
                                }}
                            >
                                <IconEdit />
                            </ActionIcon>
                            <ActionIcon
                                variant="light"
                                radius="sm"
                                color='red'
                                onClick={() => {
                                    discDeleteModal[1].open();
                                    currentCourse[1](row.original);
                                }}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </MyCenterFull>
                    )
                }}
            />

            <Modal
                size={"80%"}
                opened={discUpdateModal[0]}
                onClose={discUpdateModal[1].close}
                title="Chỉnh sửa dữ liệu"
            >
                <CourseUpdateModalContent
                    discUpdateModal={discUpdateModal}
                    courseValues={currentCourse[0]!}
                />
            </Modal>

            <Modal
                opened={discDeleteModal[0]}
                onClose={discDeleteModal[1].close}
                title="Xóa dữ liệu"
            >
                <CourseDeleteModalContent
                    deleteDisc={discDeleteModal}
                    currentCourseState={currentCourse}
                    courseId={currentCourse[0]?.id || null}
                    courseCode={currentCourse[0]?.code || null}
                />
            </Modal>
        </>
    )
}

export function DisplayCourseStatus({ courseStatus }: { courseStatus: number }) {
    switch (courseStatus) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="#d3d3d3" radius="xs">
                        {ENUM_COURSE_STATUS[1]}
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconSquareCheckFilled />}
                        variant="light" color="#32cd32" radius="xs">
                        {ENUM_COURSE_STATUS[2]}
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconLock />}
                        variant="light" color="#ffa500" radius="xs">
                        {ENUM_COURSE_STATUS[3]}
                    </Badge>
                </>
            );
        case 4:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconBook2 />}
                        variant="light" color="#1e90ff" radius="xs">
                        {ENUM_COURSE_STATUS[4]}
                    </Badge>
                </>
            );
        case 5:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconPlayerPause />}
                        variant="light" color="#ffd700" radius="xs">
                        {ENUM_COURSE_STATUS[5]}
                    </Badge>
                </>
            );
        case 6:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconFlag />}
                        variant="light" color="#006400" radius="xs">
                        {ENUM_COURSE_STATUS[6]}
                    </Badge>
                </>
            );
        case 7:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="#004080" radius="xs">
                        {ENUM_COURSE_STATUS[7]}
                    </Badge>
                </>
            );
        case 8:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconX />}
                        variant="light" color="#ff0000" radius="xs">
                        {ENUM_COURSE_STATUS[8]}
                    </Badge>
                </>
            );
        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="#32cd32" radius="xs">
                        Chưa có trạng thái
                    </Badge>
                </>
            );
    }
}
