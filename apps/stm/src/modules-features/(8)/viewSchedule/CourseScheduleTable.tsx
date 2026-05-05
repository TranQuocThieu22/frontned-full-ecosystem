'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Badge, Button, Group, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCheck, IconHourglassHigh, IconOctagonMinus, IconPlayerPause, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CancelCourseSchedule from "./CancelCourseSchedule";

interface ICourseScheduleViewModel {
    id?: number;
    code?: string;
    totalStudent?: number;
    academicYearCode?: string;
    academicYearName?: string;
    timeGroupCode?: string;
    moduleName?: string;
    lecturerName?: string;
    roomName?: string;
    courseDate?: Date | undefined;
    courseDayOfWeek?: string;
    startSession?: number;
    totalSession?: number;
    durationByMinute?: number;
    courseStatus?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: ICourseScheduleViewModel[] = [
    {
        id: 1,
        code: "CS101",
        totalStudent: 30,
        academicYearCode: "2023-2024",
        academicYearName: "Lập trình căn bản",
        timeGroupCode: "246T",
        moduleName: "Khoa học máy tính",
        lecturerName: "Nguyễn Văn A",
        roomName: "P101",
        courseDate: new Date("2024-01-01T00:00:00Z"),
        courseDayOfWeek: "Thứ Hai",
        startSession: 1,
        totalSession: 15,
        durationByMinute: 90,
        courseStatus: "Đang giảng dạy",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 2,
        code: "CS102",
        totalStudent: 25,
        academicYearCode: "2023-2024",
        academicYearName: "Cấu trúc dữ liệu",
        timeGroupCode: "246T",
        moduleName: "Khoa học máy tính",
        lecturerName: "Trần Thị B",
        roomName: "P102",
        courseDate: new Date("2024-01-02T00:00:00Z"),
        courseDayOfWeek: "Thứ Ba",
        startSession: 2,
        totalSession: 15,
        durationByMinute: 90,
        courseStatus: "Chưa diễn ra",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 3,
        code: "CS103",
        totalStudent: 20,
        academicYearCode: "2023-2024",
        academicYearName: "Thuật toán",
        timeGroupCode: "246S",
        moduleName: "Khoa học máy tính",
        lecturerName: "Lê Văn C",
        roomName: "P103",
        courseDate: new Date("2024-01-03T00:00:00Z"),
        courseDayOfWeek: "Thứ Tư",
        startSession: 3,
        totalSession: 15,
        durationByMinute: 90,
        courseStatus: "Hủy",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 4,
        code: "CS104",
        totalStudent: 35,
        academicYearCode: "2023-2024",
        academicYearName: "Cơ sở dữ liệu",
        timeGroupCode: "357T",
        moduleName: "Khoa học máy tính",
        lecturerName: "Phạm Thị D",
        roomName: "P104",
        courseDate: new Date("2024-01-04T00:00:00Z"),
        courseDayOfWeek: "Thứ Năm",
        startSession: 4,
        totalSession: 15,
        durationByMinute: 90,
        courseStatus: "Đang giảng dạy",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 5,
        code: "CS105",
        totalStudent: 40,
        academicYearCode: "2023-2024",
        academicYearName: "Mạng máy tính",
        timeGroupCode: "357C",
        moduleName: "Khoa học máy tính",
        lecturerName: "Ngô Văn E",
        roomName: "P105",
        courseDate: new Date("2024-01-05T00:00:00Z"),
        courseDayOfWeek: "Thứ Sáu",
        startSession: 5,
        totalSession: 15,
        durationByMinute: 90,
        courseStatus: "Chưa diễn ra",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2024-12-19")
    }
]

export default function F8_5ReadStudySchedule() {
    const AllLecturer = useQuery<ICourseScheduleViewModel[]>({
        queryKey: [`F8_5ReadStudySchedule`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const columns = useMemo<MRT_ColumnDef<ICourseScheduleViewModel>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "code",
        },
        {
            header: "Sĩ số",
            accessorKey: "totalStudent",
        },
        {
            header: "Mã khóa học",
            accessorKey: "academicYearCode",
        },
        {
            header: "Tên khóa học",
            accessorKey: "academicYearName",
        },
        {
            header: "Mã cụm thời gian",
            accessorKey: "timeGroupCode",
        },
        {
            header: "Tên môn học",
            accessorKey: "moduleName",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.moduleName}
                />
        },
        {
            header: "Giảng viên",
            accessorKey: "lecturerName",
        },
        {
            header: "Phòng",
            accessorKey: "roomName",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.roomName}
                />
        },
        {
            header: "Ngày",
            accessorKey: "courseDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.courseDate!));
            },
            Cell: ({ row }) =>
                <DateInput
                    clearable={false}
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.original.courseDate}
                />
        },
        {
            header: "Thứ",
            accessorKey: "courseDayOfWeek",
        },
        {
            header: "Tiết bắt đầu",
            accessorKey: "startSession",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.startSession}
                />
        },
        {
            header: "Số tiết",
            accessorKey: "totalSession",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.totalSession}
                />
        },
        {
            header: "Số phút",
            accessorKey: "durationByMinute"
        },
        {
            header: "Trạng thái",
            accessorKey: "courseStatus"
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    if (AllLecturer.isLoading) return "Đang tải dữ liệu...";
    if (AllLecturer.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            exportAble
            columns={columns}
            data={AllLecturer.data!}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <Button>Lưu</Button>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <CancelCourseSchedule courseScheduleId={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}

export function DisplayAssignedStatus({ assignStatus }: { assignStatus: string }) {
    switch (assignStatus) {
        case "Đang giảng dạy":
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="#32cd32" radius="xs">
                        Đang giảng dạy
                    </Badge>
                </>
            );
        case "Chờ phân công":
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconHourglassHigh />}
                        variant="light" color="#FFD700" radius="xs">
                        Chờ phân công
                    </Badge>
                </>
            );
        case "Tạm ngưng":
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconPlayerPause />}
                        variant="light" color="#FFA07A" radius="xs">
                        Tạm ngưng
                    </Badge>
                </>
            );
        case "Bị đình chỉ":
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconX />}
                        variant="light" color="#FF0000" radius="xs">
                        Bị đình chỉ
                    </Badge>
                </>
            );
        case "Nghỉ việc":
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconOctagonMinus />}
                        variant="light" color="#696969" radius="xs">
                        Nghỉ việc
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
                        Mặc định
                    </Badge>
                </>
            );
    }
}
